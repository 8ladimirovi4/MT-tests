/**
 * WebSocket API для работы с данными графика
 */

export interface ChartData {
  voltage: number;
  barValues: number[];
  elapsedSeconds: number;
}

export interface ChartWebSocketMessage {
  type: 'chartData' | 'chartStarted' | 'chartStopped' | 'welcome' | 'error';
  message?: string;
  data?: ChartData;
  timestamp?: string;
}

export interface ChartWebSocketCallbacks {
  onOpen?: () => void;
  onMessage?: (message: ChartWebSocketMessage) => void;
  onError?: (error: Event) => void;
  onClose?: () => void;
}

/**
 * Создает и настраивает WebSocket соединение для графика
 * @param url URL WebSocket сервера
 * @param callbacks Колбэки для обработки событий WebSocket
 * @returns WebSocket экземпляр
 */
export const createChartWebSocketConnection = (
  url: string,
  callbacks: ChartWebSocketCallbacks = {}
): WebSocket => {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('Chart WebSocket connected');
    callbacks.onOpen?.();
    // Запрашиваем старт потока данных графика
    ws.send(JSON.stringify({ type: 'startChart' }));
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data) as ChartWebSocketMessage;
      console.log('Received Chart WebSocket message:', message);
      callbacks.onMessage?.(message);
    } catch (error) {
      console.error('Error parsing Chart WebSocket message:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('Chart WebSocket error:', error);
    callbacks.onError?.(error);
  };

  ws.onclose = () => {
    console.log('Chart WebSocket disconnected');
    callbacks.onClose?.();
  };

  return ws;
};

/**
 * Закрывает WebSocket соединение графика
 * @param ws WebSocket экземпляр
 */
export const closeChartWebSocketConnection = (ws: WebSocket | null): void => {
  if (ws) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'stopChart' }));
    }
    ws.close();
  }
};

