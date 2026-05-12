import { useCallback, useEffect, useState } from 'react'
import { clearSelectedCardId } from './selectedCardIdStorage'
import { clearAllSavedCards } from './savedCardsStorage'
import {
  readSimulatedSession,
  setSimulatedSession,
  type SimulatedSession,
} from './simulatedSessionStorage'
import './SessionSimulator.css'

export function SessionSimulator() {
  const [session, setSession] = useState<SimulatedSession | null>(null)

  useEffect(() => {
    setSession(readSimulatedSession())
  }, [])

  const persist = useCallback((next: SimulatedSession | null) => {
    setSimulatedSession(next)
  }, [])

  const startSession = () => {
    const next: SimulatedSession = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setSession(next)
    persist(next)
  }

  const endSession = () => {
    clearAllSavedCards()
    clearSelectedCardId()
    setSession(null)
    persist(null)
  }

  return (
    <section className="session-sim" aria-labelledby="session-sim-heading">
      <h2 id="session-sim-heading" className="session-sim__title">
        Имитация сессии
      </h2>
      <p className="session-sim__hint">
        Данные только во вкладке браузера (sessionStorage), без сети и сервера.
      </p>

      {!session ? (
        <button type="button" className="session-sim__btn" onClick={startSession}>
          Создать сессию
        </button>
      ) : (
        <div className="session-sim__panel">
          <p className="session-sim__status">Сессия активна</p>
          <dl className="session-sim__meta">
            <div>
              <dt>Идентификатор</dt>
              <dd>
                <code className="session-sim__code">{session.id}</code>
              </dd>
            </div>
            <div>
              <dt>Начало</dt>
              <dd>{new Date(session.createdAt).toLocaleString()}</dd>
            </div>
          </dl>
          <div className="session-sim__actions">
            <button
              type="button"
              className="session-sim__btn session-sim__btn--ghost"
              onClick={endSession}
            >
              Завершить
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
