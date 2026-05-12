export const SIMULATED_SESSION_KEY = 'sandbox-simulated-session'

export const SIMULATED_SESSION_EVENT = 'sandbox-simulated-session-changed'

export type SimulatedSession = {
  id: string
  createdAt: string
}

export function readSimulatedSession(): SimulatedSession | null {
  try {
    const raw = sessionStorage.getItem(SIMULATED_SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as unknown
    if (
      data &&
      typeof data === 'object' &&
      'id' in data &&
      'createdAt' in data &&
      typeof (data as SimulatedSession).id === 'string' &&
      typeof (data as SimulatedSession).createdAt === 'string'
    ) {
      return data as SimulatedSession
    }
  } catch {
    sessionStorage.removeItem(SIMULATED_SESSION_KEY)
  }
  return null
}

export function setSimulatedSession(next: SimulatedSession | null): void {
  if (next) {
    sessionStorage.setItem(SIMULATED_SESSION_KEY, JSON.stringify(next))
  } else {
    sessionStorage.removeItem(SIMULATED_SESSION_KEY)
  }
  window.dispatchEvent(new CustomEvent(SIMULATED_SESSION_EVENT))
}
