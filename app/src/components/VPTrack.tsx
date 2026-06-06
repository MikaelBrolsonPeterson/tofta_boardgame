import { useGameStore } from '../store/gameStore'

const ERA_THRESHOLDS = [5, 9]
const WIN_VP = 12

export default function VPTrack() {
  const { players } = useGameStore()

  return (
    <div
      className="flex-shrink-0 flex items-center px-4 gap-3"
      style={{
        height: 32,
        background: '#080e18',
        borderBottom: '1px solid #1e293b',
      }}
    >
      <span className="text-xs text-slate-600 font-semibold tracking-widest uppercase flex-shrink-0">VP</span>

      {/* Track */}
      <div className="relative flex-1 flex items-center" style={{ height: 20 }}>
        {/* Base bar */}
        <div className="absolute inset-0 rounded-sm" style={{ background: '#0f172a' }} />

        {/* Tick marks + labels */}
        {Array.from({ length: WIN_VP + 1 }, (_, i) => {
          const pct = (i / WIN_VP) * 100
          const isEra = ERA_THRESHOLDS.includes(i)
          const isWin = i === WIN_VP
          return (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
            >
              <div
                style={{
                  width: isEra || isWin ? 2 : 1,
                  height: isEra || isWin ? 14 : 8,
                  background: isWin ? '#f59e0b' : isEra ? '#6366f1' : '#1e293b',
                  marginTop: isEra || isWin ? 3 : 6,
                }}
              />
              {(isEra || isWin || i % 3 === 0) && (
                <span
                  className="absolute text-slate-600"
                  style={{ fontSize: 7, top: 15, whiteSpace: 'nowrap', color: isWin ? '#f59e0b' : isEra ? '#818cf8' : '#475569' }}
                >
                  {isWin ? '👑' : i}
                </span>
              )}
            </div>
          )
        })}

        {/* Era threshold labels */}
        {ERA_THRESHOLDS.map((vp, idx) => (
          <div
            key={vp}
            className="absolute"
            style={{ left: `${(vp / WIN_VP) * 100}%`, transform: 'translateX(-50%)', bottom: -1 }}
          >
            <span style={{ fontSize: 7, color: '#818cf8', whiteSpace: 'nowrap' }}>
              Era {idx + 2}
            </span>
          </div>
        ))}

        {/* Player tokens */}
        {players.map((player, idx) => {
          const vp = Math.min(player.victoryPoints, WIN_VP)
          const pct = (vp / WIN_VP) * 100
          const offset = idx * 5 - ((players.length - 1) * 2.5)
          return (
            <div
              key={player.id}
              className="absolute transition-all duration-300"
              style={{
                left: `${pct}%`,
                top: '50%',
                transform: `translate(calc(-50% + ${offset}px), -50%)`,
                zIndex: 10,
              }}
              title={`${player.name}: ${player.victoryPoints} VP`}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: player.color,
                  border: '1.5px solid #0d1117',
                  boxShadow: `0 0 4px ${player.color}80`,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Quick VP legend */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {players.map(p => (
          <div key={p.id} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-xs font-bold" style={{ color: p.color }}>{p.victoryPoints}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
