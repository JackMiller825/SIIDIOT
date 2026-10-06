import { useEffect, useRef, useState } from 'react'
import { navItems } from '../copy'
import { images } from '../lib/images'
import { MotionToggle } from '../motion'
import { SmartImage } from './ui'

function focusSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  window.requestAnimationFrame(() => {
    target.focus({ preventScroll: true })
  })
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header || typeof ResizeObserver === 'undefined') return
    const apply = () => {
      const next = `${header.offsetHeight}px`
      if (document.documentElement.style.getPropertyValue('--header-h') === next) return
      document.documentElement.style.setProperty('--header-h', next)
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setCurrent(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.1, 0.25, 0.5] },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const media = window.matchMedia('(min-width: 1100px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function closeAndFocus(id: string) {
    setOpen(false)
    focusSection(id)
  }

  const linkNodes = (onNavigate?: (id: string) => void) =>
    navItems.map((item) => (
      <a
        key={item.id}
        href={item.href}
        aria-current={current === item.id ? 'true' : undefined}
        onClick={() => onNavigate?.(item.id)}
      >
        {item.label}
      </a>
    ))

  const actionNodes = (onNavigate?: (id: string) => void) => (
    <>
      <a className="btn btn-ghost" href="#find-esc" onClick={() => onNavigate?.('find-esc')}>
        Play
      </a>
      <a className="btn btn-ghost" href="#community" onClick={() => onNavigate?.('community')}>
        Join
      </a>
    </>
  )

  return (
    <header className="site-header" ref={headerRef}>
      <div className="bar">
        <a className="brand" href="#top">
          <SmartImage image={images.icon} alt="" eager className="brand-icon" />
          <span>SIIDIOT</span>
        </a>
        <nav className="nav-desktop" aria-label="Primary">
          <div className="nav-links">{linkNodes()}</div>
          <div className="nav-actions">{actionNodes()}</div>
        </nav>
        <div className="bar-end">
          <MotionToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className="nav-mobile" aria-label="Primary" hidden={!open}>
        {linkNodes(closeAndFocus)}
        <div className="nav-actions">{actionNodes(closeAndFocus)}</div>
      </nav>
    </header>
  )
}
