import type { TerrainType, ResourceType, CommodityType } from '../types/game'

export interface BuildingProduction {
  resource: ResourceType | CommodityType
  amount: number
  validTerrains: TerrainType[]
}

// Maps card ID → terrain placement constraints + resource output per turn
export const BUILDING_PRODUCTION: Record<string, BuildingProduction> = {
  quarry:           { resource: 'stone', amount: 1, validTerrains: ['mountain'] },
  lumber_mill:      { resource: 'wood',  amount: 1, validTerrains: ['forest'] },
  farm:             { resource: 'food',  amount: 1, validTerrains: ['farmland'] },
  salt_mine:        { resource: 'food',  amount: 1, validTerrains: ['desert'] },
  mine:             { resource: 'iron',  amount: 1, validTerrains: ['mountain'] },
  papyrus_workshop: { resource: 'paper', amount: 1, validTerrains: ['forest'] },
  loom:             { resource: 'cloth', amount: 1, validTerrains: ['farmland'] },
  iron_forge:       { resource: 'iron',  amount: 2, validTerrains: ['mountain'] },
  // glassworks: desert OR any water/ocean-adjacent land — simplified to desert
  glassworks:       { resource: 'glass', amount: 1, validTerrains: ['desert'] },
  scriptorium:      { resource: 'paper', amount: 2, validTerrains: ['plains', 'farmland', 'mountain', 'desert', 'forest', 'capitol', 'ruins'] },
}
