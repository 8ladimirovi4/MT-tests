// Подключение библиотеки Express
const express = require('express');
const path = require('path');
const cors = require('cors'); // Подключаем пакет cors
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public'), {
    extensions: ['html', 'htm', 'css', 'js', 'json', 'txt', 'xml'] // Перечисляем все основные типы файлов
  }));

  app.use(cors());
  
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
  });

// Запуск сервера на указанном порту
app.listen(port, () => {
  console.log(`Сервер запущен на http://127.0.0.1:${port}`);
});
