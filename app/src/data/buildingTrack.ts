import type { CardClass } from '../types/game'

export const CLASS_LIMIT: Record<CardClass, number> = {
  military: 4,
  market: 4,
  science: 4,
  misc: 4,
  wonders: 3,
}

export type TrackBenefit =
  | { type: 'gold'; amount: number }
  | { type: 'attackAction' }
  | { type: 'marketAction' }
  | { type: 'vp'; amount: number }

export const TRACK_BENEFITS: Record<CardClass, TrackBenefit[]> = {
  military: [
    { type: 'gold', amount: 2 },
    { type: 'gold', amount: 2 },
    { type: 'attackAction' },
    { type: 'vp', amount: 1 },
  ],
  market: [
    { type: 'gold', amount: 2 },
    { type: 'gold', amount: 2 },
    { type: 'marketAction' },
    { type: 'vp', amount: 1 },
  ],
  science: [
    { type: 'gold', amount: 2 },
    { type: 'gold', amount: 3 },
    { type: 'marketAction' },
    { type: 'vp', amount: 2 },
  ],
  misc: [
    { type: 'gold', amount: 2 },
    { type: 'gold', amount: 2 },
    { type: 'attackAction' },
    { type: 'vp', amount: 1 },
  ],
  wonders: [
    { type: 'vp', amount: 2 },
    { type: 'vp', amount: 4 },
    { type: 'vp', amount: 7 },
  ],
}
