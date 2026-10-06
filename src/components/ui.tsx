import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { site } from '../config'
import { publicUrl } from '../lib/assets'
import { copyText } from '../lib/clipboard'
import { cx } from '../lib/cx'
import type { ImageAsset } from '../lib/images'
import { resolveProject } from '../lib/project'

type SmartImageProps = {
  image: ImageAsset
  alt: string
  eager?: boolean
  className?: string
  fit?: 'contain' | 'cover'
}

export function SmartImage({ image, alt, eager = false, className, fit = 'contain' }: SmartImageProps) {
  return (
    <img
      src={publicUrl(image.file)}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      className={cx('smart-img', fit === 'cover' ? 'fit-cover' : 'fit-contain', className)}
    />
  )
}

type GatedLinkProps = {
  href: string | null
  label: string
  pendingLabel: string
  className: string
  pendingClassName: string
}

export function GatedLink({ href, label, pendingLabel, className, pendingClassName }: GatedLinkProps) {
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    )
  }
  return (
    <button type="button" className={pendingClassName} disabled>
      {pendingLabel}
    </button>
  )
}

const COMING_SOON = 'Coming Soon..'

export function ContractAddress({ tone = 'paper', showKicker = true }: { tone?: 'paper' | 'dark'; showKicker?: boolean }) {
  const address = resolveProject(site).address
  const value = address ?? COMING_SOON
  const [notice, setNotice] = useState('')
  const [manual, setManual] = useState(false)
  const manualRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!manual) return
    manualRef.current?.focus()
    manualRef.current?.select()
  }, [manual])

  async function onCopy() {
    const ok = await copyText(value)
    if (ok) {
      setManual(false)
      setNotice(address ? 'Copied the full contract address.' : 'Copied.')
      return
    }
    setManual(true)
    setNotice('Could not copy automatically. Select the text below.')
  }

  return (
    <div className={cx('contract', tone === 'dark' ? 'contract-dark' : 'contract-paper')}>
      {showKicker ? <p className="contract-kicker">Contract</p> : null}
      <div className="address-line">
        <p className={cx('address', !address && 'is-pending')}>{value}</p>
        <button type="button" className="btn btn-small" onClick={onCopy}>
          Copy address
        </button>
      </div>
      <p className="contract-notice" role="status" aria-live="polite">
        {notice}
      </p>
      {manual ? (
        <textarea
          ref={manualRef}
          className="manual-caption"
          readOnly
          value={value}
          rows={2}
          aria-label="Contract text to copy"
        />
      ) : null}
    </div>
  )
}

type LightboxProps = {
  src: string
  alt: string
  label: string
  onClose: () => void
}

export function Lightbox({ src, alt, label, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const root = dialogRef.current
      if (!root) return
      const items = Array.from(
        root.querySelectorAll<HTMLElement>('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => !element.hasAttribute('disabled'))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      ref={dialogRef}
      onClick={onClose}
    >
      <button ref={closeRef} type="button" className="btn btn-gold lightbox-close" onClick={onClose}>
        Close
      </button>
      <img src={src} alt={alt} className="lightbox-img" onClick={(event) => event.stopPropagation()} />
    </div>,
    document.body,
  )
}

export type LightboxItem = {
  src: string
  alt: string
  label: string
}
