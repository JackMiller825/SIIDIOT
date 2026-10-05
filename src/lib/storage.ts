export const BEST_SCORE_KEY = 'siidiot-esc-best'

type ScoreStore = Pick<Storage, 'getItem' | 'setItem'>

export function readBestScore(storage: ScoreStore | null): { value: number; ok: boolean } {
  if (!storage) return { value: 0, ok: true }
  try {
    const raw = storage.getItem(BEST_SCORE_KEY)
    if (!raw) return { value: 0, ok: true }
    const value = Number(raw)
    if (!Number.isFinite(value) || value < 0) return { value: 0, ok: true }
    return { value: Math.floor(value), ok: true }
  } catch {
    return { value: 0, ok: false }
  }
}

export function writeBestScore(storage: ScoreStore | null, value: number): boolean {
  if (!storage) return false
  try {
    storage.setItem(BEST_SCORE_KEY, String(Math.floor(value)))
    return true
  } catch {
    return false
  }
}

export function browserStorage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') return null
    return localStorage
  } catch {
    return null
  }
}
