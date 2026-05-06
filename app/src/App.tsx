import { useGameStore } from './store/gameStore'
import HexMap from './components/HexMap'
import PlayerPanel from './components/PlayerPanel'
import InfoPanel from './components/InfoPanel'
import ActionPanel from './components/ActionPanel'
import GameLog from './components/GameLog'
import MarketPanel from './components/MarketPanel'

export default function App() {
  const { players, currentPlayerIndex, round, era, regions } = useGameStore()
  const regionList = Object.values(regions)
  const currentPlayer = players[currentPlayerIndex]

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700 flex-shrink-0">
        <h1 className="text-lg font-bold tracking-widest text-yellow-400">TOFTA</h1>
        <div className="ml-6 flex gap-4 text-sm text-slate-400">
          <span>Round <span className="text-white font-semibold">{round}</span>/12</span>
          <span>Era <span className="text-white font-semibold">{era}</span></span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentPlayer.color }} />
          <span className="text-white font-semibold">{currentPlayer.name}'s turn</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0 gap-0">
        {/* Left panel */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3 p-3 overflow-y-auto">
          {players.map((player, i) => (
            <PlayerPanel
              key={player.id}
              player={player}
              isActive={i === currentPlayerIndex}
              ownedRegions={regionList.filter(r => r.owner === player.id).length}
            />
          ))}
          <InfoPanel />
        </div>

        {/* Map */}
        <div className="flex-1 flex items-center justify-center bg-slate-950 min-w-0 min-h-0">
          <HexMap />
        </div>

        {/* Right panel */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3 p-3 min-h-0">
          <GameLog />
          <MarketPanel />
        </div>
      </div>

      {/* Action bar */}
      <ActionPanel />
    </div>
  )
}
