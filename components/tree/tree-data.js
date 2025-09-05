/**
 * Клиентский код для работы с древовидной структурой
 * Данные загружаются с сервера через API
 */

// Глобальные переменные для хранения данных
let treeData = [];
let dataMap = new Map();

// Функция для инициализации данных с сервера
async function initializeTreeData(itemsCount = 2000) {
    try {
        if (!window.treeApiClient) {
            throw new Error('API клиент не загружен');
        }
        
        const serverData = await window.treeApiClient.loadTreeData(itemsCount);
        
        // Обновляем глобальные переменные
        treeData = serverData.treeData;
        
        // Преобразуем объект обратно в Map
        dataMap = new Map();
        Object.entries(serverData.dataMap).forEach(([key, value]) => {
            dataMap.set(key, value);
        });
        
        return true;
    } catch (error) {
        console.error('Ошибка при инициализации данных:', error);
        return false;
    }
}

// Функция для получения дочерних элементов
function getChildren(parentId) {
    const parent = dataMap.get(parentId);
    if (!parent || !parent.children) return [];
    
    return parent.children.map(childId => dataMap.get(childId)).filter(Boolean);
}

// Функция для рендеринга дерева
function renderTree() {
    const container = document.getElementById('tree-container');
    if (!container) return;
    
    // Показываем контейнер
    container.style.display = 'block';
    container.innerHTML = '';
    
    treeData.forEach(rootItem => {
        const rootElement = createTreeNode(rootItem, 0);
        container.appendChild(rootElement);
    });
}

// Функция для создания узла дерева
function createTreeNode(item, level) {
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
    
    // Создаем иконку
    const iconImg = document.createElement('img');
    iconImg.src = `../${item.icon}`;
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
        const children = getChildren(item.id);
        children.forEach(child => {
            const childElement = createTreeNode(child, level + 1);
            nodeDiv.appendChild(childElement);
        });
    }
    
    return nodeDiv;
}

// Экспортируем функции
window.TreeData = {
    treeData: () => treeData,
    dataMap: () => dataMap,
    getChildren,
    renderTree,
    createTreeNode,
    initializeTreeData
};
