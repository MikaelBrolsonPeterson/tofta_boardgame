import { useGameStore } from '../store/gameStore'
import type { EmpireCard, ResourceType, CommodityType } from '../types/game'
import { IconGold, IconVP, IconMarketAction } from './GameIcons'
import GameCard from './GameCard'

const COMMODITY_TYPES: CommodityType[] = ['iron', 'paper', 'cloth', 'glass', 'wild']

const EMOJI: Record<ResourceType | CommodityType, string> = {
  stone: '🪨', wood: '🪵', food: '🌾',
  iron: '⚙️', paper: '📜', cloth: '🧵', glass: '🫙', wild: '⭐',
}

function canAffordGold(card: EmpireCard, gold: number) {
  return gold >= card.goldCost
}

function canAffordAlt(
  card: EmpireCard,
  resources: { stone: number; wood: number; food: number },
  commodities: { iron: number; paper: number; cloth: number; glass: number; wild: number }
) {
  if (card.altCost.length === 0) return false
  for (const item of card.altCost) {
    const resKeys = ['stone', 'wood', 'food'] as const
    if ((resKeys as readonly string[]).includes(item.type)) {
      if (resources[item.type as ResourceType] < item.amount) return false
    } else {
      if (commodities[item.type as CommodityType] < item.amount) return false
    }
  }
  return true
}

export default function MarketPanel() {
  const { marketCards, players, currentPlayerIndex, buyCard, replenishMarket, purchaseVP } = useGameStore()
  const player = players[currentPlayerIndex]
  const actionsLeft = player.marketActionsRemaining
  const emptySlots = marketCards.filter(c => c === null).length
  const replenishCost = 2 + emptySlots
  const canReplenish = actionsLeft > 0 && emptySlots > 0 && player.gold >= replenishCost
  const vpCommodities = COMMODITY_TYPES.filter(c => player.commodities[c] >= 3)

  return (
    <div className="flex flex-col gap-2 p-2">

      {/* Market header */}
      <div className="flex items-center justify-between px-1 pt-1">
        <span className="font-semibold text-slate-200 text-sm tracking-wide">Market</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(actionsLeft, 5) }).map((_, i) => (
            <IconMarketAction key={i} size={14} />
          ))}
          <span className="text-xs text-slate-500 ml-0.5">{actionsLeft}</span>
        </div>
      </div>

      {/* Replenish */}
      {emptySlots > 0 && (
        <button
          onClick={replenishMarket}
          disabled={!canReplenish}
          className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
        >
          <IconGold size={12} />
          Replenish {emptySlots} slot{emptySlots !== 1 ? 's' : ''} — {replenishCost}g
        </button>
      )}

      {/* VP purchase (card-gated in redesign; kept here for app compatibility) */}
      {vpCommodities.length > 0 && (
        <div className="flex flex-col gap-1 p-2 rounded-lg border border-violet-800 bg-violet-950/40">
          <div className="flex items-center gap-1">
            <IconVP size={13} />
            <span className="text-xs font-semibold text-violet-300">3 commodities → 3 VP</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {vpCommodities.map(c => (
              <button
                key={c}
                onClick={() => purchaseVP(c)}
                disabled={actionsLeft <= 0}
                className="px-2 py-0.5 rounded text-xs font-semibold bg-violet-800 text-violet-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-700"
              >
                {EMOJI[c]}×3
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card list */}
      <div className="flex flex-col gap-3">
        {marketCards.every(c => c === null) && (
          <div className="text-xs text-slate-600 italic text-center py-4">Market is empty</div>
        )}
        {marketCards.map((card, idx) => {
          if (!card) {
            return (
              <div
                key={`empty-${idx}`}
                className="flex items-center justify-center py-6 rounded-xl border border-dashed border-slate-700 text-xs text-slate-700 italic"
              >
                Empty slot
              </div>
            )
          }
          const hasAction = actionsLeft > 0
          const goldOk = hasAction && canAffordGold(card, player.gold)
          const altOk = hasAction && canAffordAlt(card, player.resources, player.commodities)
          return (
            <GameCard
              key={card.id}
              card={card}
              canBuyGold={goldOk}
              canBuyAlt={altOk}
              onBuyGold={() => buyCard(card.id, true)}
              onBuyAlt={() => buyCard(card.id, false)}
            />
          )
        })}
      </div>
    </div>
  )
}
