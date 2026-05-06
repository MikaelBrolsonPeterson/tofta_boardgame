export type TerrainType = 'ocean' | 'water' | 'grassland' | 'mountain' | 'swamp' | 'desert' | 'forest' | 'capitol' | 'ruins'

export type PlayerId = 'player1' | 'player2' | 'player3' | 'player4' | 'player5'

export type ModifierValue = 'fail' | 'success' | -2 | -1 | 0 | 1 | 2

export type CardClass = 'military' | 'market' | 'science' | 'wonders' | 'misc'
export type ResourceType = 'stone' | 'wood' | 'food'
export type CommodityType = 'iron' | 'paper' | 'cloth' | 'glass' | 'wild'

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

export interface HexRegion extends HexCoord {
  terrain: TerrainType
  owner: PlayerId | null
  building: string | null
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
  incomeRate: number
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

export type GamePhase = 'action' | 'select-attack-target'

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
  marketCards: EmpireCard[]
  marketDeck: EmpireCard[]
}
