import type { TerrainType, PlayerId, HexRegion } from '../types/game'
import { hexKey } from '../utils/hex'

type Entry = [number, number, TerrainType, PlayerId | null]

const MAP: Entry[] = [
  // Capitols
  [-3,  0, 'capitol', 'player1'],
  [ 3,  0, 'capitol', 'player2'],
  // Ancient Ruins — centre
  [ 0,  0, 'ruins',     null],
  // Inner ring
  [ 1,  0, 'grassland', null],
  [-1,  0, 'grassland', null],
  [ 0,  1, 'mountain',  null],
  [ 0, -1, 'mountain',  null],
  [ 1, -1, 'forest',    null],
  [-1,  1, 'forest',    null],
  // Middle ring
  [ 2,  0, 'grassland', null],
  [-2,  0, 'grassland', null],
  [ 2, -1, 'desert',    null],
  [-2,  1, 'desert',    null],
  [ 2, -2, 'mountain',  null],
  [-2,  2, 'mountain',  null],
  [ 1,  1, 'swamp',     null],
  [-1, -1, 'swamp',     null],
  [ 1, -2, 'forest',    null],
  [-1,  2, 'forest',    null],
  [ 0,  2, 'grassland', null],
  [ 0, -2, 'grassland', null],
  // Outer ring
  [ 3, -1, 'grassland', null],
  [-3,  1, 'grassland', null],
  [ 3, -2, 'mountain',  null],
  [-3,  2, 'mountain',  null],
  [ 3, -3, 'ocean',     null],
  [-3,  3, 'ocean',     null],
  [ 2,  1, 'water',     null],
  [-2, -1, 'water',     null],
  [ 2, -3, 'ocean',     null],
  [-2,  3, 'ocean',     null],
  [ 1,  2, 'swamp',     null],
  [-1, -2, 'swamp',     null],
  [ 1, -3, 'desert',    null],
  [-1,  3, 'desert',    null],
  [ 0,  3, 'ocean',     null],
  [ 0, -3, 'ocean',     null],
]

export function buildInitialMap(): Record<string, HexRegion> {
  const regions: Record<string, HexRegion> = {}
  for (const [q, r, terrain, owner] of MAP) {
    regions[hexKey(q, r)] = { q, r, terrain, owner, building: null }
  }
  return regions
}
