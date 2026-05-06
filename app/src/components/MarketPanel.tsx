import { useGameStore } from '../store/gameStore'
import type { EmpireCard, CardClass, ResourceType, CommodityType } from '../types/game'

const EMOJI: Record<ResourceType | CommodityType, string> = {
  stone: '🪨',
  wood: '🪵',
  food: '🌾',
  iron: '⚙️',
  paper: '📜',
  cloth: '🧵',
  glass: '🫙',
  wild: '⭐',
}

const CLASS_STYLE: Record<CardClass, string> = {
  military: 'bg-red-900 text-red-300 border-red-700',
  market: 'bg-green-900 text-green-300 border-green-700',
  science: 'bg-purple-900 text-purple-300 border-purple-700',
  wonders: 'bg-amber-900 text-amber-300 border-amber-700',
  misc: 'bg-slate-700 text-slate-300 border-slate-600',
}

function altCostLabel(card: EmpireCard): string {
  return card.altCost.map(item => `${EMOJI[item.type]}×${item.amount}`).join(' + ')
}

function canAffordGold(card: EmpireCard, gold: number): boolean {
  return gold >= card.goldCost
}

function canAffordAlt(
  card: EmpireCard,
  resources: { stone: number; wood: number; food: number },
  commodities: { iron: number; paper: number; cloth: number; glass: number; wild: number }
): boolean {
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

interface CardTileProps {
  card: EmpireCard
  canBuyGold: boolean
  canBuyAlt: boolean
  onBuyGold: () => void
  onBuyAlt: () => void
}

function CardTile({ card, canBuyGold, canBuyAlt, onBuyGold, onBuyAlt }: CardTileProps) {
  const classStyle = CLASS_STYLE[card.class]
  const truncEffect = card.effect.length > 70 ? card.effect.slice(0, 67) + '…' : card.effect

  return (
    <div className={`flex flex-col gap-1 p-2 rounded border ${classStyle} text-xs`}>
      <div className="flex items-start justify-between gap-1">
        <span className="font-bold text-white leading-tight">{card.name}</span>
        <span className={`shrink-0 px-1 rounded text-xs font-semibold border ${classStyle}`}>
          Era {card.era}
        </span>
      </div>

      <div className="flex gap-1 flex-wrap">
        <span className={`px-1 rounded border capitalize text-xs ${classStyle}`}>{card.class}</span>
      </div>

      <div className="text-slate-300">
        <span className="font-semibold">{card.goldCost}g</span>
        {card.altCost.length > 0 && (
          <span className="text-slate-400"> OR {altCostLabel(card)}</span>
        )}
      </div>

      {card.placement !== '—' && (
        <div className="text-slate-400 italic">Place: {card.placement}</div>
      )}

      {card.effect !== '—' && (
        <div className="text-slate-300 leading-snug">{truncEffect}</div>
      )}

      {card.vp > 0 && (
        <div className="text-yellow-300 font-semibold">+{card.vp} VP</div>
      )}

      <div className="flex gap-1 mt-1">
        <button
          onClick={onBuyGold}
          disabled={!canBuyGold}
          className="flex-1 px-1 py-0.5 rounded text-xs font-semibold bg-yellow-700 text-yellow-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-600 transition-colors"
        >
          Buy ({card.goldCost}g)
        </button>
        {card.altCost.length > 0 && (
          <button
            onClick={onBuyAlt}
            disabled={!canBuyAlt}
            className="flex-1 px-1 py-0.5 rounded text-xs font-semibold bg-slate-600 text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-500 transition-colors"
          >
            Buy (alt)
          </button>
        )}
      </div>
    </div>
  )
}

export default function MarketPanel() {
  const { marketCards, players, currentPlayerIndex, buyCard } = useGameStore()
  const player = players[currentPlayerIndex]
  const actionsLeft = player.marketActionsRemaining

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border border-slate-600 bg-slate-800 overflow-y-auto flex-1 min-h-0">
      <div className="flex items-center justify-between flex-shrink-0">
        <span className="font-semibold text-slate-300 text-sm">Market</span>
        <span className="text-xs text-slate-400">
          {actionsLeft} action{actionsLeft !== 1 ? 's' : ''} left
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {marketCards.length === 0 && (
          <div className="text-xs text-slate-500 italic">No cards available.</div>
        )}
        {marketCards.map(card => {
          const hasAction = actionsLeft > 0
          const goldOk = hasAction && canAffordGold(card, player.gold)
          const altOk = hasAction && canAffordAlt(card, player.resources, player.commodities)
          return (
            <CardTile
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
