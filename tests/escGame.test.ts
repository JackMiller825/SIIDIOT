import { describe, expect, it } from 'vitest'
import { applySwap, createRound, isCorrectChoice, replaySwaps } from '../src/lib/escGame'

function mulberry32(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let next = Math.imul(state ^ (state >>> 15), 1 | state)
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

describe('ESC shell game', () => {
  it('keeps the displayed permutation aligned with the correct key', () => {
    for (let seed = 1; seed <= 200; seed += 1) {
      const plan = createRound(mulberry32(seed), 5)
      expect(replaySwaps(plan.swaps)).toEqual(plan.finalOrder)
      const correctSlot = plan.finalOrder.indexOf(plan.escId)
      expect(correctSlot).toBeGreaterThanOrEqual(0)
      expect(isCorrectChoice(plan.finalOrder, correctSlot, plan.escId)).toBe(true)
      for (const slot of [0, 1, 2]) {
        if (slot === correctSlot) continue
        expect(isCorrectChoice(plan.finalOrder, slot, plan.escId)).toBe(false)
      }
    }
  })

  it('does not mutate the order it swaps', () => {
    const start = [0, 1, 2]
    applySwap(start, 0, 2)
    expect(start).toEqual([0, 1, 2])
  })

  it('moves the marked key on every even swap', () => {
    const plan = createRound(mulberry32(7), 5)
    let order = [0, 1, 2]
    plan.swaps.forEach((swap, index) => {
      const before = order.indexOf(plan.escId)
      order = applySwap(order, swap[0], swap[1])
      if (index % 2 === 0) expect(order.indexOf(plan.escId)).not.toBe(before)
    })
  })
})
