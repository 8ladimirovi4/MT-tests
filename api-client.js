/**
 * API клиент для работы с сервером
 */

class TreeApiClient {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    /**
     * Загружает данные дерева с сервера
     * @returns {Promise<Object>} Данные дерева
     */
    async loadTreeData() {
        try {
            const response = await fetch(`${this.baseUrl}/api/tree-data`);
            
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
     * @returns {Promise<Array>} Массив дочерних элементов
     */
    async loadChildren(parentId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/tree-children/${parentId}`);
            
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
}

// Создаем глобальный экземпляр API клиента
window.treeApiClient = new TreeApiClient();
