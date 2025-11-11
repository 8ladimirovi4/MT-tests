/**
 * REST API сервис для работы с HTTP запросами
 */

export interface HealthCheckResponse {
  status: string
  message?: string
  [key: string]: unknown
}

/**
 * Проверка здоровья сервера
 * @returns Promise с данными ответа сервера
 */
export const checkServerHealth = async (): Promise<HealthCheckResponse> => {
  const response = await fetch('/api/health')
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const data = await response.json()
  return data
}

