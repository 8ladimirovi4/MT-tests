import { type FormEvent, useEffect, useState } from 'react'
import {
  readSavedCards,
  removeSavedCard,
  SAVED_CARDS_CHANGED_EVENT,
  SAVED_CARDS_SESSION_KEY,
} from './savedCardsStorage'
import './RemoveCardByIdBox.css'

export function RemoveCardByIdBox() {
  const [idsInSession, setIdsInSession] = useState<string[]>(() =>
    readSavedCards().map((c) => c.id),
  )
  const [idInput, setIdInput] = useState('')
  const [hint, setHint] = useState<string | null>(null)

  useEffect(() => {
    const sync = () => setIdsInSession(readSavedCards().map((c) => c.id))
    window.addEventListener(SAVED_CARDS_CHANGED_EVENT, sync)

    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== localStorage) return
      if (e.key !== null && e.key !== SAVED_CARDS_SESSION_KEY) return
      sync()
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener(SAVED_CARDS_CHANGED_EVENT, sync)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const handleRemove = () => {
    const id = idInput.trim()
    setHint(null)
    if (!id) {
      setHint('Введите id карточки.')
      return
    }
    const exists = readSavedCards().some((c) => c.id === id)
    if (!exists) {
      setHint('В хранилище нет карточки с таким id.')
      return
    }
    removeSavedCard(id)
    setIdInput('')
    setHint('Карточка удалена.')
    window.setTimeout(() => setHint(null), 2400)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleRemove()
  }

  return (
    <section className="remove-by-id" aria-labelledby="remove-by-id-heading">
      <h2 id="remove-by-id-heading" className="remove-by-id__title">
        Удаление по id из localStorage
      </h2>
      <p className="remove-by-id__label">Id в localStorage сейчас</p>
      {idsInSession.length === 0 ? (
        <p className="remove-by-id__ids remove-by-id__ids--empty">нет сохранённых карточек</p>
      ) : (
        <ul className="remove-by-id__ids">
          {idsInSession.map((id) => (
            <li key={id} className="remove-by-id__id-item">
              <code>{id}</code>
            </li>
          ))}
        </ul>
      )}
      <form className="remove-by-id__form" onSubmit={handleSubmit}>
        <label className="remove-by-id__field-label" htmlFor="remove-card-id-input">
          Id для удаления
        </label>
        <div className="remove-by-id__row">
          <input
            id="remove-card-id-input"
            className="remove-by-id__input"
            type="text"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            placeholder="например, cat-7k2m"
            autoComplete="off"
          />
          <button type="submit" className="remove-by-id__btn">
            Удалить
          </button>
        </div>
      </form>
      {hint && (
        <p className="remove-by-id__hint" role="status">
          {hint}
        </p>
      )}
    </section>
  )
}
