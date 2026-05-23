import type { Player, CardClass } from '../types/game'
import { IconGold, IconVP, IconAttackAction, IconMarketAction } from './GameIcons'

const CLASS_COLOR: Record<CardClass, string> = {
  military: '#991b1b',
  market:   '#166534',
  science:  '#5b21b6',
  wonders:  '#92400e',
  misc:     '#374151',
}

const CLASS_LABEL: Record<CardClass, string> = {
  military: 'Mil', market: 'Mkt', science: 'Sci', wonders: 'Wnd', misc: 'Msc',
}

function ActionPips({ remaining, total, color }: { remaining: number; total: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i < remaining ? color : '#334155' }}
        />
      ))}
    </div>
  )
}

function TrackBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="flex gap-px">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-3 rounded-sm"
          style={{ background: i < value ? color : '#1e293b' }}
        />
      ))}
    </div>
  )
}

interface Props {
  player: Player
  isActive: boolean
  ownedRegions: number
}

export default function PlayerCard({ player, isActive, ownedRegions }: Props) {
  const hasAnyCommodity = Object.values(player.commodities).some(v => v > 0)

  return (
    <div
      className="flex flex-col gap-1.5 p-2.5 rounded-xl min-w-[200px] flex-1 transition-all"
      style={{
        background: isActive ? '#1e293b' : '#0f172a',
        border: `2px solid ${isActive ? player.color : '#1e293b'}`,
        boxShadow: isActive ? `0 0 12px ${player.color}40` : 'none',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: player.color }} />
        <span className="font-bold text-sm text-white truncate flex-1">{player.name}</span>
        {isActive && (
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ background: player.color + '33', color: player.color }}>
            ACTIVE
          </span>
        )}
      </div>

      {/* Gold + VP + Income */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <IconGold size={14} />
          <span className="text-xs font-bold text-amber-300">{player.gold}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconVP size={14} />
          <span className="text-xs font-bold text-violet-300">{player.victoryPoints}</span>
        </div>
        <div className="ml-auto text-xs text-slate-400">
          <span className={player.incomeRate >= 0 ? 'text-green-400' : 'text-red-400'}>
            {player.incomeRate >= 0 ? '+' : ''}{player.incomeRate}
          </span>
          <span className="text-slate-600">/rd</span>
        </div>
      </div>

      {/* Action pips */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <IconAttackAction size={13} />
          <ActionPips
            remaining={player.attackActionsRemaining}
            total={player.attackActionsPerTurn}
            color="#ef4444"
          />
          <span className="text-xs text-slate-500">{player.attackActionsRemaining}/{player.attackActionsPerTurn}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <IconMarketAction size={13} />
          <ActionPips
            remaining={player.marketActionsRemaining}
            total={player.marketActionsPerTurn}
            color="#22c55e"
          />
          <span className="text-xs text-slate-500">{player.marketActionsRemaining}/{player.marketActionsPerTurn}</span>
        </div>
      </div>

      {/* Resources */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span>🪨</span><span className="font-semibold text-slate-200">{player.resources.stone}</span>
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span>🪵</span><span className="font-semibold text-slate-200">{player.resources.wood}</span>
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <span>🌾</span><span className="font-semibold text-slate-200">{player.resources.food}</span>
        </span>
        {hasAnyCommodity && (
          <>
            <span className="text-slate-600 text-xs">│</span>
            {player.commodities.iron > 0 && <span className="text-xs flex items-center gap-0.5"><span>⚙️</span><span className="font-semibold text-slate-200">{player.commodities.iron}</span></span>}
            {player.commodities.paper > 0 && <span className="text-xs flex items-center gap-0.5"><span>📜</span><span className="font-semibold text-slate-200">{player.commodities.paper}</span></span>}
            {player.commodities.cloth > 0 && <span className="text-xs flex items-center gap-0.5"><span>🧵</span><span className="font-semibold text-slate-200">{player.commodities.cloth}</span></span>}
            {player.commodities.glass > 0 && <span className="text-xs flex items-center gap-0.5"><span>🫙</span><span className="font-semibold text-slate-200">{player.commodities.glass}</span></span>}
            {player.commodities.wild > 0 && <span className="text-xs flex items-center gap-0.5"><span>⭐</span><span className="font-semibold text-slate-200">{player.commodities.wild}</span></span>}
          </>
        )}
      </div>

      {/* Building tracks */}
      <div className="flex flex-col gap-0.5">
        {(Object.entries(player.buildingTrack) as [CardClass, number][]).map(([cls, val]) => (
          <div key={cls} className="flex items-center gap-1.5">
            <span
              className="text-xs w-6 flex-shrink-0 font-semibold"
              style={{ color: CLASS_COLOR[cls] }}
            >
              {CLASS_LABEL[cls]}
            </span>
            <TrackBar value={val} max={cls === 'wonders' ? 3 : 4} color={CLASS_COLOR[cls]} />
            <span className="text-xs text-slate-600">{val}</span>
          </div>
        ))}
      </div>

      {/* Active cards count */}
      {player.activeCards.length > 0 && (
        <div className="text-xs text-slate-500 border-t border-slate-700 pt-1">
          {player.activeCards.length} card{player.activeCards.length !== 1 ? 's' : ''} active · {ownedRegions} region{ownedRegions !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
