import { useState } from 'react'
import { useGameStore } from './store/gameStore'
import HexMap from './components/HexMap'
import ActionPanel from './components/ActionPanel'
import MarketDrawer from './components/MarketDrawer'
import PlayerCard from './components/PlayerCard'
import IconLegend from './components/IconLegend'
import LogBar from './components/LogBar'
import VPTrack from './components/VPTrack'
import { MAP_CONFIGS, type MapId } from './data/initialMap'

const MAP_IDS = Object.keys(MAP_CONFIGS) as MapId[]

export default function App() {
  const { players, currentPlayerIndex, round, era, regions, switchMap } = useGameStore()
  const regionList = Object.values(regions)
  const currentPlayer = players[currentPlayerIndex]
  const [marketOpen, setMarketOpen] = useState(false)
  const [activeMap, setActiveMap] = useState<MapId>('two-kingdoms')

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div
        className="flex items-center px-4 gap-4 flex-shrink-0"
        style={{
          height: 44,
          background: 'linear-gradient(to right, #080e18, #0f1e30)',
          borderBottom: '1px solid #1e293b',
        }}
      >
        <h1 className="text-base font-bold tracking-[0.3em] text-amber-400">TOFTA</h1>
        <div className="h-4 w-px bg-slate-700" />
        <span className="text-xs text-slate-400">
          Era <span className="text-white font-semibold">{era}</span>
          <span className="mx-1.5 text-slate-700">·</span>
          Round <span className="text-white font-semibold">{round}</span>
          <span className="text-slate-600">/15</span>
        </span>

        <div className="ml-auto flex items-center gap-3">
          {/* Map selector */}
          <div className="flex items-center gap-1">
            {MAP_IDS.map(id => (
              <button
                key={id}
                onClick={() => { setActiveMap(id); switchMap(id) }}
                title={MAP_CONFIGS[id].description}
                className="px-2 py-0.5 rounded text-xs transition-colors"
                style={{
                  background: activeMap === id ? '#1e3a5f' : 'transparent',
                  color: activeMap === id ? '#93c5fd' : '#475569',
                  border: `1px solid ${activeMap === id ? '#2563eb' : '#1e293b'}`,
                }}
              >
                {MAP_CONFIGS[id].name}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <IconLegend />
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: currentPlayer.color }} />
            <span className="text-xs font-semibold text-white">{currentPlayer.name}'s turn</span>
          </div>
        </div>
      </div>

      {/* ── Map zone + VP track side panel ─────────────────────── */}
      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 relative min-w-0">
          <HexMap />
          <MarketDrawer open={marketOpen} onClose={() => setMarketOpen(false)} />
        </div>
        <VPTrack />
      </div>

      {/* ── Collapsible log bar ──────────────────────────────────── */}
      <LogBar />

      {/* ── Bottom strip: player cards + action panel ───────────── */}
      <div
        className="flex-shrink-0 flex"
        style={{ borderTop: '1px solid #1e293b', background: '#060c18', minHeight: 0 }}
      >
        {/* Active player (left, expanded) + inactive players */}
        <div className="flex items-stretch gap-2 p-2 flex-1 min-w-0 overflow-x-auto">
          {/* Active player always first */}
          <PlayerCard
            player={currentPlayer}
            isActive
            ownedRegions={regionList.filter(r => r.owner === currentPlayer.id).length}
          />
          {/* Inactive players */}
          {players
            .filter((_, i) => i !== currentPlayerIndex)
            .map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                isActive={false}
                ownedRegions={regionList.filter(r => r.owner === player.id).length}
              />
            ))}
        </div>

        {/* Action panel */}
        <div
          className="flex-shrink-0"
          style={{ width: 176, borderLeft: '1px solid #1e293b' }}
        >
          <ActionPanel
            marketOpen={marketOpen}
            onToggleMarket={() => setMarketOpen(o => !o)}
          />
        </div>
      </div>
    </div>
  )
}
