import { hexToPixel, hexCorners } from '../utils/hex'
import { TERRAIN } from '../data/terrainConfig'
import type { HexRegion, PlayerId } from '../types/game'

const PLAYER_COLORS: Record<PlayerId, string> = {
  player1: '#2563EB', // blue
  player2: '#EA580C', // orange
  player3: '#9333EA', // purple
  player4: '#0891B2', // teal
  player5: '#DB2777', // pink
}

// Short terrain labels that fit inside a hex
const TERRAIN_SYMBOL: Record<string, string> = {
  ocean: '~', water: '≈', grassland: '⊹', mountain: '▲',
  swamp: '⊗', desert: '◇', forest: '♣', capitol: '★', ruins: '⌂',
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
  ownerColor?: string
  onClick: () => void
}

export default function HexTile({
  region, selected, isAttackSource, isValidTarget, isAttackMode,
  hasPendingClaim, claimColor, isRearrangeSource, isRearrangeTarget, ownerColor, onClick,
}: Props) {
  const { x, y } = hexToPixel(region.q, region.r)
  const cfg = TERRAIN[region.terrain]
  const points = hexCorners(x, y)

  // Stroke state
  let stroke = '#0d1117'
  let strokeWidth = 1.2
  let opacity = 1

  if (isAttackSource)       { stroke = '#facc15'; strokeWidth = 3 }
  else if (isRearrangeSource) { stroke = '#22d3ee'; strokeWidth = 3 }
  else if (isRearrangeTarget) { stroke = '#22d3ee'; strokeWidth = 2; opacity = 0.85 }
  else if (selected)          { stroke = '#ffffff'; strokeWidth = 2.5 }
  else if (isValidTarget)     { stroke = '#f97316'; strokeWidth = 2.5 }
  else if (isAttackMode && !isValidTarget) { opacity = 0.38 }

  const hasMilitary = !!region.militaryMarker
  const hasProduction = !!region.productionMarker
  const ownerColor = region.owner ? PLAYER_COLORS[region.owner] : null

  // Label: terrain symbol + label on two lines (if room)
  const symbol = TERRAIN_SYMBOL[region.terrain] ?? ''

  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }} opacity={opacity}>
      {/* Base terrain fill using shared gradient */}
      <polygon
        points={points}
        fill={`url(#hx-${region.terrain})`}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* Shine overlay (top brightening) */}
      <polygon points={points} fill="url(#hx-shine)" style={{ pointerEvents: 'none' }} />

      {/* Shadow overlay (bottom darkening) */}
      <polygon points={points} fill="url(#hx-shadow)" style={{ pointerEvents: 'none' }} />

      {/* Owner ring — filled disc with player color */}
      {ownerColor && (
        <circle cx={x} cy={y} r={10} fill={ownerColor} stroke="#0d1117" strokeWidth={1.5} />
      )}

      {/* Military marker badge — top-left */}
      {hasMilitary && (
        <g>
          <circle cx={x - 10} cy={y - 13} r={6} fill="#7f1d1d" stroke="#ef4444" strokeWidth={0.8} />
          <text x={x - 10} y={y - 10} fontSize={7} textAnchor="middle" fill="#fca5a5"
            style={{ pointerEvents: 'none', userSelect: 'none' }}>⚔</text>
        </g>
      )}

      {/* Production marker badge — top-right */}
      {hasProduction && (
        <g>
          <circle cx={x + 10} cy={y - 13} r={6} fill="#14532d" stroke="#22c55e" strokeWidth={0.8} />
          <text x={x + 10} y={y - 10} fontSize={7} textAnchor="middle" fill="#86efac"
            style={{ pointerEvents: 'none', userSelect: 'none' }}>⛏</text>
        </g>
      )}

      {/* Revolt dashed ring — shown when region is in revolt or has a pending claim */}
      {(region.inRevolt || hasPendingClaim) && (
        <polygon
          points={points}
          fill="none"
          stroke={region.inRevolt ? (ownerColor ?? '#f59e0b') : (claimColor ?? '#f59e0b')}
          strokeWidth={2.5}
          strokeDasharray="4 3"
          opacity={0.9}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Valid target pulse ring */}
      {isValidTarget && (
        <polygon
          points={points}
          fill="none"
          stroke="#f97316"
          strokeWidth={1.8}
          opacity={0.5}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Terrain symbol */}
      <text
        x={x}
        y={ownerColor ? y + 20 : y + 3}
        textAnchor="middle"
        fontSize={8}
        fill={cfg.textColor}
        opacity={0.7}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {symbol}
      </text>

      {/* Terrain label */}
      <text
        x={x}
        y={ownerColor ? y + 29 : y + 13}
        textAnchor="middle"
        fontSize={7}
        fill={cfg.textColor}
        opacity={0.65}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {cfg.label}
      </text>
    </g>
  )
}
