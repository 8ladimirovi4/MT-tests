/**
 * API клиент для работы с сервером
 */

class TreeApiClient {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    /**
     * Загружает данные дерева с сервера
     * @param {number} itemsCount - Количество элементов дерева
     * @returns {Promise<Object>} Данные дерева
     */
    async loadTreeData(itemsCount = 2000) {
        try {
            const response = await fetch(`${this.baseUrl}/api/tree-data?count=${itemsCount}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Ошибка при загрузке данных');
            }
            
            return result.data;
        } catch (error) {
            console.error('Ошибка при загрузке данных дерева:', error);
            throw error;
        }
    }

    /**
     * Загружает дочерние элементы для указанного родителя
     * @param {string} parentId - ID родительского элемента
     * @param {number} itemsCount - Количество элементов дерева
     * @returns {Promise<Array>} Массив дочерних элементов
     */
    async loadChildren(parentId, itemsCount = 2000) {
        try {
            const response = await fetch(`${this.baseUrl}/api/tree-children/${parentId}?count=${itemsCount}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Ошибка при загрузке дочерних элементов');
            }
            
            return result.data;
        } catch (error) {
            console.error('Ошибка при загрузке дочерних элементов:', error);
            throw error;
        }
    }

    /**
     * Загружает PNG данные дерева с сервера
     * @param {number} itemsCount - Количество элементов дерева
     * @returns {Promise<Object>} PNG данные дерева
     */
    async loadPngTreeData(itemsCount = 2000) {
        try {
            const response = await fetch(`${this.baseUrl}/api/png-tree-data?count=${itemsCount}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Ошибка при загрузке PNG данных');
            }
            
            return result.data;
        } catch (error) {
            console.error('Ошибка при загрузке PNG данных дерева:', error);
            throw error;
        }
    }

    /**
     * Загружает дочерние PNG элементы для указанного родителя
     * @param {string} parentId - ID родительского элемента
     * @param {number} itemsCount - Количество элементов дерева
     * @returns {Promise<Array>} Массив дочерних PNG элементов
     */
    async loadPngChildren(parentId, itemsCount = 2000) {
        try {
            const response = await fetch(`${this.baseUrl}/api/png-tree-children/${parentId}?count=${itemsCount}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Ошибка при загрузке дочерних PNG элементов');
            }
            
            return result.data;
        } catch (error) {
            console.error('Ошибка при загрузке дочерних PNG элементов:', error);
            throw error;
        }
    }
}

// Создаем глобальный экземпляр API клиента
window.treeApiClient = new TreeApiClient();
