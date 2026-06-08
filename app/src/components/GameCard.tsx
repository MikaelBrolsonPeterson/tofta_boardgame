import type { EmpireCard, CardClass } from '../types/game'
import { IconGold, IconVP } from './GameIcons'
import CardArt from './CardArt'

const EMOJI: Record<string, string> = {
  stone: '🪨', wood: '🪵', food: '🌾',
  iron: '⚙️', paper: '📜', cloth: '🧵', glass: '🫙', wild: '⭐'
}

const CLASS_THEME: Record<CardClass, {
  border: string
  headerBg: string
  bodyBg: string
  badgeBg: string
  textColor: string
}> = {
  military: { border: '#991b1b', headerBg: '#7f1d1d', bodyBg: '#0d0202', badgeBg: '#b91c1c', textColor: '#fca5a5' },
  market:   { border: '#166534', headerBg: '#14532d', bodyBg: '#020d06', badgeBg: '#15803d', textColor: '#86efac' },
  science:  { border: '#5b21b6', headerBg: '#4c1d95', bodyBg: '#050213', badgeBg: '#7c3aed', textColor: '#c4b5fd' },
  wonders:  { border: '#92400e', headerBg: '#78350f', bodyBg: '#0d0702', badgeBg: '#b45309', textColor: '#fcd34d' },
  misc:     { border: '#374151', headerBg: '#1e293b', bodyBg: '#060b12', badgeBg: '#475569', textColor: '#cbd5e1' },
  action:   { border: '#0369a1', headerBg: '#075985', bodyBg: '#020a14', badgeBg: '#0284c7', textColor: '#7dd3fc' },
}

interface GameCardProps {
  card: EmpireCard
  canBuyGold?: boolean
  canBuyAlt?: boolean
  onBuyGold?: () => void
  onBuyAlt?: () => void
  compact?: boolean
}

export default function GameCard({
  card,
  canBuyGold = false,
  canBuyAlt = false,
  onBuyGold,
  onBuyAlt,
  compact = false,
}: GameCardProps) {
  const theme = CLASS_THEME[card.class]
  const showButtons = onBuyGold !== undefined || onBuyAlt !== undefined

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ border: `2px solid ${theme.border}` }}
    >
      {/* Art section — hidden in compact mode */}
      {!compact ? (
        <div className="relative" style={{ height: '7rem' }}>
          <div className="absolute inset-0">
            <CardArt cardClass={card.class} />
          </div>
          <div
            className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-white capitalize"
            style={{ backgroundColor: theme.badgeBg, fontSize: '10px', fontWeight: 600 }}
          >
            {card.class}
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-2 pb-1.5 pt-4"
            style={{ background: `linear-gradient(to bottom, transparent, ${theme.bodyBg})` }}
          >
            <span className="text-white font-bold leading-tight" style={{ fontSize: '13px' }}>
              {card.name}
            </span>
            <span
              className="rounded text-white shrink-0 ml-1 px-1.5 py-0.5"
              style={{ backgroundColor: theme.badgeBg, fontSize: '10px', fontWeight: 600 }}
            >
              Era {card.era}
            </span>
          </div>
        </div>
      ) : (
        /* Compact header strip — replaces art */
        <div
          className="flex items-center justify-between px-2.5 py-2"
          style={{ backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}` }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="rounded-full px-1.5 py-0.5 text-white capitalize"
              style={{ backgroundColor: theme.badgeBg, fontSize: '9px', fontWeight: 700 }}
            >
              {card.class}
            </span>
            <span className="text-white font-bold" style={{ fontSize: '12px' }}>{card.name}</span>
          </div>
          <span className="text-white/60 shrink-0" style={{ fontSize: '10px' }}>Era {card.era}</span>
        </div>
      )}

      {/* Body section */}
      <div
        className="flex flex-col gap-1.5 p-2.5 flex-1"
        style={{ backgroundColor: theme.bodyBg }}
      >
        {/* Cost row */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="flex items-center gap-0.5">
            <IconGold size={13} />
            <span className="text-white font-bold" style={{ fontSize: '12px' }}>
              {card.goldCost}g
            </span>
          </span>
          {card.altCost.length > 0 && (
            <span className="text-slate-400" style={{ fontSize: '11px' }}>
              {' or '}
              {card.altCost.map((item, i) => (
                <span key={i}>
                  {i > 0 && ' + '}
                  {EMOJI[item.type] ?? item.type}×{item.amount}
                </span>
              ))}
            </span>
          )}
        </div>

        {/* Action card badge */}
        {card.class === 'action' && (
          <div className="text-xs font-semibold px-1.5 py-0.5 rounded self-start" style={{ background: '#0284c722', color: '#38bdf8', border: '1px solid #0369a1' }}>
            ⚡ Executes immediately · no slot needed
          </div>
        )}

        {/* Placement row */}
        {card.placement !== '—' && (
          <div className="flex items-start gap-1 text-slate-400" style={{ fontSize: '11px' }}>
            <span className="shrink-0">⬡</span>
            <span>{card.placement}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Effect text */}
        {card.effect !== '—' && (
          <p className="text-xs italic text-slate-200 leading-snug">
            {card.effect}
          </p>
        )}

        {/* VP row */}
        {card.vp > 0 && (
          <div className="flex justify-end items-center gap-0.5">
            <span className="text-violet-400 font-bold text-xs">+{card.vp}</span>
            <IconVP size={13} />
          </div>
        )}

        {/* Buy buttons */}
        {showButtons && (
          <div className="flex gap-1.5 mt-1">
            {onBuyGold !== undefined && (
              <button
                className="flex-1 rounded px-2 py-1 text-yellow-100 text-xs font-semibold disabled:opacity-40 transition-opacity"
                style={{ backgroundColor: '#b45309' }}
                disabled={!canBuyGold}
                onClick={onBuyGold}
              >
                Buy {card.goldCost}g
              </button>
            )}
            {onBuyAlt !== undefined && card.altCost.length > 0 && (
              <button
                className="flex-1 rounded px-2 py-1 text-slate-100 text-xs font-semibold disabled:opacity-40 transition-opacity"
                style={{ backgroundColor: '#475569' }}
                disabled={!canBuyAlt}
                onClick={onBuyAlt}
              >
                Buy (alt)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
