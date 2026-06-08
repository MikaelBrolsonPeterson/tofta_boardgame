import { useGameStore } from '../store/gameStore'
import HexTile from './HexTile'
import { hexKey, isAdjacent, SVG_VIEWBOX } from '../utils/hex'
import { TERRAIN } from '../data/terrainConfig'
import type { TerrainType } from '../types/game'

// Terrain gradient IDs are stable across the lifetime of this SVG.
const TERRAIN_TYPES: TerrainType[] = ['ocean','water','grassland','mountain','swamp','desert','forest','capitol','ruins']

export default function HexMap() {
  const { regions, players, currentPlayerIndex, phase, selectedHex, attackSourceHex, selectHex, pendingClaims, pendingConquest, rearrangeSourceKey } = useGameStore()
  const currentPlayer = players[currentPlayerIndex]

  const validTargets = new Set<string>()
  if (phase === 'select-attack-target' && attackSourceHex) {
    Object.values(regions).forEach(r => {
      if (r.owner === currentPlayer.id) return
      if (!isAdjacent(attackSourceHex, r)) return
      if (!TERRAIN[r.terrain].conquerable) return
      validTargets.add(hexKey(r.q, r.r))
    })
  }

  const rearrangeTargets = new Set<string>()
  if (phase === 'defender-rearrange' && rearrangeSourceKey && pendingConquest) {
    Object.values(regions).forEach(r => {
      const k = hexKey(r.q, r.r)
      if (r.owner === pendingConquest.defenderPlayerId && !r.productionMarker && k !== rearrangeSourceKey) {
        rearrangeTargets.add(k)
      }
    })
  }

  return (
    <svg
      viewBox={SVG_VIEWBOX}
      className="w-full h-full"
      style={{ maxHeight: '100%' }}
    >
      <defs>
        {/* One linear gradient per terrain type — shared by all hexes of that type */}
        {TERRAIN_TYPES.map(t => (
          <linearGradient key={t} id={`hx-${t}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={TERRAIN[t].highlight} />
            <stop offset="100%" stopColor={TERRAIN[t].color} />
          </linearGradient>
        ))}
        {/* Inner hex highlight overlay — subtle top-edge brightening */}
        <linearGradient id="hx-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="40%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Edge shadow overlay */}
        <linearGradient id="hx-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {Object.values(regions).map(region => {
        const key = hexKey(region.q, region.r)
        return (
          <HexTile
            key={key}
            region={region}
            selected={selectedHex?.q === region.q && selectedHex?.r === region.r}
            isAttackSource={attackSourceHex?.q === region.q && attackSourceHex?.r === region.r}
            isValidTarget={validTargets.has(key)}
            isAttackMode={phase === 'select-attack-target'}
            hasPendingClaim={key in pendingClaims}
            claimColor={pendingClaims[key] ? players.find(p => p.id === pendingClaims[key])?.color : undefined}
            ownerColor={region.owner ? players.find(p => p.id === region.owner)?.color : undefined}
            isRearrangeSource={rearrangeSourceKey === key}
            isRearrangeTarget={rearrangeTargets.has(key)}
            onClick={() => selectHex(region.q, region.r)}
          />
        )
      })}
    </svg>
  )
}
