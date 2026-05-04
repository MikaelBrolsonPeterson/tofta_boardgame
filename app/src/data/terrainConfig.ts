import type { TerrainType } from '../types/game'

export interface TerrainConfig {
  label: string
  color: string
  textColor: string
  upkeep: number
  taxation: number
  defenseBonus: number
  attacksToConquer: number
  conquerable: boolean
  special?: string
}

export const TERRAIN: Record<TerrainType, TerrainConfig> = {
  ocean:     { label: 'Ocean',     color: '#1a5e8a', textColor: '#a8d4f0', upkeep: 0, taxation: 1, defenseBonus: 0, attacksToConquer: 1, conquerable: false, special: 'Requires Navy' },
  water:     { label: 'Water',     color: '#2980b9', textColor: '#d6eaf8', upkeep: 0, taxation: 3, defenseBonus: 0, attacksToConquer: 0, conquerable: false, special: 'Cannot be attacked' },
  grassland: { label: 'Grassland', color: '#27ae60', textColor: '#d5f5e3', upkeep: 1, taxation: 3, defenseBonus: 0, attacksToConquer: 1, conquerable: true },
  mountain:  { label: 'Mountain',  color: '#7f8c8d', textColor: '#f2f3f4', upkeep: 3, taxation: 1, defenseBonus: 2, attacksToConquer: 1, conquerable: true },
  swamp:     { label: 'Swamp',     color: '#1e8449', textColor: '#a9dfbf', upkeep: 1, taxation: 0, defenseBonus: 1, attacksToConquer: 2, conquerable: true, special: '2 attacks needed' },
  desert:    { label: 'Desert',    color: '#d4ac0d', textColor: '#fef9e7', upkeep: 0, taxation: 1, defenseBonus: 0, attacksToConquer: 1, conquerable: true, special: 'Attacker disadvantage' },
  forest:    { label: 'Forest',    color: '#1a5c2a', textColor: '#a9dfbf', upkeep: 2, taxation: 1, defenseBonus: 1, attacksToConquer: 1, conquerable: true },
  capitol:   { label: 'Capitol',   color: '#b7950b', textColor: '#fef9e7', upkeep: 1, taxation: 4, defenseBonus: 2, attacksToConquer: 3, conquerable: true, special: '3 attacks + disadvantage' },
  ruins:     { label: 'Ruins',     color: '#7d6608', textColor: '#f9e79f', upkeep: 2, taxation: 2, defenseBonus: -1, attacksToConquer: 1, conquerable: true, special: '+1 Wild/round' },
}
