import { useGameStore } from '../store/gameStore'
import { hexKey } from '../utils/hex'
import { IconAttackAction } from './GameIcons'

export default function ActionPanel() {
  const {
    players, currentPlayerIndex, phase, selectedHex, regions,
    initiateAttack, cancelAttack, abandonSelected, endTurn,
    pendingConquest, rearrangeSourceKey, confirmRearrange,
  } = useGameStore()
  const player = players[currentPlayerIndex]
  const selectedRegion = selectedHex ? regions[hexKey(selectedHex.q, selectedHex.r)] : null
  const ownSelected = selectedRegion?.owner === player.id

  if (phase === 'select-attack-target') {
    return (
      <div className="flex flex-col gap-2 p-3 h-full justify-center" style={{ background: '#1a0e02' }}>
        <span className="text-yellow-300 text-xs font-semibold text-center leading-snug">
          ⚔ Select a target<br />
          <span className="text-yellow-500 font-normal">orange hexes are valid</span>
        </span>
        <button
          onClick={cancelAttack}
          className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  if (phase === 'defender-rearrange' && pendingConquest) {
    const defender = players.find(p => p.id === pendingConquest.defenderPlayerId)
    const instruction = rearrangeSourceKey
      ? 'Click a destination to move, or source again to deselect.'
      : 'Click a production marker to move it.'
    return (
      <div className="flex flex-col gap-2 p-3 h-full justify-center" style={{ background: '#051a1a' }}>
        <span className="text-cyan-300 text-xs font-semibold text-center">{defender?.name ?? 'Defender'}</span>
        <span className="text-cyan-400 text-xs text-center leading-snug">{instruction}</span>
        <button
          onClick={confirmRearrange}
          className="px-3 py-2 rounded-lg text-xs font-semibold bg-cyan-700 hover:bg-cyan-600 text-white transition-colors"
        >
          Confirm
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 p-3 h-full justify-between">
      {/* Context info */}
      <div className="text-xs text-slate-400 leading-snug min-h-[2rem]">
        {selectedRegion
          ? ownSelected
            ? `Your ${selectedRegion.terrain} — take action`
            : `${selectedRegion.owner ? 'Enemy' : 'Independent'} ${selectedRegion.terrain}`
          : 'Select a region on the map'}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-1.5">
        <button
          onClick={initiateAttack}
          disabled={!ownSelected || player.attackActionsRemaining <= 0}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-red-800 hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
        >
          <IconAttackAction size={14} />
          Attack ({player.attackActionsRemaining})
        </button>

        <button
          onClick={abandonSelected}
          disabled={!ownSelected || selectedRegion?.terrain === 'capitol'}
          className="px-3 py-2 rounded-lg text-xs bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
        >
          🏳 Abandon
        </button>

        <button
          onClick={endTurn}
          className="px-3 py-2 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-600 text-white transition-colors"
        >
          End Turn →
        </button>
      </div>
    </div>
  )
}
