const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Общая переменная для количества элементов в дереве (по умолчанию)
const DEFAULT_TREE_ITEMS_COUNT = 10;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Раздаем статические файлы

// Генерируем данные для system_pack
function generateSystemPackData(itemsCount = DEFAULT_TREE_ITEMS_COUNT) {
    const systemPackData = [];
    
    for (let i = 1; i <= itemsCount; i++) {
        systemPackData.push({
            id: `system_pack_${i}`,
            name: `system_pack_${i}`,
            type: 'system_pack',
            icon: 'SystemPact.svg',
            children: i < itemsCount ? [`system_pack_${i + 1}`] : []
        });
    }
    
    return systemPackData;
}

// Генерируем данные для bmrz
function generateBmrzData(itemsCount = DEFAULT_TREE_ITEMS_COUNT) {
    const bmrzData = [];
    
    for (let i = 1; i <= itemsCount; i++) {
        bmrzData.push({
            id: `bmrz_${i}`,
            name: `bmrz_${i}`,
            type: 'bmrz',
            icon: 'BMRZ.svg',
            children: i < itemsCount ? [`bmrz_${i + 1}`] : []
        });
    }
    
    return bmrzData;
}

// Генерируем PNG данные для system_pack
function generatePngSystemPackData(itemsCount = DEFAULT_TREE_ITEMS_COUNT) {
    const systemPackData = [];
    
    for (let i = 1; i <= itemsCount; i++) {
        systemPackData.push({
            id: `png_system_pack_${i}`,
            name: `system_pack_${i}`,
            type: 'system_pack',
            icon: 'systemPact.png',
            children: i < itemsCount ? [`png_system_pack_${i + 1}`] : []
        });
    }
    
    return systemPackData;
}

// Генерируем PNG данные для bmrz
function generatePngBmrzData(itemsCount = DEFAULT_TREE_ITEMS_COUNT) {
    const bmrzData = [];
    
    for (let i = 1; i <= itemsCount; i++) {
        bmrzData.push({
            id: `png_bmrz_${i}`,
            name: `bmrz_${i}`,
            type: 'bmrz',
            icon: 'bmrz.png',
            children: i < itemsCount ? [`png_bmrz_${i + 1}`] : []
        });
    }
    
    return bmrzData;
}

// Создаем полную структуру дерева
function createTreeData(itemsCount = DEFAULT_TREE_ITEMS_COUNT) {
    const systemPackData = generateSystemPackData(itemsCount);
    const bmrzData = generateBmrzData(itemsCount);
    
    // Создаем корневые элементы
    const treeData = [
        {
            id: 'system_pack_root',
            name: 'System Pack',
            type: 'system_pack',
            icon: 'SystemPact.svg',
            children: ['system_pack_1'],
            isRoot: true
        },
        {
            id: 'bmrz_root',
            name: 'BMRZ',
            type: 'bmrz',
            icon: 'BMRZ.svg',
            children: ['bmrz_1'],
            isRoot: true
        }
    ];
    
    // Объединяем все данные
    const allData = [...treeData, ...systemPackData, ...bmrzData];
    
    // Создаем карту для быстрого поиска
    const dataMap = new Map();
    allData.forEach(item => {
        dataMap.set(item.id, item);
    });
    
    return { treeData, dataMap };
}

// Создаем полную структуру PNG дерева
function createPngTreeData(itemsCount = DEFAULT_TREE_ITEMS_COUNT) {
    const systemPackData = generatePngSystemPackData(itemsCount);
    const bmrzData = generatePngBmrzData(itemsCount);
    
    // Создаем корневые элементы
    const treeData = [
        {
            id: 'png_system_pack_root',
            name: 'System Pack',
            type: 'system_pack',
            icon: 'systemPact.png',
            children: ['png_system_pack_1'],
            isRoot: true
        },
        {
            id: 'png_bmrz_root',
            name: 'BMRZ',
            type: 'bmrz',
            icon: 'bmrz.png',
            children: ['png_bmrz_1'],
            isRoot: true
        }
    ];
    
    // Объединяем все данные
    const allData = [...treeData, ...systemPackData, ...bmrzData];
    
    // Создаем карту для быстрого поиска
    const dataMap = new Map();
    allData.forEach(item => {
        dataMap.set(item.id, item);
    });
    
    return { treeData, dataMap };
}

// API эндпоинт для получения данных дерева
app.get('/api/tree-data', (req, res) => {
    try {
        // Получаем количество элементов из query параметра
        const itemsCount = parseInt(req.query.count) || DEFAULT_TREE_ITEMS_COUNT;
        
        // Валидация
        if (itemsCount < 1 || itemsCount > 10000) {
            return res.status(400).json({
                success: false,
                error: 'Количество элементов должно быть от 1 до 10000'
            });
        }
        
        const { treeData, dataMap } = createTreeData(itemsCount);
        
        // Преобразуем Map в обычный объект для JSON сериализации
        const dataMapObject = {};
        dataMap.forEach((value, key) => {
            dataMapObject[key] = value;
        });
        
        res.json({
            success: true,
            data: {
                treeData,
                dataMap: dataMapObject
            }
        });
    } catch (error) {
        console.error('Ошибка при генерации данных дерева:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при генерации данных дерева'
        });
    }
});

// API эндпоинт для получения дочерних элементов
app.get('/api/tree-children/:parentId', (req, res) => {
    try {
        const { parentId } = req.params;
        const itemsCount = parseInt(req.query.count) || DEFAULT_TREE_ITEMS_COUNT;
        const { dataMap } = createTreeData(itemsCount);
        
        const parent = dataMap.get(parentId);
        if (!parent || !parent.children) {
            return res.json({
                success: true,
                data: []
            });
        }
        
        const children = parent.children.map(childId => dataMap.get(childId)).filter(Boolean);
        
        res.json({
            success: true,
            data: children
        });
    } catch (error) {
        console.error('Ошибка при получении дочерних элементов:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при получении дочерних элементов'
        });
    }
});

// API эндпоинт для получения PNG данных дерева
app.get('/api/png-tree-data', (req, res) => {
    try {
        // Получаем количество элементов из query параметра
        const itemsCount = parseInt(req.query.count) || DEFAULT_TREE_ITEMS_COUNT;
        
        // Валидация
        if (itemsCount < 1 || itemsCount > 10000) {
            return res.status(400).json({
                success: false,
                error: 'Количество элементов должно быть от 1 до 10000'
            });
        }
        
        const { treeData, dataMap } = createPngTreeData(itemsCount);
        
        // Преобразуем Map в обычный объект для JSON сериализации
        const dataMapObject = {};
        dataMap.forEach((value, key) => {
            dataMapObject[key] = value;
        });
        
        res.json({
            success: true,
            data: {
                treeData,
                dataMap: dataMapObject
            }
        });
    } catch (error) {
        console.error('Ошибка при генерации PNG данных дерева:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при генерации PNG данных дерева'
        });
    }
});

// API эндпоинт для получения дочерних PNG элементов
app.get('/api/png-tree-children/:parentId', (req, res) => {
    try {
        const { parentId } = req.params;
        const itemsCount = parseInt(req.query.count) || DEFAULT_TREE_ITEMS_COUNT;
        const { dataMap } = createPngTreeData(itemsCount);
        
        const parent = dataMap.get(parentId);
        if (!parent || !parent.children) {
            return res.json({
                success: true,
                data: []
            });
        }
        
        const children = parent.children.map(childId => dataMap.get(childId)).filter(Boolean);
        
        res.json({
            success: true,
            data: children
        });
    } catch (error) {
        console.error('Ошибка при получении дочерних PNG элементов:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при получении дочерних PNG элементов'
        });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`API эндпоинты:`);
    console.log(`  GET /api/tree-data - получить все данные дерева SVG`);
    console.log(`  GET /api/tree-children/:parentId - получить дочерние элементы SVG`);
    console.log(`  GET /api/png-tree-data - получить все данные дерева PNG`);
    console.log(`  GET /api/png-tree-children/:parentId - получить дочерние элементы PNG`);
});
