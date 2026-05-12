import { type FormEvent, useState } from 'react'
import { useAuth } from './auth/AuthContext'
import './AuthPanel.css'

export function AuthPanel() {
  const { user, loading, login, logout } = useAuth()
  const [username, setUsername] = useState('demo')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      const result = await login(username.trim(), password)
      if (!result.ok) {
        setError(result.error ?? 'Не удалось войти')
      }
    } finally {
      setPending(false)
    }
  }

  const handleLogout = async () => {
    setPending(true)
    try {
      await logout()
      setPassword('demo123')
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="auth-panel" aria-labelledby="auth-panel-heading">
      <h2 id="auth-panel-heading" className="auth-panel__title">
        Сессия (сервер, JWT в httpOnly cookie)
      </h2>
      <p className="auth-panel__hint">
        Тестовый пользователь: логин <code>demo</code>, пароль <code>demo123</code>.
        Запросы идут на Fastify через прокси Vite <code>/api</code> →{' '}
        <code>localhost:3000</code>.
      </p>

      {loading ? (
        <p className="auth-panel__status">Проверка сессии…</p>
      ) : !user ? (
        <form className="auth-panel__form" onSubmit={handleSubmit}>
          <div className="auth-panel__field">
            <label htmlFor="auth-username">Логин</label>
            <input
              id="auth-username"
              className="auth-panel__input"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={pending}
            />
          </div>
          <div className="auth-panel__field">
            <label htmlFor="auth-password">Пароль</label>
            <input
              id="auth-password"
              className="auth-panel__input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={pending}
            />
          </div>
          {error && (
            <p className="auth-panel__error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="auth-panel__btn" disabled={pending}>
            {pending ? 'Вход…' : 'Войти'}
          </button>
        </form>
      ) : (
        <div className="auth-panel__panel">
          <p className="auth-panel__status">Вы вошли как</p>
          <p className="auth-panel__user">
            <code>{user.sub}</code>
          </p>
          <button
            type="button"
            className="auth-panel__btn auth-panel__btn--ghost"
            onClick={handleLogout}
            disabled={pending}
          >
            {pending ? 'Выход…' : 'Выйти'}
          </button>
        </div>
      )}
    </section>
  )
}
