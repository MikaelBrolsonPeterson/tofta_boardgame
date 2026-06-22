import { useGameStore } from '../store/gameStore'
import { hexKey } from '../utils/hex'
import { IconAttackAction, IconMarketAction } from './GameIcons'

interface Props {
  marketOpen: boolean
  onToggleMarket: () => void
}

export default function ActionPanel({ marketOpen, onToggleMarket }: Props) {
  const {
    players, currentPlayerIndex, phase, selectedHex, regions,
    initiateAttack, cancelAttack, abandonSelected, endTurn,
    pendingConquest, rearrangeSourceKey, confirmRearrange,
    pendingPlacement, cancelPlacement,
    pendingTrackChoice, selectTrackBenefit,
  } = useGameStore()
  const player = players[currentPlayerIndex]
  const selectedRegion = selectedHex ? regions[hexKey(selectedHex.q, selectedHex.r)] : null
  const ownSelected = selectedRegion?.owner === player.id

  if (phase === 'select-attack-target') {
    return (
      <div className="flex flex-col gap-2 p-3 h-full justify-center">
        <span className="text-yellow-300 text-xs font-semibold text-center leading-snug">
          ⚔ Select a target<br />
          <span className="text-yellow-600 font-normal">orange hexes are valid</span>
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

  if (phase === 'select-track-benefit' && pendingTrackChoice) {
    return (
      <div className="flex flex-col gap-2 p-3 h-full justify-center">
        <span className="text-amber-300 text-xs font-semibold text-center leading-snug">
          Choose track benefit
        </span>
        {pendingTrackChoice.options.map((opt, i) => {
          const label =
            opt.type === 'production' ? opt.label :
            opt.type === 'gold' ? `+${opt.amount} gold` :
            opt.type === 'attackAction' ? `+${opt.amount} attack action` :
            opt.type === 'marketAction' ? `+${opt.amount} market action` :
            opt.type === 'cardSlot' ? `+${opt.amount} card slot` :
            opt.type === 'tokenDiscount' ? `-${opt.amount} token cost` :
            opt.type === 'vp' ? `+${opt.amount} VP` : opt.type
          return (
            <button
              key={i}
              onClick={() => selectTrackBenefit(i)}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-amber-800 hover:bg-amber-700 text-amber-100 transition-colors"
            >
              {label}
            </button>
          )
        })}
      </div>
    )
  }

  if (phase === 'place-production-marker' && pendingPlacement) {
    return (
      <div className="flex flex-col gap-2 p-3 h-full justify-center">
        <span className="text-emerald-300 text-xs font-semibold text-center leading-snug">
          ⛏ Place {pendingPlacement.cardName}<br />
          <span className="text-emerald-600 font-normal">
            {pendingPlacement.validTerrains.join(' / ')}
          </span>
        </span>
        <button
          onClick={cancelPlacement}
          className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  if (phase === 'defender-rearrange' && pendingConquest) {
    const defender = players.find(p => p.id === pendingConquest.defenderPlayerId)
    return (
      <div className="flex flex-col gap-2 p-3 h-full justify-center" style={{ background: '#051a1a' }}>
        <span className="text-cyan-300 text-xs font-semibold text-center">{defender?.name ?? 'Defender'}</span>
        <span className="text-cyan-500 text-xs text-center leading-snug">
          {rearrangeSourceKey ? 'Click destination or source to deselect.' : 'Click a production marker to move.'}
        </span>
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
    <div className="flex flex-col gap-1.5 p-3 h-full justify-between">
      {/* Context */}
      <div className="text-xs text-slate-500 leading-snug min-h-[2rem]">
        {selectedRegion
          ? ownSelected
            ? `Your ${selectedRegion.terrain} selected`
            : `${selectedRegion.owner ? 'Enemy' : 'Independent'} ${selectedRegion.terrain}`
          : 'Select a region'}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-1.5">
        {/* Market toggle — primary action */}
        <button
          onClick={onToggleMarket}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
          style={{
            background: marketOpen ? '#064e3b' : '#14532d',
            border: `1px solid ${marketOpen ? '#059669' : '#166534'}`,
            color: '#86efac',
          }}
        >
          <IconMarketAction size={14} />
          {marketOpen ? 'Close Market' : `Market (${player.marketActionsRemaining})`}
        </button>

        <div className="border-t border-slate-800 my-0.5" />

        <button
          onClick={initiateAttack}
          disabled={!ownSelected || player.attackActionsRemaining <= 0}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-red-900 hover:bg-red-800 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          style={{ border: '1px solid #7f1d1d' }}
        >
          <IconAttackAction size={14} />
          Attack ({player.attackActionsRemaining})
        </button>

        <button
          onClick={abandonSelected}
          disabled={!ownSelected || selectedRegion?.terrain === 'capitol'}
          className="px-3 py-2 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors"
          style={{ border: '1px solid #334155' }}
        >
          🏳 Abandon
        </button>

        <button
          onClick={endTurn}
          className="px-3 py-2 rounded-lg text-xs font-bold bg-blue-800 hover:bg-blue-700 text-white transition-colors"
          style={{ border: '1px solid #1d4ed8' }}
        >
          End Turn →
        </button>
      </div>
    </div>
  )
}
