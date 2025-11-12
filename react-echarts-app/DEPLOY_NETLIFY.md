# 🚀 Инструкция по деплою клиента на Netlify

## 📋 Подготовка

Ваш клиент настроен для работы с Railway сервером:
- **Railway Server URL**: `https://mt-tests-production-693d.up.railway.app`
- **WebSocket URL**: `wss://mt-tests-production-693d.up.railway.app`

## ✅ Что уже сделано

1. ✅ Создан файл `src/config.ts` для управления URL сервера
2. ✅ Обновлены `App.tsx` и `Chart.tsx` для использования конфигурации
3. ✅ Обновлен `restApi.ts` для работы в production
4. ✅ Создан `.env.production` с URL вашего Railway сервера

## 🔧 Настройка переменных окружения в Netlify

### Способ 1: Через Dashboard (рекомендуется)

1. Войдите в [Netlify Dashboard](https://app.netlify.com/)
2. Выберите ваш сайт (или создайте новый)
3. Перейдите в **Site settings** → **Environment variables**
4. Добавьте следующие переменные:

```
VITE_API_URL = https://mt-tests-production-693d.up.railway.app
VITE_WS_URL = wss://mt-tests-production-693d.up.railway.app
```

5. Нажмите **Save**
6. Перезапустите деплой (Deploys → Trigger deploy → Deploy site)

### Способ 2: Автоматически через .env.production

Файл `.env.production` уже создан и содержит нужные переменные. Netlify автоматически использует его при деплое.

**Важно**: Убедитесь, что файл `.env.production` закоммичен в Git.

## 📝 Деплой на Netlify

### Шаг 1: Подготовка репозитория

1. Убедитесь, что все изменения закоммичены:
   ```bash
   git add .
   git commit -m "Configure Railway server URLs"
   git push
   ```

### Шаг 2: Создание сайта на Netlify

1. Войдите в [Netlify](https://app.netlify.com/)
2. Нажмите **"Add new site"** → **"Import an existing project"**
3. Подключите ваш GitHub репозиторий
4. Настройте деплой:
   - **Base directory**: `react-echarts-app`
   - **Build command**: `npm run build`
   - **Publish directory**: `react-echarts-app/dist`

### Шаг 3: Настройка переменных окружения

1. В настройках сайта → **Environment variables**
2. Добавьте переменные (см. выше)
3. Или убедитесь, что `.env.production` закоммичен

### Шаг 4: Деплой

1. Нажмите **"Deploy site"**
2. Дождитесь завершения build
3. Проверьте, что сайт работает

## ✅ Проверка работы

### 1. Проверка HTTP API

Откройте консоль браузера на задеплоенном сайте и проверьте:
- Кнопка "Test Server" должна возвращать данные с Railway сервера
- Health endpoint должен работать

### 2. Проверка WebSocket

- Кнопка "Test WSS" должна подключаться к Railway WebSocket
- Переключение на "Live" режим в графике должно работать
- Данные должны приходить с Railway сервера

### 3. Проверка в консоли

Откройте DevTools → Console и проверьте:
- Нет ошибок подключения к WebSocket
- Нет CORS ошибок
- URL сервера правильный (должен быть Railway URL, не localhost)

## 🔍 Отладка

### Проблема: WebSocket не подключается

**Решение**:
1. Проверьте, что используется `wss://` (не `ws://`)
2. Проверьте переменную `VITE_WS_URL` в Netlify
3. Проверьте, что Railway сервер работает

### Проблема: API запросы не работают

**Решение**:
1. Проверьте переменную `VITE_API_URL` в Netlify
2. Проверьте CORS настройки на Railway сервере
3. Проверьте, что URL правильный (должен быть `https://`)

### Проблема: Переменные окружения не применяются

**Решение**:
1. Убедитесь, что переменные добавлены в Netlify Dashboard
2. Перезапустите деплой после добавления переменных
3. Проверьте, что переменные начинаются с `VITE_` (требование Vite)

## 📚 Структура конфигурации

### Файлы конфигурации

- `src/config.ts` - централизованная конфигурация
- `.env.production` - переменные для production
- `vite.config.ts` - настройка Vite (proxy для development)

### Как это работает

1. **Development** (локально):
   - Использует `localhost:3000` для API
   - Использует `ws://localhost:3000` для WebSocket
   - Vite проксирует `/api` на localhost

2. **Production** (Netlify):
   - Использует `VITE_API_URL` из переменных окружения
   - Использует `VITE_WS_URL` из переменных окружения
   - Если переменные не установлены, использует fallback на Railway URL

## 🎯 Чек-лист перед деплоем

- [ ] `.env.production` создан и содержит правильные URL
- [ ] Переменные окружения добавлены в Netlify (или `.env.production` закоммичен)
- [ ] Railway сервер работает и доступен
- [ ] Все изменения закоммичены и запушены в Git
- [ ] Build проходит успешно локально (`npm run build`)

## 🚀 После деплоя

1. Проверьте работу всех функций
2. Проверьте WebSocket соединение
3. Проверьте API запросы
4. Убедитесь, что данные приходят с Railway сервера

---

**Успешного деплоя! 🎉**

