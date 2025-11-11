import http from 'http';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 3000;
const startTime = Date.now();

const server = http.createServer((req, res) => {
  // Устанавливаем заголовки CORS для разработки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка OPTIONS запроса для CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Простой роутинг
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from Node.js server!' }));
  } else if (req.url === '/api/health' && req.method === 'GET') {
    const serverUptime = Math.floor((Date.now() - startTime) / 1000);
    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: {
        uptime: `${serverUptime}s`,
        port: PORT,
        nodeVersion: process.version,
      },
      environment: process.env.NODE_ENV || 'development',
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(healthData, null, 2));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Создаем WebSocket Server на том же HTTP сервере
const wss = new WebSocketServer({ server });

// Функция для генерации случайных данных
function generateRandomData() {
  return {
    id: Math.floor(Math.random() * 10000),
    value: Math.floor(Math.random() * 1000),
    temperature: (Math.random() * 50 + 10).toFixed(2),
    humidity: (Math.random() * 100).toFixed(2),
    pressure: (Math.random() * 200 + 900).toFixed(2),
    timestamp: new Date().toISOString(),
    status: ['active', 'idle', 'processing'][Math.floor(Math.random() * 3)],
  };
}

// Обработка подключений WebSocket
wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log(`WebSocket client connected from ${clientIp}`);

  // Отправляем приветственное сообщение при подключении
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Connected to WebSocket server',
    timestamp: new Date().toISOString()
  }));

  // Интервал для отправки случайных данных раз в секунду
  let dataInterval = null;

  // Обработка входящих сообщений от клиента
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Received message:', data);

      // Если клиент запрашивает старт потока данных
      if (data.type === 'start') {
        // Очищаем предыдущий интервал, если он существует
        if (dataInterval) {
          clearInterval(dataInterval);
        }
        
        // Запускаем отправку данных раз в секунду
        dataInterval = setInterval(() => {
          if (ws.readyState === ws.OPEN) {
            const randomData = generateRandomData();
            ws.send(JSON.stringify({
              type: 'data',
              data: randomData
            }));
          }
        }, 1000);
        
        ws.send(JSON.stringify({
          type: 'started',
          message: 'Data stream started',
          timestamp: new Date().toISOString()
        }));
      } else if (data.type === 'stop') {
        // Останавливаем отправку данных
        if (dataInterval) {
          clearInterval(dataInterval);
          dataInterval = null;
        }
        ws.send(JSON.stringify({
          type: 'stopped',
          message: 'Data stream stopped',
          timestamp: new Date().toISOString()
        }));
      } else {
        // Эхо-ответ (отправляем обратно клиенту)
        ws.send(JSON.stringify({
          type: 'echo',
          original: data,
          timestamp: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid JSON format',
        timestamp: new Date().toISOString()
      }));
    }
  });

  // Обработка закрытия соединения
  ws.on('close', () => {
    console.log(`WebSocket client disconnected from ${clientIp}`);
    // Очищаем интервал при отключении
    if (dataInterval) {
      clearInterval(dataInterval);
      dataInterval = null;
    }
  });

  // Обработка ошибок
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    // Очищаем интервал при ошибке
    if (dataInterval) {
      clearInterval(dataInterval);
      dataInterval = null;
    }
  });
});

server.listen(PORT, () => {
  console.log(`HTTP Server is running on http://localhost:${PORT}`);
  console.log(`WebSocket Server is running on ws://localhost:${PORT}`);
});

