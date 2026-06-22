export type TerrainType = 'ocean' | 'water' | 'plains' | 'farmland' | 'mountain' | 'desert' | 'forest' | 'capitol' | 'ruins'

export type PlayerId = 'player1' | 'player2' | 'player3' | 'player4' | 'player5'

export type ModifierValue = 'fail' | 'success' | -2 | -1 | 0 | 1 | 2

export type CardClass = 'military' | 'market' | 'science' | 'wonders' | 'misc' | 'action'
export type ResourceType = 'stone' | 'wood' | 'food'
export type CommodityType = 'iron' | 'paper' | 'cloth' | 'glass' | 'wild'

export type TrackBenefit =
  | { type: 'gold'; amount: number }
  | { type: 'attackAction'; amount: number }
  | { type: 'marketAction'; amount: number }
  | { type: 'cardSlot'; amount: number }
  | { type: 'tokenDiscount'; amount: number }
  | { type: 'vp'; amount: number }
  | { type: 'production'; buildingId: string; label: string }

export interface PendingTrackChoice {
  cls: CardClass
  options: TrackBenefit[]
}

export interface AltCostItem {
  type: ResourceType | CommodityType
  amount: number
}

export interface EmpireCard {
  id: string
  name: string
  class: CardClass
  era: 1 | 2 | 3
  goldCost: number
  altCost: AltCostItem[]
  placement: string
  effect: string
  vp: number
}

export interface HexCoord {
  q: number
  r: number
}

export interface Marker {
  label: string
  placedInEra: number
}

export interface HexRegion extends HexCoord {
  terrain: TerrainType
  owner: PlayerId | null
  inRevolt: boolean
  militaryMarker: Marker | null
  productionMarker: Marker | null
}

export interface Player {
  id: PlayerId
  name: string
  color: string
  gold: number
  attackActionsRemaining: number
  marketActionsRemaining: number
  attackActionsPerTurn: number
  marketActionsPerTurn: number
  resources: { stone: number; wood: number; food: number }
  commodities: { iron: number; paper: number; cloth: number; glass: number; wild: number }
  goldProduction: number
  modifierDeck: ModifierValue[]
  modifierDiscard: ModifierValue[]
  activeCards: EmpireCard[]
  buildingTrack: Record<CardClass, number>
  victoryPoints: number
}

export interface CombatResult {
  attackerRoll: ModifierValue
  defenderRoll: ModifierValue
  attackerTotal: number
  defenderTotal: number
  success: boolean
  message: string
}

export type GamePhase = 'action' | 'select-attack-target' | 'defender-rearrange' | 'select-rearrange-destination' | 'place-production-marker' | 'select-track-benefit'

export interface PendingConquest {
  fromQ: number
  fromR: number
  toQ: number
  toR: number
  attackerIndex: number
  defenderPlayerId: PlayerId
  combatResult: CombatResult
  logEntry: string
}

export interface PendingPlacement {
  cardId: string
  cardName: string
  validTerrains: TerrainType[]
}

export interface GameState {
  regions: Record<string, HexRegion>
  players: Player[]
  currentPlayerIndex: number
  round: number
  era: number
  phase: GamePhase
  selectedHex: HexCoord | null
  attackSourceHex: HexCoord | null
  conquestProgress: Record<string, number>
  log: string[]
  lastCombat: CombatResult | null
  marketCards: (EmpireCard | null)[]
  marketDeck: EmpireCard[]
  pendingClaims: Record<string, PlayerId>
  pendingConquest: PendingConquest | null
  rearrangeSourceKey: string | null
  pendingPlacement: PendingPlacement | null
  pendingTrackChoice: PendingTrackChoice | null
  modifierDrawPile: ModifierValue[]
}
