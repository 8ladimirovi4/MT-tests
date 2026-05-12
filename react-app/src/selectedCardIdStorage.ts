export const SELECTED_CARD_ID_KEY = 'sandbox-selected-card-id'

export const SELECTED_CARD_ID_EVENT = 'sandbox-selected-card-id-changed'

export function readSelectedCardId(): string | null {
  try {
    const v = sessionStorage.getItem(SELECTED_CARD_ID_KEY)
    return v && v.trim().length > 0 ? v.trim() : null
  } catch {
    return null
  }
}

export function writeSelectedCardId(id: string): void {
  sessionStorage.setItem(SELECTED_CARD_ID_KEY, id)
  window.dispatchEvent(new CustomEvent(SELECTED_CARD_ID_EVENT))
}

export function clearSelectedCardId(): void {
  sessionStorage.removeItem(SELECTED_CARD_ID_KEY)
  window.dispatchEvent(new CustomEvent(SELECTED_CARD_ID_EVENT))
}
