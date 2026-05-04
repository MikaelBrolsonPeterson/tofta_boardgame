import type { HexCoord } from '../types/game'

export const HEX_SIZE = 42

export function hexToPixel(q: number, r: number, size = HEX_SIZE) {
  return {
    x: size * Math.sqrt(3) * (q + r / 2),
    y: size * (3 / 2) * r,
  }
}

export function hexCorners(cx: number, cy: number, size = HEX_SIZE): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30)
    return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`
  }).join(' ')
}

export function hexKey(q: number, r: number): string {
  return `${q},${r}`
}

export function keyToHex(key: string): HexCoord {
  const [q, r] = key.split(',').map(Number)
  return { q, r }
}

const DIRS: HexCoord[] = [
  { q: 1, r: 0 }, { q: -1, r: 0 },
  { q: 0, r: 1 }, { q: 0, r: -1 },
  { q: 1, r: -1 }, { q: -1, r: 1 },
]

export function getNeighbors(q: number, r: number): HexCoord[] {
  return DIRS.map(d => ({ q: q + d.q, r: r + d.r }))
}

export function hexDistance(a: HexCoord, b: HexCoord): number {
  return Math.max(
    Math.abs(a.q - b.q),
    Math.abs(a.r - b.r),
    Math.abs((-a.q - a.r) - (-b.q - b.r)),
  )
}

export function isAdjacent(a: HexCoord, b: HexCoord): boolean {
  return hexDistance(a, b) === 1
}

// SVG viewBox: "-280 -255 560 510"
export const SVG_VIEWBOX = '-280 -255 560 510'
