import { useEffect, useState } from 'react'
import { CARD_CATALOG } from './cardCatalog'
import {
  readSelectedCardId,
  SELECTED_CARD_ID_EVENT,
} from './selectedCardIdStorage'
import {
  readSimulatedSession,
  SIMULATED_SESSION_EVENT,
} from './simulatedSessionStorage'
import './CardSidebar.css'
import { upsertSavedCard, type StorableCard } from './savedCardsStorage'

export function CardSidebar() {
  const [activeId, setActiveId] = useState<string | null>(() =>
    readSelectedCardId(),
  )
  const [sessionActive, setSessionActive] = useState(
    () => readSimulatedSession() !== null,
  )

  useEffect(() => {
    const syncSelection = () => setActiveId(readSelectedCardId())
    window.addEventListener(SELECTED_CARD_ID_EVENT, syncSelection)
    return () => window.removeEventListener(SELECTED_CARD_ID_EVENT, syncSelection)
  }, [])

  useEffect(() => {
    const syncSession = () => setSessionActive(readSimulatedSession() !== null)
    window.addEventListener(SIMULATED_SESSION_EVENT, syncSession)
    return () => window.removeEventListener(SIMULATED_SESSION_EVENT, syncSession)
  }, [])

  const saveCardToSession = (card: StorableCard) => {
    upsertSavedCard(card)
  }

  return (
    <aside className="card-sidebar" aria-label="Каталог карточек по id">
      <p className="card-sidebar__heading">Id в каталоге</p>
      {!sessionActive && (
        <p className="card-sidebar__lock-hint">
          Создайте сессию выше, чтобы открыть каталог.
        </p>
      )}
      <ul className="card-sidebar__list">
        {CARD_CATALOG.map((card) => (
          <li key={card.id} className="card-sidebar__item">
            <button
              type="button"
              className={
                activeId === card.id
                  ? 'card-sidebar__btn card-sidebar__btn--active'
                  : 'card-sidebar__btn'
              }
              disabled={!sessionActive}
              onClick={() => saveCardToSession(card)}
              title={
                sessionActive
                  ? card.title
                  : 'Сначала создайте сессию в блоке «Имитация сессии»'
              }
            >
              <span className="card-sidebar__id">{card.id}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
