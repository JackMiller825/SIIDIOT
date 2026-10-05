export type Swap = readonly [number, number]

export type RoundPlan = {
  escId: number
  swaps: Swap[]
  finalOrder: number[]
}

export function applySwap(order: readonly number[], a: number, b: number): number[] {
  const next = order.slice()
  const from = next[a]
  next[a] = next[b]
  next[b] = from
  return next
}

export function replaySwaps(swaps: readonly Swap[], start: readonly number[] = [0, 1, 2]): number[] {
  return swaps.reduce((order, [a, b]) => applySwap(order, a, b), start.slice())
}

function otherSlot(exclude: number, random: () => number): number {
  const options = [0, 1, 2].filter((slot) => slot !== exclude)
  const index = Math.floor(random() * options.length) % options.length
  return options[index] ?? options[0]
}

/** Build a shell-game round. Even swaps always move the ESC keycap. */
export function createRound(random: () => number, swapCount = 5): RoundPlan {
  const escId = Math.floor(random() * 3) % 3
  let order = [0, 1, 2]
  const swaps: Swap[] = []
  const count = Math.max(1, swapCount)
  for (let index = 0; index < count; index += 1) {
    const escSlot = order.indexOf(escId)
    const a = index % 2 === 0 ? escSlot : Math.floor(random() * 3) % 3
    const b = otherSlot(a, random)
    swaps.push([a, b])
    order = applySwap(order, a, b)
  }
  return { escId, swaps, finalOrder: order }
}

export function isCorrectChoice(finalOrder: readonly number[], slot: number, escId: number): boolean {
  return finalOrder[slot] === escId
}
