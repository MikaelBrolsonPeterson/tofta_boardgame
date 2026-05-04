import type { ModifierValue } from '../types/game'

export const BASE_DECK: ModifierValue[] = ['fail', -2, -1, -1, 0, 0, 0, 0, 1, 1, 2, 'success']

export function shuffle(deck: ModifierValue[]): ModifierValue[] {
  const d = [...deck]
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]]
  }
  return d
}

export function drawOne(deck: ModifierValue[], discard: ModifierValue[]): {
  card: ModifierValue
  deck: ModifierValue[]
  discard: ModifierValue[]
} {
  if (deck.length === 0) {
    const reshuffled = shuffle(discard)
    const card = reshuffled.pop()!
    return { card, deck: reshuffled, discard: [] }
  }
  const newDeck = [...deck]
  const card = newDeck.pop()!
  return { card, deck: newDeck, discard: [...discard, card] }
}

export function modifierToNumber(v: ModifierValue): number {
  if (v === 'fail') return -99
  if (v === 'success') return 99
  return v
}

export function modifierLabel(v: ModifierValue): string {
  if (v === 'fail') return 'FAIL'
  if (v === 'success') return 'SUCCESS'
  return v > 0 ? `+${v}` : `${v}`
}
