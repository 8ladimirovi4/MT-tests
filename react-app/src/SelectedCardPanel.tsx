import { useEffect, useState } from 'react'
import { getCatalogCardById } from './cardCatalog'
import {
  readSelectedCardId,
  SELECTED_CARD_ID_EVENT,
} from './selectedCardIdStorage'
import './SelectedCardPanel.css'

export function SelectedCardPanel() {
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    readSelectedCardId(),
  )

  useEffect(() => {
    const sync = () => setSelectedId(readSelectedCardId())
    window.addEventListener(SELECTED_CARD_ID_EVENT, sync)
    return () => window.removeEventListener(SELECTED_CARD_ID_EVENT, sync)
  }, [])

  const card = selectedId ? getCatalogCardById(selectedId) : undefined

  return (
    <section className="selected-card-panel" aria-live="polite">
      <h2 className="selected-card-panel__title">Карточка из каталога</h2>
      {!selectedId && (
        <p className="selected-card-panel__empty">
          Выберите id в сайдбаре — в sessionStorage запишется выбранный id, карточка
          появится здесь.
        </p>
      )}
      {selectedId && !card && (
        <p className="selected-card-panel__empty">
          В storage указан неизвестный id: <code>{selectedId}</code>
        </p>
      )}
      {card && (
        <article className="selected-card-panel__card">
          <h3 className="selected-card-panel__card-title">{card.title}</h3>
          <p className="selected-card-panel__card-text">{card.description}</p>
        </article>
      )}
    </section>
  )
}
