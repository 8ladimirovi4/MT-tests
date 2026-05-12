export const SAVED_CARDS_SESSION_KEY = 'sandbox-saved-cards'

/** Срабатывает при любом изменении массива в хранилище (та же вкладка). */
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

/** Однократный перенос из sessionStorage (старый симулятор) в localStorage. */
function migrateFromSessionStorageIfNeeded(): boolean {
  try {
    if (localStorage.getItem(SAVED_CARDS_SESSION_KEY)) return false
    const legacy = sessionStorage.getItem(SAVED_CARDS_SESSION_KEY)
    if (!legacy) return false
    localStorage.setItem(SAVED_CARDS_SESSION_KEY, legacy)
    sessionStorage.removeItem(SAVED_CARDS_SESSION_KEY)
    return true
  } catch {
    return false
  }
}

export function readSavedCards(): StorableCard[] {
  if (migrateFromSessionStorageIfNeeded()) {
    notifySavedCardsChanged()
  }
  try {
    const raw = localStorage.getItem(SAVED_CARDS_SESSION_KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as unknown
    if (!Array.isArray(data)) return []
    return data.filter(isStorableCard)
  } catch {
    localStorage.removeItem(SAVED_CARDS_SESSION_KEY)
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
  localStorage.setItem(SAVED_CARDS_SESSION_KEY, JSON.stringify(list))
  notifySavedCardsChanged()
}

/** Удаляет карточку по `id`. Если массив пустеет — ключ убирается из localStorage. */
export function removeSavedCard(id: string): void {
  const list = readSavedCards().filter((c) => c.id !== id)
  if (list.length === 0) {
    localStorage.removeItem(SAVED_CARDS_SESSION_KEY)
  } else {
    localStorage.setItem(SAVED_CARDS_SESSION_KEY, JSON.stringify(list))
  }
  notifySavedCardsChanged()
}

/** Удаляет все сохранённые карточки из localStorage. */
export function clearAllSavedCards(): void {
  localStorage.removeItem(SAVED_CARDS_SESSION_KEY)
  notifySavedCardsChanged()
}
