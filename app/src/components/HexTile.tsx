import { hexToPixel, hexCorners } from '../utils/hex'
import { TERRAIN } from '../data/terrainConfig'
import type { HexRegion, PlayerId } from '../types/game'

const PLAYER_COLORS: Record<PlayerId, string> = {
  player1: '#3b82f6',
  player2: '#ef4444',
  player3: '#22c55e',
  player4: '#f97316',
  player5: '#a855f7',
}

interface Props {
  region: HexRegion
  selected: boolean
  isAttackSource: boolean
  isValidTarget: boolean
  isAttackMode: boolean
  hasPendingClaim: boolean
  claimColor?: string
  isRearrangeSource: boolean
  isRearrangeTarget: boolean
  onClick: () => void
}

export default function HexTile({ region, selected, isAttackSource, isValidTarget, isAttackMode, hasPendingClaim, claimColor, isRearrangeSource, isRearrangeTarget, onClick }: Props) {
  const { x, y } = hexToPixel(region.q, region.r)
  const cfg = TERRAIN[region.terrain]
  const points = hexCorners(x, y)

  let stroke = '#1a1a2e'
  let strokeWidth = 1
  let opacity = 1

  if (isAttackSource) { stroke = '#facc15'; strokeWidth = 3 }
  else if (isRearrangeSource) { stroke = '#22d3ee'; strokeWidth = 3 }
  else if (isRearrangeTarget) { stroke = '#22d3ee'; strokeWidth = 2; opacity = 0.8 }
  else if (selected) { stroke = '#ffffff'; strokeWidth = 2.5 }
  else if (isValidTarget) { stroke = '#f97316'; strokeWidth = 2.5 }
  else if (isAttackMode && !isValidTarget) { opacity = 0.45 }

  const hasOwner = !!region.owner
  const hasMilitary = !!region.militaryMarker
  const hasProduction = !!region.productionMarker
  const labelY = hasOwner ? y + 20 : y + 6

  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }} opacity={opacity}>
      <polygon
        points={points}
        fill={cfg.color}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Owner meeple dot */}
      {region.owner && (
        <circle
          cx={x}
          cy={y}
          r={10}
          fill={PLAYER_COLORS[region.owner]}
          stroke="#1a1a2e"
          strokeWidth={1}
        />
      )}
      {/* Military marker indicator */}
      {hasMilitary && (
        <text x={x - 8} y={y - 12} fontSize={10} textAnchor="middle" style={{ pointerEvents: 'none', userSelect: 'none' }}>⚔</text>
      )}
      {/* Production marker indicator */}
      {hasProduction && (
        <text x={x + 8} y={y - 12} fontSize={10} textAnchor="middle" style={{ pointerEvents: 'none', userSelect: 'none' }}>🏭</text>
      )}
      {/* Revolt: pending claim ring */}
      {hasPendingClaim && (
        <polygon
          points={points}
          fill="none"
          stroke={claimColor ?? '#f59e0b'}
          strokeWidth={2.5}
          strokeDasharray="4 3"
          opacity={0.85}
        />
      )}
      {/* Valid attack target pulse ring */}
      {isValidTarget && (
        <polygon
          points={points}
          fill="none"
          stroke="#f97316"
          strokeWidth={2}
          opacity={0.6}
        />
      )}
      {/* Terrain label */}
      <text
        x={x}
        y={labelY}
        textAnchor="middle"
        fontSize={9}
        fill={cfg.textColor}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {cfg.label}
      </text>
    </g>
  )
}
