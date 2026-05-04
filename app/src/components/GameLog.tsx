import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'

export default function GameLog() {
  const log = useGameStore(s => s.log)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log])

  return (
    <div className="flex flex-col gap-1 p-3 rounded-lg border border-slate-600 bg-slate-800 overflow-y-auto" style={{ maxHeight: '220px' }}>
      <div className="text-xs font-semibold text-slate-400 mb-1">Game Log</div>
      {log.map((entry, i) => (
        <div key={i} className={`text-xs leading-snug ${
          entry.startsWith('══') ? 'text-yellow-400 font-semibold' :
          entry.startsWith('──') ? 'text-blue-400' :
          entry.includes('succeeded') ? 'text-green-400' :
          entry.includes('failed') ? 'text-red-400' :
          entry.includes('abandoned') ? 'text-orange-400' :
          'text-slate-300'
        }`}>
          {entry}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
