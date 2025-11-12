# ⚡ Быстрый старт: Деплой на Railway

## 🎯 Основные шаги (5 минут)

### 1. Регистрация
- Перейдите на [railway.app](https://railway.app/)
- Войдите через GitHub

### 2. Создание проекта
- Нажмите **"+ New Project"**
- Выберите **"Deploy from GitHub repo"**
- Выберите ваш репозиторий

### 3. Настройка (КРИТИЧЕСКИ ВАЖНО!)
- В настройках проекта укажите **Root Directory**: `server`
- Сохраните настройки

### 4. Ожидание деплоя
- Railway автоматически установит зависимости и запустит сервер
- Проверьте логи - должны увидеть: `🚀 Server started in production mode`

### 5. Получение URL
- Settings → Networking → **Generate Domain**
- Скопируйте URL (например: `https://your-project.railway.app`)
- Для WebSocket используйте: `wss://your-project.railway.app`

## ✅ Проверка

1. Откройте в браузере: `https://your-url.railway.app`
   - Должен вернуться JSON с сообщением

2. Проверьте health: `https://your-url.railway.app/api/health`
   - Должен вернуться JSON с информацией о сервере

## 🔧 Если что-то пошло не так

- **Не запускается?** → Проверьте, что Root Directory = `server`
- **Ошибки в логах?** → Откройте вкладку "Logs" и проверьте ошибки
- **Нужна помощь?** → См. [DEPLOY_RAILWAY.md](./DEPLOY_RAILWAY.md) для подробной инструкции

## 📝 Чек-лист

- [ ] Root Directory указан как `server`
- [ ] Деплой завершен (статус Active)
- [ ] URL получен и работает
- [ ] Health endpoint отвечает

---

**Подробная инструкция**: [DEPLOY_RAILWAY.md](./DEPLOY_RAILWAY.md)

