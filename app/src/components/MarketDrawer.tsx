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

interface Props {
  open: boolean
  onClose: () => void
}

export default function MarketDrawer({ open, onClose }: Props) {
  const { marketCards, players, currentPlayerIndex, buyCard, replenishMarket, purchaseVP } = useGameStore()
  const player = players[currentPlayerIndex]
  const actionsLeft = player.marketActionsRemaining
  const emptySlots = marketCards.filter(c => c === null).length
  const replenishCost = 2 + emptySlots
  const canReplenish = actionsLeft > 0 && emptySlots > 0 && player.gold >= replenishCost
  const vpCommodities = COMMODITY_TYPES.filter(c => player.commodities[c] >= 3)
  const empireCardSlots = 3
    + (player.buildingTrack.science >= 1 ? 1 : 0)
    + (player.buildingTrack.science >= 3 ? 1 : 0)
  const slotsFull = player.activeCards.length >= empireCardSlots

  return (
    <div
      className="absolute top-0 right-0 bottom-0 flex flex-col overflow-hidden"
      style={{
        width: 300,
        background: '#08111e',
        borderLeft: '1px solid #1e293b',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 220ms ease',
        zIndex: 20,
      }}
    >
      {/* Drawer header */}
      <div
        className="flex items-center justify-between px-3 flex-shrink-0"
        style={{ height: 44, borderBottom: '1px solid #1e293b', background: '#0b1628' }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200 text-sm tracking-wide">Market</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: Math.min(actionsLeft, 4) }).map((_, i) => (
              <IconMarketAction key={i} size={13} />
            ))}
            <span className="text-xs text-slate-500 ml-0.5">{actionsLeft}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-lg leading-none px-1"
        >
          ✕
        </button>
      </div>

      {/* Slot status */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-3 py-1.5 text-xs"
        style={{ borderBottom: '1px solid #1e293b', background: '#060f1c' }}
      >
        <span className="text-slate-500">Empire card slots</span>
        <span className={slotsFull ? 'text-red-400 font-bold' : 'text-slate-400'}>
          {player.activeCards.length}/{empireCardSlots}{slotsFull ? ' — FULL' : ''}
        </span>
      </div>

      {/* Utility actions */}
      <div className="flex-shrink-0 flex flex-col gap-1.5 px-2.5 py-2" style={{ borderBottom: '1px solid #1e293b' }}>
        {emptySlots > 0 && (
          <button
            onClick={replenishMarket}
            disabled={!canReplenish}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            style={{ background: '#0f1e30', borderColor: '#1e3a5f', color: '#94a3b8' }}
          >
            <IconGold size={12} />
            Replenish {emptySlots} slot{emptySlots !== 1 ? 's' : ''} — {replenishCost}g
          </button>
        )}
        {vpCommodities.length > 0 && (
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: '#150d28', border: '1px solid #3b1f6b' }}>
            <IconVP size={12} />
            <span className="text-xs text-violet-300 font-semibold">3 commodities → 3 VP</span>
            <div className="flex gap-1 ml-auto">
              {vpCommodities.map(c => (
                <button
                  key={c}
                  onClick={() => purchaseVP(c)}
                  disabled={actionsLeft <= 0}
                  className="px-1.5 py-0.5 rounded text-xs font-semibold disabled:opacity-40"
                  style={{ background: '#4c1d95', color: '#e9d5ff' }}
                >
                  {EMOJI[c]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card list — scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="flex flex-col gap-2.5 p-2.5">
          {marketCards.every(c => c === null) && (
            <div className="text-xs text-slate-600 italic text-center py-6">Market is empty</div>
          )}
          {marketCards.map((card, idx) => {
            if (!card) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="flex items-center justify-center py-4 rounded-lg border border-dashed text-xs text-slate-700 italic"
                  style={{ borderColor: '#1e293b' }}
                >
                  Empty slot
                </div>
              )
            }
            const hasAction = actionsLeft > 0
            const slotAvail = card.class === 'action' || !slotsFull
            const goldOk = hasAction && slotAvail && canAffordGold(card, player.gold)
            const altOk = hasAction && slotAvail && canAffordAlt(card, player.resources, player.commodities)
            return (
              <GameCard
                key={card.id}
                card={card}
                compact
                canBuyGold={goldOk}
                canBuyAlt={altOk}
                onBuyGold={() => buyCard(card.id, true)}
                onBuyAlt={() => buyCard(card.id, false)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
