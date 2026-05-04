import { useGameStore } from '../store/gameStore'
import { hexKey } from '../utils/hex'

export default function ActionPanel() {
  const { players, currentPlayerIndex, phase, selectedHex, regions, initiateAttack, cancelAttack, abandonSelected, endTurn } = useGameStore()
  const player = players[currentPlayerIndex]
  const selectedRegion = selectedHex ? regions[hexKey(selectedHex.q, selectedHex.r)] : null
  const ownSelected = selectedRegion?.owner === player.id

  if (phase === 'select-attack-target') {
    return (
      <div className="flex items-center gap-3 p-3 bg-slate-800 border-t border-slate-600">
        <span className="text-yellow-400 text-sm font-semibold flex-1">
          ⚔️ Select a target to attack — orange hexes are valid targets
        </span>
        <button onClick={cancelAttack} className="px-4 py-2 rounded bg-slate-600 hover:bg-slate-500 text-white text-sm">
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-800 border-t border-slate-600">
      <div className="text-sm text-slate-400 flex-1">
        {selectedRegion
          ? ownSelected
            ? `Selected: your ${selectedRegion.terrain} — use actions below`
            : `Selected: ${selectedRegion.owner ? 'enemy' : 'independent'} ${selectedRegion.terrain}`
          : 'Select one of your regions to take action'}
      </div>

      <button
        onClick={initiateAttack}
        disabled={!ownSelected || player.attackActionsRemaining <= 0}
        className="px-4 py-2 rounded text-sm font-semibold bg-red-700 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed text-white"
      >
        ⚔️ Attack ({player.attackActionsRemaining})
      </button>

      <button
        onClick={abandonSelected}
        disabled={!ownSelected || selectedRegion?.terrain === 'capitol'}
        className="px-4 py-2 rounded text-sm bg-slate-600 hover:bg-slate-500 disabled:opacity-30 disabled:cursor-not-allowed text-white"
      >
        🏳 Abandon
      </button>

      <button
        onClick={endTurn}
        className="px-4 py-2 rounded text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white"
      >
        End Turn →
      </button>
    </div>
  )
}
