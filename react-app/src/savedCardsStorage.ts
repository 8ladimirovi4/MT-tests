export const SAVED_CARDS_SESSION_KEY = 'sandbox-saved-cards'

/** Срабатывает при любом изменении массива в sessionStorage (добавление, правка, удаление, полная очистка). */
export const SAVED_CARDS_CHANGED_EVENT = 'sandbox-saved-cards-changed'

function notifySavedCardsChanged(): void {
  window.dispatchEvent(new CustomEvent(SAVED_CARDS_CHANGED_EVENT))
}

export type StorableCard = {
  id: string
  title: string
  description: string
}

function isStorableCard(value: unknown): value is StorableCard {
  if (value === null || typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.description === 'string'
  )
}

export function readSavedCards(): StorableCard[] {
  try {
    const raw = sessionStorage.getItem(SAVED_CARDS_SESSION_KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as unknown
    if (!Array.isArray(data)) return []
    return data.filter(isStorableCard)
  } catch {
    sessionStorage.removeItem(SAVED_CARDS_SESSION_KEY)
    notifySavedCardsChanged()
    return []
  }
}

/** Добавляет или обновляет карточку по `id`. */
export function upsertSavedCard(card: StorableCard): void {
  const list = readSavedCards()
  const index = list.findIndex((c) => c.id === card.id)
  if (index >= 0) {
    list[index] = card
  } else {
    list.push(card)
  }
  sessionStorage.setItem(SAVED_CARDS_SESSION_KEY, JSON.stringify(list))
  notifySavedCardsChanged()
}

/** Удаляет карточку по `id`. Если массив пустеет — ключ убирается из sessionStorage. */
export function removeSavedCard(id: string): void {
  const list = readSavedCards().filter((c) => c.id !== id)
  if (list.length === 0) {
    sessionStorage.removeItem(SAVED_CARDS_SESSION_KEY)
  } else {
    sessionStorage.setItem(SAVED_CARDS_SESSION_KEY, JSON.stringify(list))
  }
  notifySavedCardsChanged()
}

/** Удаляет все сохранённые карточки из sessionStorage. */
export function clearAllSavedCards(): void {
  sessionStorage.removeItem(SAVED_CARDS_SESSION_KEY)
  notifySavedCardsChanged()
}
