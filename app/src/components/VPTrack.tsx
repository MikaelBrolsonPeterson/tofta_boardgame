import { useGameStore } from '../store/gameStore'

const ERA_THRESHOLDS = [5, 9]
const WIN_VP = 12

export default function VPTrack() {
  const { players } = useGameStore()

  // Build tick data bottom (0) to top (12)
  const ticks = Array.from({ length: WIN_VP + 1 }, (_, i) => i)

  return (
    <div
      className="flex-shrink-0 flex flex-col select-none"
      style={{ width: 72, background: '#080e18', borderLeft: '1px solid #1e293b' }}
    >
      {/* Header */}
      <div
        className="text-center py-2 text-xs font-bold tracking-widest uppercase border-b"
        style={{ color: '#f59e0b', borderColor: '#1e293b' }}
      >
        VP
      </div>

      {/* Track area */}
      <div className="relative flex-1 flex justify-center" style={{ paddingTop: 8, paddingBottom: 8 }}>
        {/* Center rail */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 8,
            bottom: 8,
            width: 6,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to top, #1e3a5f, #1e293b)',
            borderRadius: 3,
          }}
        />

        {/* Ticks + numbers + era bands */}
        {ticks.map(i => {
          const isEra = ERA_THRESHOLDS.includes(i)
          const isWin = i === WIN_VP
          // pct: 0 = top (VP=12), 100 = bottom (VP=0)
          const pct = ((WIN_VP - i) / WIN_VP) * 100

          return (
            <div
              key={i}
              className="absolute flex items-center"
              style={{ top: `calc(8px + ${pct}% * (100% - 16px) / 100)`, left: 0, right: 0 }}
            >
              {/* Left number */}
              <span
                style={{
                  fontSize: 9,
                  width: 18,
                  textAlign: 'right',
                  paddingRight: 3,
                  fontWeight: isEra || isWin ? 700 : 400,
                  color: isWin ? '#f59e0b' : isEra ? '#818cf8' : '#475569',
                  lineHeight: 1,
                }}
              >
                {isWin ? '👑' : i}
              </span>

              {/* Tick mark */}
              <div
                style={{
                  width: isEra || isWin ? 14 : 8,
                  height: isEra || isWin ? 2 : 1,
                  background: isWin ? '#f59e0b' : isEra ? '#6366f1' : '#334155',
                  marginLeft: 2,
                  borderRadius: 1,
                }}
              />

              {/* Era label */}
              {isEra && (
                <span
                  style={{ fontSize: 7, color: '#818cf8', marginLeft: 3, whiteSpace: 'nowrap' }}
                >
                  Era {ERA_THRESHOLDS.indexOf(i) + 2}
                </span>
              )}
            </div>
          )
        })}

        {/* Player tokens — stacked horizontally when tied */}
        {players.map((player, idx) => {
          const vp = Math.min(player.victoryPoints, WIN_VP)
          const pct = ((WIN_VP - vp) / WIN_VP) * 100
          const nudge = (idx - (players.length - 1) / 2) * 7

          return (
            <div
              key={player.id}
              className="absolute transition-all duration-500"
              style={{
                top: `calc(8px + ${pct}% * (100% - 16px) / 100)`,
                left: '50%',
                transform: `translate(calc(-50% + ${nudge}px + 14px), -50%)`,
                zIndex: 10,
              }}
              title={`${player.name}: ${player.victoryPoints} VP`}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: player.color,
                  border: '2px solid #0d1117',
                  boxShadow: `0 0 6px ${player.color}99`,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Player legend */}
      <div className="border-t p-2 flex flex-col gap-1.5" style={{ borderColor: '#1e293b' }}>
        {players.map(p => (
          <div key={p.id} className="flex items-center gap-1.5">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: p.color,
                flexShrink: 0,
                boxShadow: `0 0 4px ${p.color}80`,
              }}
            />
            <span style={{ color: p.color, fontSize: 10, fontWeight: 700 }}>{p.victoryPoints}</span>
            <span className="text-slate-500 truncate" style={{ fontSize: 9 }}>
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
