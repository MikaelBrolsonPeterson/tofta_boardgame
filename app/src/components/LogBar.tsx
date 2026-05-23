import { useState, useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'

function entryClass(entry: string) {
  if (entry.startsWith('══')) return 'text-yellow-400 font-semibold'
  if (entry.startsWith('──')) return 'text-blue-400'
  if (entry.includes('succeeded') || entry.includes('purchased')) return 'text-green-400'
  if (entry.includes('failed') || entry.includes('revolt')) return 'text-red-400'
  if (entry.includes('abandoned')) return 'text-orange-400'
  return 'text-slate-300'
}

export default function LogBar() {
  const log = useGameStore(s => s.log)
  const [open, setOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log, open])

  const lastEntry = log[log.length - 1] ?? 'No events yet'

  return (
    <div
      className="flex-shrink-0"
      style={{ borderTop: '1px solid #1e293b', background: '#080e18' }}
    >
      {/* Collapsed bar — always visible */}
      <div
        className="flex items-center gap-2 px-3 cursor-pointer select-none"
        style={{ height: 30 }}
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-slate-600 text-xs" style={{ width: 12 }}>{open ? '▼' : '▶'}</span>
        <span className="text-xs text-slate-500 font-semibold mr-1 flex-shrink-0">Log</span>
        <span className="text-xs text-slate-400 truncate flex-1">{lastEntry}</span>
      </div>

      {/* Expanded log */}
      {open && (
        <div
          className="overflow-y-auto flex flex-col gap-0.5 px-3 pb-2"
          style={{ maxHeight: 160, borderTop: '1px solid #1e293b' }}
        >
          {log.map((entry, i) => (
            <div key={i} className={`text-xs leading-snug py-0.5 ${entryClass(entry)}`}>
              {entry}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
