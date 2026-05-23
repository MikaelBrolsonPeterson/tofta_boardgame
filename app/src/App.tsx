import { useGameStore } from './store/gameStore'
import HexMap from './components/HexMap'
import ActionPanel from './components/ActionPanel'
import MarketPanel from './components/MarketPanel'
import PlayerCard from './components/PlayerCard'
import IconLegend from './components/IconLegend'
import GameLog from './components/GameLog'

export default function App() {
  const { players, currentPlayerIndex, round, era, regions } = useGameStore()
  const regionList = Object.values(regions)
  const currentPlayer = players[currentPlayerIndex]

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div
        className="flex items-center px-4 gap-4 flex-shrink-0"
        style={{
          height: 44,
          background: 'linear-gradient(to right, #0f172a, #1e293b)',
          borderBottom: '1px solid #334155',
        }}
      >
        <h1 className="text-base font-bold tracking-[0.25em] text-amber-400">TOFTA</h1>
        <div className="h-4 w-px bg-slate-700" />
        <span className="text-xs text-slate-400">
          Era <span className="text-white font-semibold">{era}</span>
          <span className="text-slate-600 mx-1.5">·</span>
          Round <span className="text-white font-semibold">{round}</span>
          <span className="text-slate-600">/15</span>
        </span>

        <div className="ml-auto flex items-center gap-3">
          <IconLegend />
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ background: currentPlayer.color }} />
            <span className="text-white font-semibold text-xs">{currentPlayer.name}'s turn</span>
          </div>
        </div>
      </div>

      {/* ── Main area: map + market sidebar ─────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* Hex map */}
        <div className="flex-1 flex items-center justify-center bg-slate-950 min-w-0 min-h-0">
          <HexMap />
        </div>

        {/* Market sidebar */}
        <div
          className="flex-shrink-0 flex flex-col min-h-0"
          style={{ width: 296, borderLeft: '1px solid #1e293b', background: '#0b1220' }}
        >
          {/* Compact game log at top */}
          <div
            className="flex-shrink-0 overflow-y-auto"
            style={{ maxHeight: 120, borderBottom: '1px solid #1e293b' }}
          >
            <GameLog />
          </div>

          {/* Market cards — scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <MarketPanel />
          </div>
        </div>
      </div>

      {/* ── Bottom: player cards + action bar ───────────────────── */}
      <div
        className="flex-shrink-0 flex items-stretch gap-0"
        style={{ borderTop: '1px solid #1e293b', background: '#080e18', minHeight: 0 }}
      >
        {/* Player cards (horizontal strip) */}
        <div className="flex gap-2 p-2 flex-1 min-w-0 overflow-x-auto">
          {players.map((player, i) => (
            <PlayerCard
              key={player.id}
              player={player}
              isActive={i === currentPlayerIndex}
              ownedRegions={regionList.filter(r => r.owner === player.id).length}
            />
          ))}
        </div>

        {/* Action controls */}
        <div
          className="flex-shrink-0"
          style={{ borderLeft: '1px solid #1e293b', width: 220 }}
        >
          <ActionPanel />
        </div>
      </div>
    </div>
  )
}
