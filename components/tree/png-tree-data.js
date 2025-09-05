/**
 * Клиентский код для работы с древовидной структурой PNG
 * Данные загружаются с сервера через API
 */

// Глобальные переменные для хранения данных PNG
let pngTreeData = [];
let pngDataMap = new Map();

// Base64 данные для PNG иконок
let pngBase64Data = null;

// Функция для загрузки base64 данных PNG
async function loadPngBase64Data() {
    try {
        const response = await fetch('./png_base64_data.json');
        pngBase64Data = await response.json();
        return true;
    } catch (error) {
        console.error('Ошибка при загрузке base64 данных PNG:', error);
        return false;
    }
}

// Функция для инициализации PNG данных с сервера
async function initializePngTreeData(itemsCount = 10) {
    try {
        if (!window.treeApiClient) {
            throw new Error('API клиент не загружен');
        }
        
        // Загружаем base64 данные PNG
        const base64Loaded = await loadPngBase64Data();
        if (!base64Loaded) {
            throw new Error('Не удалось загрузить base64 данные PNG');
        }
        
        const serverData = await window.treeApiClient.loadPngTreeData(itemsCount);
        
        // Обновляем глобальные переменные
        pngTreeData = serverData.treeData;
        
        // Преобразуем объект обратно в Map
        pngDataMap = new Map();
        Object.entries(serverData.dataMap).forEach(([key, value]) => {
            pngDataMap.set(key, value);
        });
        
        return true;
    } catch (error) {
        console.error('Ошибка при инициализации PNG данных:', error);
        return false;
    }
}

// Функция для получения дочерних элементов PNG
function getPngChildren(parentId) {
    const parent = pngDataMap.get(parentId);
    if (!parent || !parent.children) return [];
    
    return parent.children.map(childId => pngDataMap.get(childId)).filter(Boolean);
}

// Функция для рендеринга PNG дерева
function renderPngTree() {
    const container = document.getElementById('png-tree-container');
    if (!container) return;
    
    // Показываем контейнер
    container.style.display = 'block';
    container.innerHTML = '';
    
    pngTreeData.forEach(rootItem => {
        const rootElement = createPngTreeNode(rootItem, 0);
        container.appendChild(rootElement);
    });
}

// Функция для создания узла PNG дерева
function createPngTreeNode(item, level) {
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'tree-node';
    nodeDiv.setAttribute('data-level', level);
    
    // Фиксированное расстояние 5px между каждым родительским и дочерним узлом
    // Используем фиксированное расстояние для всех уровней
    const fixedDistance = 5;
    nodeDiv.style.marginLeft = `${fixedDistance}px`;
    
    // Создаем контейнер для иконки и текста
    const contentDiv = document.createElement('div');
    contentDiv.className = 'tree-node-content';
    
    // Создаем иконку PNG с base64 данными
    const iconImg = document.createElement('img');
    
    // Определяем правильный base64 источник в зависимости от типа элемента
    if (item.type === 'bmrz' && pngBase64Data && pngBase64Data.bmrz) {
        iconImg.src = pngBase64Data.bmrz;
    } else if (item.type === 'system_pack' && pngBase64Data && pngBase64Data.systemPact) {
        iconImg.src = pngBase64Data.systemPact;
    } else {
        // Fallback на файловый путь, если base64 данные недоступны
        iconImg.src = `../${item.icon}`;
    }
    
    iconImg.alt = item.name;
    iconImg.className = 'tree-node-icon';
    iconImg.style.width = '24px';
    iconImg.style.height = '24px';
    iconImg.style.marginRight = '8px';
    
    // Создаем текст
    const textSpan = document.createElement('span');
    textSpan.textContent = item.name;
    textSpan.className = 'tree-node-text';
    
    // Добавляем иконку и текст в контент
    contentDiv.appendChild(iconImg);
    contentDiv.appendChild(textSpan);
    
    // Добавляем контент в узел
    nodeDiv.appendChild(contentDiv);
    
    // Рекурсивно добавляем дочерние элементы
    if (item.children && item.children.length > 0) {
        const children = getPngChildren(item.id);
        children.forEach(child => {
            const childElement = createPngTreeNode(child, level + 1);
            nodeDiv.appendChild(childElement);
        });
    }
    
    return nodeDiv;
}

// Экспортируем функции
window.PngTreeData = {
    treeData: () => pngTreeData,
    dataMap: () => pngDataMap,
    getChildren: getPngChildren,
    renderTree: renderPngTree,
    createTreeNode: createPngTreeNode,
    initializeTreeData: initializePngTreeData,
    loadPngBase64Data: loadPngBase64Data
};
