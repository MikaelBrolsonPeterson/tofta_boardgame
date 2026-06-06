import type { TerrainType } from '../types/game'

export interface TerrainConfig {
  label: string
  color: string        // base fill (used as gradient bottom stop)
  highlight: string    // gradient top stop (lighter)
  textColor: string
  goldProduction: number
  defenseBonus: number
  attackBonus: number
  attacksToConquer: number
  conquerable: boolean
  special?: string
}

export const TERRAIN: Record<TerrainType, TerrainConfig> = {
  ocean:     { label: 'Ocean',     color: '#0c3b5c', highlight: '#155e8a', textColor: '#90c8f0', goldProduction: 0,  defenseBonus: 0,  attackBonus: 0, attacksToConquer: 0, conquerable: false },
  water:     { label: 'Water',     color: '#1255a0', highlight: '#1a80d0', textColor: '#c8e8f8', goldProduction: 0,  defenseBonus: 0,  attackBonus: 0, attacksToConquer: 0, conquerable: false },
  grassland: { label: 'Grassland', color: '#15582c', highlight: '#22a050', textColor: '#a8f0c8', goldProduction: 2,  defenseBonus: 0,  attackBonus: 0, attacksToConquer: 1, conquerable: true  },
  mountain:  { label: 'Mountain',  color: '#4b5563', highlight: '#78828f', textColor: '#e8edf2', goldProduction: -2, defenseBonus: 2,  attackBonus: 0, attacksToConquer: 1, conquerable: true  },
  swamp:     { label: 'Swamp',     color: '#1a3d1c', highlight: '#2d6030', textColor: '#90d8a0', goldProduction: -1, defenseBonus: 1,  attackBonus: 0, attacksToConquer: 2, conquerable: true  },
  desert:    { label: 'Desert',    color: '#a87c10', highlight: '#d4a820', textColor: '#fef8d8', goldProduction: 1,  defenseBonus: 0,  attackBonus: 0, attacksToConquer: 2, conquerable: true  },
  forest:    { label: 'Forest',    color: '#144520', highlight: '#1e6830', textColor: '#90d8a0', goldProduction: -1, defenseBonus: 1,  attackBonus: 0, attacksToConquer: 1, conquerable: true  },
  capitol:   { label: 'Capitol',   color: '#7c4a08', highlight: '#c87814', textColor: '#fef0c0', goldProduction: 3,  defenseBonus: 2,  attackBonus: 2, attacksToConquer: 3, conquerable: true, special: '3 attacks · attacker disadvantage' },
  ruins:     { label: 'Ruins',     color: '#5c4008', highlight: '#8a6010', textColor: '#f8e8a0', goldProduction: 0,  defenseBonus: -1, attackBonus: 0, attacksToConquer: 1, conquerable: true, special: '+1 Wild/round' },
}
