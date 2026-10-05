import { useCallback, useEffect, useRef, useState } from 'react'
import { gameCopy } from '../copy'
import { applySwap, createRound, isCorrectChoice, replaySwaps } from '../lib/escGame'
import type { Swap } from '../lib/escGame'
import { images } from '../lib/images'
import type { ImageAsset } from '../lib/images'
import { browserStorage, readBestScore, writeBestScore } from '../lib/storage'
import { cx } from '../lib/cx'
import { useMotion } from '../motion-context'
import { SmartImage } from './ui'

type Phase = 'idle' | 'reveal' | 'shuffle' | 'choose' | 'result'

const KEY_IDS = [0, 1, 2]

function reactionFor(phase: Phase, outcome: 'correct' | 'incorrect' | null): { image: ImageAsset; alt: string } {
  if (phase === 'result' && outcome === 'correct') {
    return { image: images.proud, alt: 'Superintelligent Idiot smiling with both thumbs up.' }
  }
  if (phase === 'result' && outcome === 'incorrect') {
    return { image: images.confused, alt: 'Superintelligent Idiot shrugging, confused.' }
  }
  if (phase === 'reveal' || phase === 'shuffle' || phase === 'choose') {
    return { image: images.thinking, alt: 'Superintelligent Idiot thinking with a finger on its chin.' }
  }
  return { image: images.sleeping, alt: 'Superintelligent Idiot resting with closed eyes.' }
}

export function FindEsc() {
  const { motion } = useMotion()
  const motionRef = useRef(motion)

  useEffect(() => {
    motionRef.current = motion
  }, [motion])

  const stored = readBestScore(browserStorage())
  const [phase, setPhase] = useState<Phase>('idle')
  const [order, setOrder] = useState<number[]>([0, 1, 2])
  const [escId, setEscId] = useState(0)
  const [showMark, setShowMark] = useState(false)
  const [moving, setMoving] = useState<Swap | null>(null)
  const [round, setRound] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [best, setBest] = useState(stored.value)
  const [storageNote, setStorageNote] = useState(!stored.ok)
  const [outcome, setOutcome] = useState<'correct' | 'incorrect' | null>(null)
  const [status, setStatus] = useState(gameCopy.rest)

  const phaseRef = useRef<Phase>('idle')
  const orderRef = useRef<number[]>([0, 1, 2])
  const escRef = useRef(0)
  const streakRef = useRef(0)
  const bestRef = useRef(stored.value)
  const tokenRef = useRef(0)
  const timersRef = useRef<number[]>([])
  const lockRef = useRef(false)

  function setPhaseNow(next: Phase) {
    phaseRef.current = next
    setPhase(next)
  }

  function setOrderNow(next: number[]) {
    orderRef.current = next
    setOrder(next)
  }

  function clearTimers() {
    for (const id of timersRef.current) window.clearTimeout(id)
    timersRef.current = []
  }

  function later(token: number, delay: number, fn: () => void) {
    const id = window.setTimeout(() => {
      if (tokenRef.current !== token) return
      fn()
    }, delay)
    timersRef.current.push(id)
  }

  useEffect(() => {
    return () => {
      tokenRef.current += 1
      clearTimers()
    }
  }, [])

  function begin() {
    if (phaseRef.current !== 'idle' && phaseRef.current !== 'result') return
    clearTimers()
    const token = (tokenRef.current += 1)
    lockRef.current = false
    setPhaseNow('reveal')
    const plan = createRound(Math.random)
    if (import.meta.env.DEV && replaySwaps(plan.swaps).join() !== plan.finalOrder.join()) {
      console.error('ESC shuffle plan diverged from its own swaps')
    }
    escRef.current = plan.escId
    setEscId(plan.escId)
    setOrderNow([0, 1, 2])
    setShowMark(true)
    setMoving(null)
    setOutcome(null)
    setRound((value) => value + 1)
    setStatus('Watch the highlighted keycap.')

    const revealMs = motionRef.current ? 1300 : 900
    later(token, revealMs, () => {
      setShowMark(false)
      setPhaseNow('shuffle')
      setStatus('The keycaps are moving.')
      step(token, plan.swaps, 0, [0, 1, 2])
    })
  }

  function step(token: number, swaps: readonly Swap[], index: number, current: number[]) {
    if (tokenRef.current !== token) return
    if (index >= swaps.length) {
      const replayed = replaySwaps(swaps)
      const shown = replayed.join() === current.join() ? current : replayed
      setOrderNow(shown)
      setMoving(null)
      setShowMark(false)
      setPhaseNow('choose')
      setStatus('Pick a keycap. Press 1, 2, or 3.')
      return
    }
    const swap = swaps[index]
    const next = applySwap(current, swap[0], swap[1])
    setOrderNow(next)
    setMoving(swap)
    const delay = motionRef.current ? 700 : 620
    later(token, delay, () => step(token, swaps, index + 1, next))
  }

  const choose = useCallback((slot: number) => {
    if (lockRef.current) return
    if (phaseRef.current !== 'choose') return
    if (slot < 0 || slot > 2) return
    lockRef.current = true
    const ok = isCorrectChoice(orderRef.current, slot, escRef.current)
    phaseRef.current = 'result'
    setPhase('result')
    setOutcome(ok ? 'correct' : 'incorrect')
    setShowMark(true)
    setMoving(null)
    if (ok) {
      const nextStreak = streakRef.current + 1
      streakRef.current = nextStreak
      setCorrect((value) => value + 1)
      if (nextStreak > bestRef.current) {
        bestRef.current = nextStreak
        setBest(nextStreak)
        const saved = writeBestScore(browserStorage(), nextStreak)
        if (!saved) setStorageNote(true)
      }
      setStatus(gameCopy.correct)
    } else {
      streakRef.current = 0
      setStatus(gameCopy.incorrect)
    }
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) return
      }
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return
      const menu = document.getElementById('mobile-nav')
      if (menu && !menu.hasAttribute('hidden')) return
      if (phaseRef.current !== 'choose') return
      if (event.key !== '1' && event.key !== '2' && event.key !== '3') return
      event.preventDefault()
      choose(Number(event.key) - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose])

  const reaction = reactionFor(phase, outcome)
  const domIds = phase === 'choose' || phase === 'result' ? order : KEY_IDS
  const running = phase === 'reveal' || phase === 'shuffle' || phase === 'choose'

  return (
    <section className="section section-dark" id="find-esc" tabIndex={-1} aria-labelledby="esc-title">
      <div className="wrap game-layout">
        <div className="game-copy">
          <p className="eyebrow">{gameCopy.kicker}</p>
          <h2 id="esc-title">{gameCopy.heading}</h2>
          <p className="lede">{gameCopy.description}</p>
          <p>{motion ? 'The marked keycap slides. Follow that one.' : 'Motion is off. Each swap is a hard cut. Keep your eye on the keycap that showed ESC.'}</p>
        </div>
        <div className="game-play">
          <SmartImage image={reaction.image} alt={reaction.alt} className="reaction" />
          <p className="game-status" id="esc-status" aria-live="polite" aria-atomic="true">
            {status}
          </p>
          <dl className="scoreboard">
            <div>
              <dt>Round</dt>
              <dd>{round}</dd>
            </div>
            <div>
              <dt>Correct</dt>
              <dd>{correct}</dd>
            </div>
            <div>
              <dt>Best</dt>
              <dd>{best}</dd>
            </div>
          </dl>
          <p className="fine on-dark">Best is your longest correct streak saved in this browser.</p>
          {storageNote ? (
            <p className="fine on-dark" role="status">
              This browser did not save the best streak. It will last for this visit only.
            </p>
          ) : null}
          <div className="key-stage" role="group" aria-label="Three keycaps">
            {domIds.map((id) => {
              const slot = order.indexOf(id)
              const marked = showMark && id === escId
              const swapping = moving !== null && (slot === moving[0] || slot === moving[1])
              return (
                <button
                  key={id}
                  type="button"
                  className={cx('keycap', marked && 'is-marked', swapping && 'is-moving')}
                  data-key={id}
                  style={{ ['--slot' as string]: String(slot) }}
                  disabled={phase !== 'choose'}
                  aria-label={marked ? `Keycap ${slot + 1}, ESC` : `Keycap ${slot + 1}`}
                  onClick={() => choose(slot)}
                >
                  <span className="keycap-face" aria-hidden="true">
                    {marked ? 'ESC' : ''}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="slot-labels" aria-hidden="true">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div className="game-actions">
            <button type="button" className="btn btn-primary" onClick={begin} disabled={phase !== 'idle'}>
              Start
            </button>
            <button type="button" className="btn btn-ghost" onClick={begin} disabled={phase !== 'result'}>
              Replay
            </button>
          </div>
          {running ? <p className="sr-only">Answers are disabled until the swaps finish.</p> : null}
        </div>
      </div>
    </section>
  )
}
