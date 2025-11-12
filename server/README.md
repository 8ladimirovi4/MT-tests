# WebSocket Server

HTTP и WebSocket сервер для работы с реальным временем данных.

## Локальная разработка

```bash
npm install
npm run dev
```

Сервер запустится на `http://localhost:3000`

## Деплой на Railway

### 📚 Расширенная инструкция

**Для подробной пошаговой инструкции с детальными объяснениями см. [DEPLOY_RAILWAY.md](./DEPLOY_RAILWAY.md)**

### Быстрый старт

1. Зарегистрируйтесь на [Railway](https://railway.app/) через GitHub
2. Создайте новый проект → "Deploy from GitHub repo"
3. Выберите ваш репозиторий
4. **ВАЖНО**: Укажите Root Directory: `server`
5. Railway автоматически определит Node.js проект и задеплоит
6. Получите URL сервера в Settings → Networking

### Переменные окружения

Railway автоматически устанавливает:
- `PORT` - порт для сервера (автоматически назначается Railway)
- `NODE_ENV` - окружение (production в Railway)

### Endpoints

- `GET /` - Главная страница
- `GET /api/health` - Health check endpoint
- `WS /` - WebSocket соединение

### WebSocket API

#### Подключение
```javascript
const ws = new WebSocket('wss://your-railway-url.railway.app');
```

#### Команды клиента:
- `{ type: 'start' }` - Начать поток данных
- `{ type: 'stop' }` - Остановить поток данных
- `{ type: 'startChart' }` - Начать поток данных графика
- `{ type: 'stopChart' }` - Остановить поток данных графика

#### Сообщения от сервера:
- `{ type: 'welcome' }` - При подключении
- `{ type: 'data' }` - Данные каждую секунду
- `{ type: 'chartData' }` - Данные графика каждые 5 секунд

## Структура проекта

```
server/
├── server.js          # Основной файл сервера
├── package.json       # Зависимости и скрипты
├── railway.json       # Конфигурация Railway
└── README.md          # Документация
```

