import type { Player, CardClass } from '../types/game'
import { useGameStore } from '../store/gameStore'
import { IconGold, IconVP, IconAttackAction, IconMarketAction } from './GameIcons'

const CLASS_COLOR: Record<CardClass, string> = {
  military: '#991b1b',
  market:   '#166534',
  science:  '#5b21b6',
  wonders:  '#92400e',
  misc:     '#374151',
  action:   '#0369a1',
}
const CLASS_LABEL: Record<CardClass, string> = {
  military: 'M', market: 'K', science: 'S', wonders: 'W', misc: 'C', action: 'A',
}
const CLASS_MAX: Record<CardClass, number> = {
  military: 4, market: 4, science: 4, wonders: 3, misc: 4, action: 0,
}

const TRACK_CLASSES: CardClass[] = ['military', 'market', 'science', 'wonders', 'misc']

function ActionPips({ remaining, total, color }: { remaining: number; total: number; color: string }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < remaining ? color : '#334155' }} />
      ))}
    </div>
  )
}

/** Compact dot-cluster building tracks — one row, excludes action class */
function MiniTracks({ track }: { track: Record<CardClass, number> }) {
  return (
    <div className="flex gap-2">
      {TRACK_CLASSES.map(cls => (
        <div key={cls} className="flex items-center gap-0.5">
          <span className="text-slate-600" style={{ fontSize: 8 }}>{CLASS_LABEL[cls]}</span>
          <div className="flex gap-px">
            {Array.from({ length: CLASS_MAX[cls] }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-sm"
                style={{ background: i < track[cls] ? CLASS_COLOR[cls] : '#1e293b' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface Props {
  player: Player
  isActive: boolean
  ownedRegions: number
}

/** Condensed card for inactive players */
function InactivePlayerCard({ player, ownedRegions }: { player: Player; ownedRegions: number }) {
  return (
    <div
      className="flex flex-col gap-1.5 p-2 rounded-xl flex-shrink-0"
      style={{
        minWidth: 148,
        background: '#0b1220',
        border: '1px solid #1e293b',
      }}
    >
      {/* Name */}
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: player.color }} />
        <span className="text-xs font-semibold text-slate-300 truncate">{player.name}</span>
      </div>

      {/* Gold + VP */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <IconGold size={12} />
          <span className="text-xs font-bold text-amber-300">{player.gold}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconVP size={12} />
          <span className="text-xs font-bold text-violet-300">{player.victoryPoints}</span>
        </div>
      </div>

      {/* Action pips */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <IconAttackAction size={11} />
          <ActionPips remaining={player.attackActionsRemaining} total={player.attackActionsPerTurn} color="#ef4444" />
        </div>
        <div className="flex items-center gap-1">
          <IconMarketAction size={11} />
          <ActionPips remaining={player.marketActionsRemaining} total={player.marketActionsPerTurn} color="#22c55e" />
        </div>
      </div>

      {/* Regions + mini tracks */}
      <div className="text-xs text-slate-600">{ownedRegions} region{ownedRegions !== 1 ? 's' : ''}</div>
      <MiniTracks track={player.buildingTrack} />
    </div>
  )
}

/** Expanded card for the active player */
function ActivePlayerCard({ player, ownedRegions }: { player: Player; ownedRegions: number }) {
  const { discardCard } = useGameStore()
  const hasAnyCommodity = Object.values(player.commodities).some(v => v > 0)
  const empireCardSlots = 3
    + (player.buildingTrack.science >= 1 ? 1 : 0)
    + (player.buildingTrack.science >= 3 ? 1 : 0)
  const slotsFull = player.activeCards.length >= empireCardSlots

  return (
    <div
      className="flex flex-col gap-1.5 p-2.5 rounded-xl flex-shrink-0"
      style={{
        minWidth: 280,
        background: '#111827',
        border: `2px solid ${player.color}`,
        boxShadow: `0 0 16px ${player.color}30`,
      }}
    >
      {/* Name + active badge */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: player.color }} />
        <span className="font-bold text-sm text-white flex-1 truncate">{player.name}</span>
        <span
          className="text-xs font-bold px-1.5 py-0.5 rounded"
          style={{ background: player.color + '33', color: player.color }}
        >
          ACTIVE
        </span>
      </div>

      {/* Gold + VP + income */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <IconGold size={14} />
          <span className="text-xs font-bold text-amber-300">{player.gold}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconVP size={14} />
          <span className="text-xs font-bold text-violet-300">{player.victoryPoints}</span>
        </div>
        <span className={`text-xs font-semibold ml-auto ${player.goldProduction >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {player.goldProduction >= 0 ? '+' : ''}{player.goldProduction}<span className="text-slate-600 font-normal">/rd</span>
        </span>
      </div>

      {/* Action pips */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <IconAttackAction size={13} />
          <ActionPips remaining={player.attackActionsRemaining} total={player.attackActionsPerTurn} color="#ef4444" />
          <span className="text-xs text-slate-500">{player.attackActionsRemaining}/{player.attackActionsPerTurn}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <IconMarketAction size={13} />
          <ActionPips remaining={player.marketActionsRemaining} total={player.marketActionsPerTurn} color="#22c55e" />
          <span className="text-xs text-slate-500">{player.marketActionsRemaining}/{player.marketActionsPerTurn}</span>
        </div>
      </div>

      {/* Resources + commodities */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs flex items-center gap-0.5"><span>🪨</span><span className="font-semibold text-slate-200">{player.resources.stone}</span></span>
        <span className="text-xs flex items-center gap-0.5"><span>🪵</span><span className="font-semibold text-slate-200">{player.resources.wood}</span></span>
        <span className="text-xs flex items-center gap-0.5"><span>🌾</span><span className="font-semibold text-slate-200">{player.resources.food}</span></span>
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

      {/* Condensed building tracks — single row */}
      <MiniTracks track={player.buildingTrack} />

      {/* Active empire cards */}
      {player.activeCards.length > 0 && (
        <div className="border-t border-slate-700 pt-1.5 flex flex-col gap-0.5">
          {player.activeCards.map(card => (
            <div key={card.id} className="flex items-center gap-1.5 rounded px-1 py-0.5" style={{ background: '#0b1525' }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: CLASS_COLOR[card.class] }} />
              <span className="text-xs text-slate-300 flex-1 truncate">{card.name}</span>
              <span className="text-slate-600" style={{ fontSize: 10 }}>E{card.era}</span>
              <button
                onClick={() => discardCard(card.id)}
                disabled={player.marketActionsRemaining <= 0}
                className="text-slate-600 hover:text-red-400 disabled:opacity-30 leading-none px-0.5"
                style={{ fontSize: 11 }}
                title="Discard (costs 1 market action)"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer: slots + regions */}
      <div className="text-xs border-t border-slate-700 pt-1 flex items-center justify-between">
        <span className={slotsFull ? 'text-red-500 font-semibold' : 'text-slate-600'}>
          {player.activeCards.length}/{empireCardSlots} slots{slotsFull ? ' · FULL' : ''}
        </span>
        <span className="text-slate-600">{ownedRegions} region{ownedRegions !== 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}

export default function PlayerCard({ player, isActive, ownedRegions }: Props) {
  return isActive
    ? <ActivePlayerCard player={player} ownedRegions={ownedRegions} />
    : <InactivePlayerCard player={player} ownedRegions={ownedRegions} />
}
