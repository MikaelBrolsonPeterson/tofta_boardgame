import { useGameStore } from '../store/gameStore'
import { hexKey } from '../utils/hex'
import { TERRAIN } from '../data/terrainConfig'
import { modifierLabel } from '../data/modifierDeck'

export default function InfoPanel() {
  const { regions, selectedHex, lastCombat, players, conquestProgress } = useGameStore()

  if (!selectedHex) {
    return (
      <div className="p-3 rounded-lg border border-slate-600 bg-slate-800 text-slate-400 text-xs">
        Click a region to inspect it.
      </div>
    )
  }

  const region = regions[hexKey(selectedHex.q, selectedHex.r)]
  if (!region) return null
  const cfg = TERRAIN[region.terrain]
  const owner = region.owner ? players.find(p => p.id === region.owner) : null
  const progress = conquestProgress[hexKey(selectedHex.q, selectedHex.r)]

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border border-slate-600 bg-slate-800">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded" style={{ backgroundColor: cfg.color }} />
        <span className="font-bold text-white text-sm">{cfg.label}</span>
        <span className="text-slate-400 text-xs ml-auto">({selectedHex.q}, {selectedHex.r})</span>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <Row label="Owner" value={owner ? <span style={{ color: owner.color }}>{owner.name}</span> : <span className="text-slate-400">Independent</span>} />
        <Row label="Upkeep" value={`${cfg.upkeep}g`} />
        <Row label="Taxation" value={`${cfg.taxation}g`} />
        <Row label="Defense" value={cfg.defenseBonus >= 0 ? `+${cfg.defenseBonus}` : `${cfg.defenseBonus}`} />
        <Row label="To conquer" value={cfg.conquerable ? `${cfg.attacksToConquer} attack${cfg.attacksToConquer > 1 ? 's' : ''}` : 'N/A'} />
        {progress !== undefined && (
          <Row label="Progress" value={`${progress}/${cfg.attacksToConquer}`} />
        )}
      </div>

      {cfg.special && (
        <div className="text-xs text-yellow-400 italic">{cfg.special}</div>
      )}

      {lastCombat && (
        <div className={`mt-1 p-2 rounded text-xs border ${lastCombat.success ? 'border-green-600 bg-green-900/30' : 'border-red-600 bg-red-900/30'}`}>
          <div className="font-semibold text-white mb-1">{lastCombat.success ? '⚔️ Victory' : '💀 Defeat'}</div>
          <div className="text-slate-300">Attacker: {modifierLabel(lastCombat.attackerRoll)} → {lastCombat.attackerTotal}</div>
          <div className="text-slate-300">Defender: {modifierLabel(lastCombat.defenderRoll)} → {lastCombat.defenderTotal}</div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <>
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-200">{value}</span>
    </>
  )
}
