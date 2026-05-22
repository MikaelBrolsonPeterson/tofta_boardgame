import { useState } from 'react'
import {
  ICON_REGISTRY,
  IconMarketAction, IconAttackAction, IconEitherAction,
  IconGold, IconVP, IconAttackStr, IconDefenseStr,
} from './GameIcons'

const SECTIONS = [
  {
    title: 'Actions',
    keys: ['market-action', 'attack-action', 'either-action'],
  },
  {
    title: 'Currency & Points',
    keys: ['gold', 'vp'],
  },
  {
    title: 'Strength',
    keys: ['attack-str', 'defense-str'],
  },
  {
    title: 'Markers & Tokens',
    keys: ['infra-token', 'permanent'],
  },
  {
    title: 'Resources',
    keys: ['stone', 'wood', 'food'],
  },
  {
    title: 'Commodities',
    keys: ['iron', 'paper', 'cloth', 'glass', 'wild'],
  },
]

const ICON_MAP = Object.fromEntries(ICON_REGISTRY.map(e => [e.key, e]))


export default function IconLegend() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex-shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded hover:bg-slate-700"
        title="Icon reference"
      >
        {open ? '✕ Icons' : '⊞ Icons'}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setOpen(false)}>
          <div
            className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-5 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-base tracking-wide">Icon Reference</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-lg leading-none">✕</button>
            </div>

            {SECTIONS.map(section => (
              <div key={section.title} className="mb-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{section.title}</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {section.keys.map(key => {
                    const entry = ICON_MAP[key]
                    if (!entry) return null
                    const Icon = entry.component
                    return (
                      <div key={key} className="flex items-center gap-2 px-2 py-1.5 rounded bg-slate-700/50">
                        <Icon size={22} />
                        <span className="text-xs text-slate-200">{entry.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Notation examples */}
            <div className="mt-4 border-t border-slate-600 pt-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Card Notation</div>
              <div className="flex flex-col gap-1.5">
                <NotationRow icon={<IconAttackAction size={18} />} label="Costs 1 attack action" />
                <NotationRow icon={<IconMarketAction size={18} />} label="Costs 1 market action" />
                <NotationRow icon={<IconEitherAction size={18} />} label="Costs 1 action (either type)" />
                <NotationRow icon={<><IconGold size={18} /><span className="text-amber-300 text-xs font-bold ml-0.5">3</span></>} label="Costs 3 gold" />
                <NotationRow icon={<><span className="text-red-400 text-xs font-bold">+2</span><IconAttackStr size={18} /></>} label="+2 attack strength" />
                <NotationRow icon={<><span className="text-blue-400 text-xs font-bold">+1</span><IconDefenseStr size={18} /></>} label="+1 defense strength" />
                <NotationRow icon={<><span className="text-violet-300 text-xs font-bold">4</span><IconVP size={18} /></>} label="Gain 4 VP" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NotationRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 px-2 py-1 rounded bg-slate-700/40">
      <div className="flex items-center gap-0.5 w-14 justify-center">{icon}</div>
      <span className="text-xs text-slate-300">{label}</span>
    </div>
  )
}
