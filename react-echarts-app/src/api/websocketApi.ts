/**
 * WebSocket API сервис для работы с WebSocket соединениями
 */

export interface WebSocketMessage {
  type: 'start' | 'stop' | 'data' | 'welcome' | 'error'
  message?: string
  data?: unknown
  [key: string]: unknown
}

export interface WebSocketCallbacks {
  onOpen?: () => void
  onMessage?: (message: WebSocketMessage) => void
  onError?: (error: Event) => void
  onClose?: () => void
}

/**
 * Создает и настраивает WebSocket соединение
 * @param url URL WebSocket сервера
 * @param callbacks Колбэки для обработки событий WebSocket
 * @returns WebSocket экземпляр
 */
export const createWebSocketConnection = (
  url: string,
  callbacks: WebSocketCallbacks = {}
): WebSocket => {
  const ws = new WebSocket(url)

  ws.onopen = () => {
    console.log('WebSocket connected')
    callbacks.onOpen?.()
    // Запрашиваем старт потока данных
    ws.send(JSON.stringify({ type: 'start' }))
  }

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data) as WebSocketMessage
      console.log('Received WebSocket message:', message)
      callbacks.onMessage?.(message)
    } catch (error) {
      console.error('Error parsing WebSocket message:', error)
    }
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
    callbacks.onError?.(error)
  }

  ws.onclose = () => {
    console.log('WebSocket disconnected')
    callbacks.onClose?.()
  }

  return ws
}

/**
 * Отправляет сообщение через WebSocket
 * @param ws WebSocket экземпляр
 * @param message Сообщение для отправки
 */
export const sendWebSocketMessage = (ws: WebSocket | null, message: WebSocketMessage): void => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message))
  } else {
    console.warn('WebSocket is not connected')
  }
}

/**
 * Закрывает WebSocket соединение
 * @param ws WebSocket экземпляр
 */
export const closeWebSocketConnection = (ws: WebSocket | null): void => {
  if (ws) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'stop' }))
    }
    ws.close()
  }
}

