/**
 * Mock данные для древовидной структуры
 * 500 элементов system_pack + 500 элементов bmrz
 * Каждый следующий элемент вложен в предыдущий
 */

// Генерируем данные для system_pack (1-500)
function generateSystemPackData() {
    const systemPackData = [];
    
    for (let i = 1; i <= 100; i++) {
        systemPackData.push({
            id: `system_pack_${i}`,
            name: `system_pack_${i}`,
            type: 'system_pack',
            icon: 'SystemPact.svg',
            children: i < 500 ? [`system_pack_${i + 1}`] : []
        });
    }
    
    return systemPackData;
}

// Генерируем данные для bmrz (1-500)
function generateBmrzData() {
    const bmrzData = [];
    
    for (let i = 1; i <= 100; i++) {
        bmrzData.push({
            id: `bmrz_${i}`,
            name: `bmrz_${i}`,
            type: 'bmrz',
            icon: 'BMRZ.svg',
            children: i < 500 ? [`bmrz_${i + 1}`] : []
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

// Экспортируем данные
const { treeData, dataMap } = createTreeData();

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
    treeData,
    dataMap,
    getChildren,
    renderTree,
    createTreeNode
};
