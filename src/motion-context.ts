import { createContext, useContext } from 'react'

export const STORAGE_KEY = 'siidiot-motion'

export type Preference = 'system' | 'on' | 'off'

export type MotionContextValue = {
  motion: boolean
  toggle: () => void
}

export const MotionContext = createContext<MotionContextValue | null>(null)

export function readPreference(): Preference {
  if (typeof window === 'undefined') return 'system'
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (value === 'on' || value === 'off') return value
  } catch {
    // Keep the system preference when storage is blocked.
  }
  return 'system'
}

export function systemReduced(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useMotion(): MotionContextValue {
  const value = useContext(MotionContext)
  if (!value) throw new Error('useMotion must be used within MotionProvider')
  return value
}
