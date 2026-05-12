import { useEffect, useState } from 'react'
import './App.css'
import {
  readSavedCards,
  removeSavedCard,
  SAVED_CARDS_CHANGED_EVENT,
  type StorableCard,
} from './savedCardsStorage'

function Cards() {
  const [cards, setCards] = useState<StorableCard[]>(() => readSavedCards())


  useEffect(() => {
    const syncFromStorage = () => {
      setCards(readSavedCards())
    }
    window.addEventListener(SAVED_CARDS_CHANGED_EVENT, syncFromStorage)
    return () =>
      window.removeEventListener(SAVED_CARDS_CHANGED_EVENT, syncFromStorage)
  }, [])


  const closeCard = (id: string) => {
    removeSavedCard(id)
  }

  return (
    <section className="cards-board app">
      <h1 className="app__title">Карточки</h1>
      {cards.length === 0 ? (
        <p className="app__empty">
          В sessionStorage нет сохранённых карточек — список пуст.
        </p>
      ) : (
        <ul className="card-grid">
          {cards.map((card) => (
            <li key={card.id} className="card">
              <header className="card__header">
                <div className="card__actions">
                  <button
                    type="button"
                    className="card__close"
                    onClick={() => closeCard(card.id)}
                    aria-label={`Закрыть карточку ${card.title}`}
                  >
                    Закрыть
                  </button>
                </div>
              </header>
              <h2 className="card__title">{card.title}</h2>
              <p className="card__text">{card.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Cards
