/**
 * REST API сервис для работы с HTTP запросами
 */

export interface HealthCheckResponse {
  status: string
  message?: string
  [key: string]: unknown
}

/**
 * Получает базовый URL для API запросов
 * В development использует proxy из vite.config.ts
 * В production использует полный URL сервера
 */
const getApiBaseUrl = (): string => {
  // В development Vite проксирует /api на localhost:3000
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // В production используем полный URL из переменных окружения
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl;
  }
  
  // Fallback для production
  return 'https://mt-tests-production-693d.up.railway.app';
};

/**
 * Проверка здоровья сервера
 * @returns Promise с данными ответа сервера
 */
export const checkServerHealth = async (): Promise<HealthCheckResponse> => {
  const baseUrl = getApiBaseUrl();
  const url = import.meta.env.DEV 
    ? `${baseUrl}/health` 
    : `${baseUrl}/api/health`;
  
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const data = await response.json()
  return data
}

