import http from 'http';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const startTime = Date.now();

// Обработка graceful shutdown
let isShuttingDown = false;

const server = http.createServer((req, res) => {
  // Устанавливаем заголовки CORS
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Обработка OPTIONS запроса для CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Простой роутинг
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      message: 'Hello from Node.js server!',
      environment: NODE_ENV,
      timestamp: new Date().toISOString()
    }));
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
      environment: NODE_ENV,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
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

// Функция для генерации данных графика (напряжение и гистограмма)
function generateChartData(elapsedSeconds) {
  // Генерируем случайное напряжение в диапазоне 200-240 В
  const voltage = Math.random() * 40 + 200;
  
  // Генерируем случайные значения для каждого столбца гистограммы
  // Значения будут суммироваться на клиенте
  const barValues = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ];
  
  return {
    voltage: Number(voltage.toFixed(2)),
    barValues: barValues,
    elapsedSeconds: elapsedSeconds,
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
  
  // Интервал для отправки данных графика
  let chartDataInterval = null;
  let chartStartTime = null;

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
      } else if (data.type === 'startChart') {
        // Запускаем поток данных для графика
        if (chartDataInterval) {
          clearInterval(chartDataInterval);
        }
        
        chartStartTime = Date.now();
        
        // Отправляем данные каждые 300 миллисекунд
        chartDataInterval = setInterval(() => {
          if (ws.readyState === ws.OPEN) {
            const elapsedSeconds = (Date.now() - chartStartTime) / 1000;
            const chartData = generateChartData(elapsedSeconds);
            ws.send(JSON.stringify({
              type: 'chartData',
              data: chartData
            }));
          }
        }, 5000);
        
        ws.send(JSON.stringify({
          type: 'chartStarted',
          message: 'Chart data stream started',
          timestamp: new Date().toISOString()
        }));
      } else if (data.type === 'stopChart') {
        // Останавливаем поток данных графика
        if (chartDataInterval) {
          clearInterval(chartDataInterval);
          chartDataInterval = null;
        }
        chartStartTime = null;
        ws.send(JSON.stringify({
          type: 'chartStopped',
          message: 'Chart data stream stopped',
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
    // Очищаем интервалы при отключении
    if (dataInterval) {
      clearInterval(dataInterval);
      dataInterval = null;
    }
    if (chartDataInterval) {
      clearInterval(chartDataInterval);
      chartDataInterval = null;
    }
    chartStartTime = null;
  });

  // Обработка ошибок
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    // Очищаем интервалы при ошибке
    if (dataInterval) {
      clearInterval(dataInterval);
      dataInterval = null;
    }
    if (chartDataInterval) {
      clearInterval(chartDataInterval);
      chartDataInterval = null;
    }
    chartStartTime = null;
  });
});

// Обработка ошибок сервера
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

// Обработка необработанных исключений
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  if (NODE_ENV === 'production') {
    process.exit(1);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  if (NODE_ENV === 'production') {
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  isShuttingDown = true;
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  isShuttingDown = true;
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Запуск сервера
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server started in ${NODE_ENV} mode`);
  console.log(`📡 HTTP Server is running on port ${PORT}`);
  console.log(`🔌 WebSocket Server is running on port ${PORT}`);
  console.log(`🌐 Environment: ${NODE_ENV}`);
  console.log(`📦 Node version: ${process.version}`);
});

