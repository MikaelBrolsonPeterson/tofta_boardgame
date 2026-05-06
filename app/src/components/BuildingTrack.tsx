import type { CardClass } from '../types/game'
import { CLASS_LIMIT, TRACK_BENEFITS, type TrackBenefit } from '../data/buildingTrack'

const CLASS_LABEL: Record<CardClass, string> = {
  military: 'Mil',
  market: 'Mkt',
  science: 'Sci',
  misc: 'Misc',
  wonders: 'Wnd',
}

const CLASS_DOT_COLOR: Record<CardClass, string> = {
  military: 'bg-red-500',
  market: 'bg-green-500',
  science: 'bg-purple-500',
  misc: 'bg-slate-400',
  wonders: 'bg-amber-500',
}

function benefitLabel(b: TrackBenefit): string {
  if (b.type === 'gold') return `+${b.amount}g`
  if (b.type === 'attackAction') return `+${b.amount}atk`
  if (b.type === 'marketAction') return `+${b.amount}mkt`
  if (b.type === 'vp') return `+${b.amount}VP`
  return ''
}

interface Props {
  buildingTrack: Record<CardClass, number>
}

const ALL_CLASSES: CardClass[] = ['military', 'market', 'science', 'misc', 'wonders']

export default function BuildingTrack({ buildingTrack }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {ALL_CLASSES.map(cls => {
        const count = buildingTrack[cls]
        const limit = CLASS_LIMIT[cls]
        const benefits = TRACK_BENEFITS[cls]
        const nextBenefit = count < limit ? benefits[count] : null
        const dotColor = CLASS_DOT_COLOR[cls]

        return (
          <div key={cls} className="flex items-center gap-1">
            <span className="w-7 text-xs text-slate-400 shrink-0">{CLASS_LABEL[cls]}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: limit }).map((_, i) => (
                <div
                  key={i}
                  title={benefits[i] ? benefitLabel(benefits[i]) : ''}
                  className={`w-3 h-3 rounded-sm border ${
                    i < count
                      ? `${dotColor} border-transparent`
                      : 'bg-slate-700 border-slate-600'
                  }`}
                />
              ))}
            </div>
            {nextBenefit && (
              <span className="text-xs text-slate-500 ml-1">
                → {benefitLabel(nextBenefit)}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
