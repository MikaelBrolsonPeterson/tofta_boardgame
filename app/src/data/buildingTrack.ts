import type { CardClass, TrackBenefit } from '../types/game'

export const CLASS_LIMIT: Record<CardClass, number> = {
  military: 4,
  market: 4,
  science: 4,
  misc: 4,
  wonders: 3,
  action: 99,
}

export type TrackTier =
  | { kind: 'locked'; benefit: TrackBenefit }
  | { kind: 'choice'; options: TrackBenefit[] }

export const TRACK_TIERS: Record<CardClass, TrackTier[]> = {
  military: [
    { kind: 'locked', benefit: { type: 'attackAction', amount: 1 } },
    { kind: 'choice', options: [
      { type: 'gold', amount: 3 },
      { type: 'production', buildingId: 'quarry',    label: 'Quarry — Stone / Mountain' },
      { type: 'production', buildingId: 'mine',      label: 'Mine — Iron / Mountain' },
    ]},
    { kind: 'choice', options: [
      { type: 'attackAction', amount: 1 },
      { type: 'production', buildingId: 'iron_forge', label: 'Iron Forge — 2× Iron / Mountain' },
    ]},
    { kind: 'locked', benefit: { type: 'vp', amount: 2 } },
  ],
  market: [
    { kind: 'choice', options: [
      { type: 'production', buildingId: 'farm', label: 'Farm — Food / Farmland' },
      { type: 'production', buildingId: 'loom', label: 'Loom — Cloth / Farmland' },
    ]},
    { kind: 'locked', benefit: { type: 'marketAction', amount: 1 } },
    { kind: 'choice', options: [
      { type: 'marketAction', amount: 1 },
      { type: 'gold', amount: 3 },
      { type: 'production', buildingId: 'glassworks', label: 'Glassworks — Glass / Desert' },
    ]},
    { kind: 'locked', benefit: { type: 'vp', amount: 2 } },
  ],
  science: [
    { kind: 'locked', benefit: { type: 'cardSlot', amount: 1 } },
    { kind: 'choice', options: [
      { type: 'tokenDiscount', amount: 2 },
      { type: 'production', buildingId: 'lumber_mill',       label: 'Lumber Mill — Wood / Forest' },
      { type: 'production', buildingId: 'papyrus_workshop',  label: 'Papyrus Workshop — Paper / Forest' },
    ]},
    { kind: 'choice', options: [
      { type: 'cardSlot', amount: 1 },
      { type: 'production', buildingId: 'scriptorium', label: 'Scriptorium — 2× Paper / anywhere' },
    ]},
    { kind: 'locked', benefit: { type: 'vp', amount: 2 } },
  ],
  wonders: [
    { kind: 'locked', benefit: { type: 'vp', amount: 1 } },
    { kind: 'locked', benefit: { type: 'vp', amount: 2 } },
    { kind: 'locked', benefit: { type: 'vp', amount: 3 } },
  ],
  misc: [
    { kind: 'locked', benefit: { type: 'attackAction', amount: 1 } },
    { kind: 'locked', benefit: { type: 'gold', amount: 2 } },
    { kind: 'locked', benefit: { type: 'attackAction', amount: 1 } },
    { kind: 'locked', benefit: { type: 'vp', amount: 2 } },
  ],
  action: [],
}

// Backward-compat flat list: defaults to first option for choice tiers
export const TRACK_BENEFITS: Record<CardClass, TrackBenefit[]> = Object.fromEntries(
  Object.entries(TRACK_TIERS).map(([cls, tiers]) => [
    cls,
    tiers.map(tier => tier.kind === 'locked' ? tier.benefit : tier.options[0]),
  ])
) as Record<CardClass, TrackBenefit[]>
