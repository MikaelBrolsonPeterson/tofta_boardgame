import type { TerrainType, PlayerId, HexRegion } from '../types/game'
import { hexKey } from '../utils/hex'

type Entry = [number, number, TerrainType, PlayerId | null]

// ── Map 1: Two Kingdoms ──────────────────────────────────────────────────────
// Classic symmetric 2-player layout. Balanced terrain mix, two small ocean
// pockets on the flanks (Naval Bastion viable but not dominant).
const MAP_TWO_KINGDOMS: Entry[] = [
  // Capitols
  [-3,  0, 'capitol', 'player1'],
  [ 3,  0, 'capitol', 'player2'],
  // Centre
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
  [ 2,  1, 'ocean',     null],  // connects to [3,-3] chain via [2,-3]
  [-2, -1, 'ocean',     null],
  [ 2, -3, 'ocean',     null],  // adjacent to [3,-3] → 2-tile body
  [-2,  3, 'ocean',     null],  // adjacent to [-3,3] → 2-tile body
  [ 1,  2, 'swamp',     null],
  [-1, -2, 'swamp',     null],
  [ 1, -3, 'desert',    null],
  [-1,  3, 'desert',    null],
  [ 0,  3, 'ocean',     null],
  [ 0, -3, 'ocean',     null],
]

// ── Map 2: The Mountain Pass ─────────────────────────────────────────────────
// A north-south mountain spine divides the map. Two narrow grassland gaps
// (chokepoints) at the equator are the main corridors. Flanking via the
// mountain paths costs extra attack actions and slows expansion.
const MAP_MOUNTAIN_PASS: Entry[] = [
  // Capitols — slightly off-axis to create asymmetric threat angles
  [-3, -1, 'capitol', 'player1'],
  [ 3,  1, 'capitol', 'player2'],
  // Mountain spine (centre column)
  [ 0, -2, 'mountain', null],
  [ 0, -1, 'mountain', null],
  [ 0,  0, 'ruins',    null],  // contested ruins at pass entry
  [ 0,  1, 'mountain', null],
  [ 0,  2, 'mountain', null],
  // Chokepoints — the two narrow passes
  [-1,  0, 'grassland', null],
  [ 1,  0, 'grassland', null],
  // Left landmass
  [-1, -1, 'grassland', null],
  [-1,  1, 'forest',    null],
  [-2,  0, 'grassland', null],
  [-2, -1, 'forest',    null],
  [-2,  1, 'swamp',     null],
  [-2, -2, 'mountain',  null],
  [-2,  2, 'desert',    null],
  [-1, -2, 'desert',    null],
  [-1,  2, 'swamp',     null],
  [-3,  0, 'grassland', null],
  [-3,  1, 'mountain',  null],
  [-3, -2, 'forest',    null],
  [-3,  2, 'ocean',     null],
  [-2,  3, 'ocean',     null],  // 2-tile ocean body on lower-left flank
  // Right landmass
  [ 1, -1, 'forest',    null],
  [ 1,  1, 'grassland', null],
  [ 2,  0, 'grassland', null],
  [ 2, -1, 'swamp',     null],
  [ 2,  1, 'forest',    null],
  [ 2, -2, 'desert',    null],
  [ 2,  2, 'mountain',  null],
  [ 1, -2, 'swamp',     null],
  [ 1,  2, 'desert',    null],
  [ 3,  0, 'grassland', null],
  [ 3, -1, 'mountain',  null],
  [ 3, -3, 'ocean',     null],
  [ 2, -3, 'ocean',     null],  // 2-tile ocean body on upper-right flank
]

// ── Map 3: The Straits ───────────────────────────────────────────────────────
// A central ocean channel (5 connected tiles) splits two landmasses. The only
// land bridge is through ocean — Naval Bastion is required to project power
// across. Coastal regions border the straits and are prime token sites.
const MAP_STRAITS: Entry[] = [
  // Capitols — deep on each landmass
  [-4,  0, 'capitol', 'player1'],
  [ 4,  0, 'capitol', 'player2'],
  // Central ocean channel (vertical column q=0, r=-2…2)
  [ 0, -2, 'ocean',    null],
  [ 0, -1, 'ocean',    null],
  [ 0,  0, 'ocean',    null],
  [ 0,  1, 'ocean',    null],
  [ 0,  2, 'ocean',    null],
  // Flanking ocean (widens the channel at the poles)
  [-1, -2, 'ocean',    null],  // adjacent to [0,-2] → 6-tile body total
  [ 1,  2, 'ocean',    null],  // adjacent to [0,2]
  // Left landmass coastal strip
  [-1, -1, 'desert',   null],
  [-1,  0, 'grassland',null],
  [-1,  1, 'forest',   null],
  [-1,  2, 'ruins',    null],
  // Left landmass interior
  [-2, -1, 'forest',   null],
  [-2,  0, 'grassland',null],
  [-2,  1, 'swamp',    null],
  [-2, -2, 'mountain', null],
  [-2,  2, 'mountain', null],
  // Left landmass outer
  [-3, -1, 'mountain', null],
  [-3,  0, 'grassland',null],
  [-3,  1, 'desert',   null],
  [-3,  2, 'forest',   null],
  [-3, -2, 'ocean',    null],  // flanking ocean
  // Right landmass coastal strip
  [ 1, -2, 'ruins',    null],
  [ 1, -1, 'desert',   null],
  [ 1,  0, 'grassland',null],
  [ 1,  1, 'forest',   null],
  // Right landmass interior
  [ 2, -2, 'mountain', null],
  [ 2, -1, 'forest',   null],
  [ 2,  0, 'grassland',null],
  [ 2,  1, 'swamp',    null],
  [ 2,  2, 'mountain', null],
  // Right landmass outer
  [ 3, -2, 'ocean',    null],  // flanking ocean
  [ 3, -1, 'mountain', null],
  [ 3,  0, 'grassland',null],
  [ 3,  1, 'desert',   null],
  [ 3,  2, 'forest',   null],
]

// ── Map 4: The Fens ──────────────────────────────────────────────────────────
// Four isolated 2-tile ocean pockets. Three land tiles act as natural canal
// bridges: [0,0] is adjacent to both center pockets (Canal Cross → instant
// 4-tile network), [2,-1] extends to the upper-right pocket, [-2,1] extends
// to the lower-left pocket. A fully canalized Fens map yields an 8-tile sea
// network — Maritime Exchange at the hub generates +16 gp/round.
const MAP_FENS: Entry[] = [
  // Capitols
  [-3,  0, 'capitol', 'player1'],
  [ 3,  0, 'capitol', 'player2'],
  // Ocean body A (lower-center): [-1,1] adj [0,1]
  [-1,  1, 'ocean',    null],
  [ 0,  1, 'ocean',    null],
  // Ocean body B (upper-center): [0,-1] adj [1,-1]
  [ 0, -1, 'ocean',    null],
  [ 1, -1, 'ocean',    null],
  // Ocean body C (upper-right flank): [2,-2] adj [3,-2]
  [ 2, -2, 'ocean',    null],
  [ 3, -2, 'ocean',    null],
  // Ocean body D (lower-left flank): [-3,2] adj [-2,2]
  [-3,  2, 'ocean',    null],
  [-2,  2, 'ocean',    null],
  // ── Canal bridge tiles (neighbours to two separate bodies) ──
  [ 0,  0, 'grassland',null],  // Canal Cross: adj to all 4 tiles of A+B → merges into 4-tile sea
  [ 2, -1, 'desert',   null],  // Canal Bent:  adj to body B + body C → extends to 6 tiles
  [-2,  1, 'forest',   null],  // Canal Bent:  adj to body A + body D → extends to 8 tiles
  // ── Inner terrain ───────────────────────────────────────────
  [-2,  0, 'grassland',null],
  [-1, -1, 'ruins',    null],
  [-1,  0, 'desert',   null],
  [-1,  2, 'swamp',    null],
  [ 0, -2, 'mountain', null],
  [ 0,  2, 'forest',   null],
  [ 1,  0, 'grassland',null],
  [ 1,  1, 'swamp',    null],
  [ 1, -2, 'mountain', null],
  [ 2,  0, 'grassland',null],
  // ── Outer terrain ────────────────────────────────────────────
  [-3,  1, 'mountain', null],
  [ 2,  1, 'forest',   null],
  [ 3, -1, 'grassland',null],
  [ 3,  1, 'mountain', null],
]

export type MapId = 'two-kingdoms' | 'mountain-pass' | 'straits' | 'fens'

export const MAP_CONFIGS: Record<MapId, { name: string; description: string; entries: Entry[] }> = {
  'two-kingdoms': {
    name: 'Two Kingdoms',
    description: 'Symmetric 2-player. Balanced terrain, small ocean pockets on each flank.',
    entries: MAP_TWO_KINGDOMS,
  },
  'mountain-pass': {
    name: 'Mountain Pass',
    description: 'A spine of mountains splits the map. Two narrow chokepoints at the equator.',
    entries: MAP_MOUNTAIN_PASS,
  },
  'straits': {
    name: 'The Straits',
    description: '6-tile ocean channel divides two landmasses. Naval Bastion required to project power.',
    entries: MAP_STRAITS,
  },
  'fens': {
    name: 'The Fens',
    description: 'Four isolated ocean pockets. Canal bridges unlock a massive 8-tile sea network.',
    entries: MAP_FENS,
  },
}

export function buildMap(mapId: MapId = 'two-kingdoms'): Record<string, HexRegion> {
  const regions: Record<string, HexRegion> = {}
  for (const [q, r, terrain, owner] of MAP_CONFIGS[mapId].entries) {
    regions[hexKey(q, r)] = { q, r, terrain, owner, militaryMarker: null, productionMarker: null }
  }
  return regions
}

// Keep backward-compatible alias used by existing store import
export function buildInitialMap(): Record<string, HexRegion> {
  return buildMap('two-kingdoms')
}
