const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Общая переменная для количества элементов в дереве
const TREE_ITEMS_COUNT = 2000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Раздаем статические файлы

// Генерируем данные для system_pack
function generateSystemPackData() {
    const systemPackData = [];
    
    for (let i = 1; i <= TREE_ITEMS_COUNT; i++) {
        systemPackData.push({
            id: `system_pack_${i}`,
            name: `system_pack_${i}`,
            type: 'system_pack',
            icon: 'SystemPact.svg',
            children: i < TREE_ITEMS_COUNT ? [`system_pack_${i + 1}`] : []
        });
    }
    
    return systemPackData;
}

// Генерируем данные для bmrz
function generateBmrzData() {
    const bmrzData = [];
    
    for (let i = 1; i <= TREE_ITEMS_COUNT; i++) {
        bmrzData.push({
            id: `bmrz_${i}`,
            name: `bmrz_${i}`,
            type: 'bmrz',
            icon: 'BMRZ.svg',
            children: i < TREE_ITEMS_COUNT ? [`bmrz_${i + 1}`] : []
        });
    }
    
    return bmrzData;
}

// Создаем полную структуру дерева
function createTreeData() {
    const systemPackData = generateSystemPackData();
    const bmrzData = generateBmrzData();
    
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

// API эндпоинт для получения данных дерева
app.get('/api/tree-data', (req, res) => {
    try {
        const { treeData, dataMap } = createTreeData();
        
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
        const { dataMap } = createTreeData();
        
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

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`API эндпоинты:`);
    console.log(`  GET /api/tree-data - получить все данные дерева`);
    console.log(`  GET /api/tree-children/:parentId - получить дочерние элементы`);
});
