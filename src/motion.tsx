import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { MotionContext, readPreference, STORAGE_KEY, systemReduced, useMotion } from './motion-context'
import type { Preference } from './motion-context'

export function MotionProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<Preference>(readPreference)
  const [reduced, setReduced] = useState(systemReduced)
  const motion = preference === 'system' ? !reduced : preference === 'on'

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off'
  }, [motion])

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  const toggle = () => {
    const next = !motion
    setPreference(next ? 'on' : 'off')
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
    } catch {
      // The choice still applies until reload.
    }
  }

  return <MotionContext.Provider value={{ motion, toggle }}>{children}</MotionContext.Provider>
}

export function MotionToggle() {
  const { motion, toggle } = useMotion()
  return (
    <button type="button" className="motion-toggle" aria-pressed={motion} onClick={toggle}>
      {motion ? 'Motion on' : 'Motion off'}
    </button>
  )
}
