/**
 * Конфигурация приложения
 * Использует переменные окружения для определения URL сервера
 */

// Получаем URL сервера из переменных окружения
// В production (Netlify) используем Railway сервер
// В development используем localhost
const getServerUrl = (): string => {
  // Vite использует префикс VITE_ для переменных окружения
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (apiUrl) {
    return apiUrl;
  }
  
  // Fallback для локальной разработки
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  
  // Fallback для production (если переменная не установлена)
  return 'https://mt-tests-production-693d.up.railway.app';
};

const getWebSocketUrl = (): string => {
  // Vite использует префикс VITE_ для переменных окружения
  const wsUrl = import.meta.env.VITE_WS_URL;
  
  if (wsUrl) {
    return wsUrl;
  }
  
  // Fallback для локальной разработки
  if (import.meta.env.DEV) {
    return 'ws://localhost:3000';
  }
  
  // Fallback для production (если переменная не установлена)
  // Используем wss:// для безопасного соединения в production
  const serverUrl = getServerUrl();
  return serverUrl.replace('http://', 'ws://').replace('https://', 'wss://');
};

export const config = {
  // HTTP API URL
  apiUrl: getServerUrl(),
  
  // WebSocket URL
  wsUrl: getWebSocketUrl(),
  
  // Проверка, что мы в production
  isProduction: import.meta.env.PROD,
  
  // Проверка, что мы в development
  isDevelopment: import.meta.env.DEV,
};

