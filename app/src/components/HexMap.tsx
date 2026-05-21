import { useGameStore } from '../store/gameStore'
import HexTile from './HexTile'
import { hexKey, isAdjacent, SVG_VIEWBOX } from '../utils/hex'
import { TERRAIN } from '../data/terrainConfig'

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

  // Rearrange phase: defender can move production markers to any of their other regions
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
            isRearrangeSource={rearrangeSourceKey === key}
            isRearrangeTarget={rearrangeTargets.has(key)}
            onClick={() => selectHex(region.q, region.r)}
          />
        )
      })}
    </svg>
  )
}
