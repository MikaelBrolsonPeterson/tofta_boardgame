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
  | { type: 'attackAction'; amount: number }
  | { type: 'marketAction'; amount: number }
  | { type: 'vp'; amount: number }

export const TRACK_BENEFITS: Record<CardClass, TrackBenefit[]> = {
  military: [
    { type: 'attackAction', amount: 1 },
    { type: 'gold', amount: 2 },
    { type: 'attackAction', amount: 2 },
    { type: 'vp', amount: 4 },
  ],
  market: [
    { type: 'marketAction', amount: 1 },
    { type: 'gold', amount: 2 },
    { type: 'marketAction', amount: 2 },
    { type: 'vp', amount: 4 },
  ],
  science: [
    { type: 'marketAction', amount: 1 },
    { type: 'gold', amount: 3 },
    { type: 'marketAction', amount: 2 },
    { type: 'vp', amount: 7 },
  ],
  misc: [
    { type: 'attackAction', amount: 1 },
    { type: 'gold', amount: 2 },
    { type: 'attackAction', amount: 2 },
    { type: 'vp', amount: 4 },
  ],
  wonders: [
    { type: 'vp', amount: 2 },
    { type: 'vp', amount: 4 },
    { type: 'vp', amount: 7 },
  ],
}
