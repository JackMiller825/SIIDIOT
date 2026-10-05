import { useState } from 'react'
import { Lightbox } from './ui'
import type { LightboxItem } from './ui'

export function useLightbox() {
  const [item, setItem] = useState<LightboxItem | null>(null)
  const lightbox = item ? (
    <Lightbox src={item.src} alt={item.alt} label={item.label} onClose={() => setItem(null)} />
  ) : null
  return { open: setItem, lightbox }
}
