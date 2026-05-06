import type { Player, CardClass } from '../types/game'
import BuildingTrack from './BuildingTrack'

const CLASS_BADGE: Record<CardClass, string> = {
  military: 'bg-red-900 text-red-300',
  market: 'bg-green-900 text-green-300',
  science: 'bg-purple-900 text-purple-300',
  wonders: 'bg-amber-900 text-amber-300',
  misc: 'bg-slate-700 text-slate-300',
}

interface Props {
  player: Player
  isActive: boolean
  ownedRegions: number
}

export default function PlayerPanel({ player, isActive, ownedRegions }: Props) {
  return (
    <div className={`flex flex-col gap-2 p-3 rounded-lg border ${isActive ? 'border-yellow-400 bg-slate-700' : 'border-slate-600 bg-slate-800'}`}>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: player.color }} />
        <span className="font-bold text-sm text-white">{player.name}</span>
        {isActive && <span className="text-xs text-yellow-400 ml-auto">▶ Active</span>}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <Stat label="Gold" value={`${player.gold}g`} highlight />
        <Stat label="Income" value={`${player.incomeRate >= 0 ? '+' : ''}${player.incomeRate}`} highlight={player.incomeRate >= 0} warn={player.incomeRate < 0} />
        <Stat label="Attacks" value={`${player.attackActionsRemaining}/${player.attackActionsPerTurn}`} />
        <Stat label="Market" value={`${player.marketActionsRemaining}/${player.marketActionsPerTurn}`} />
        <Stat label="VP" value={String(player.victoryPoints)} highlight />
      </div>

      <div className="border-t border-slate-600 pt-2 text-xs text-slate-400">
        <div className="font-semibold text-slate-300 mb-1">Resources</div>
        <div className="flex gap-2">
          <span>🪨 {player.resources.stone}</span>
          <span>🪵 {player.resources.wood}</span>
          <span>🌾 {player.resources.food}</span>
        </div>
      </div>

      <div className="text-xs text-slate-400">
        <div className="font-semibold text-slate-300 mb-1">Commodities</div>
        <div className="flex gap-2 flex-wrap">
          <span>⚙️ {player.commodities.iron}</span>
          <span>📜 {player.commodities.paper}</span>
          <span>🧵 {player.commodities.cloth}</span>
          <span>🫙 {player.commodities.glass}</span>
          <span>⭐ {player.commodities.wild}</span>
        </div>
      </div>

      {(player.activeCards.length > 0 || ownedRegions > 0) && (
        <div className="border-t border-slate-600 pt-2 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-300">Buildings</span>
            <span className="text-slate-500">{player.activeCards.length}/{ownedRegions}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {player.activeCards.map(card => (
              <div key={card.id} className="flex items-center gap-1">
                <span className={`px-1 rounded text-xs ${CLASS_BADGE[card.class]}`}>
                  {card.class.slice(0, 3)}
                </span>
                <span className="text-slate-300 truncate">{card.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-slate-600 pt-2 text-xs">
        <div className="font-semibold text-slate-300 mb-1">Building Track</div>
        <BuildingTrack buildingTrack={player.buildingTrack} />
      </div>

      <div className="text-xs text-slate-500">
        Deck: {player.modifierDeck.length} | Discard: {player.modifierDiscard.length}
      </div>
    </div>
  )
}

function Stat({ label, value, highlight, warn }: { label: string; value: string; highlight?: boolean; warn?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className={warn ? 'text-red-400' : highlight ? 'text-white font-semibold' : 'text-slate-300'}>{value}</span>
    </div>
  )
}
