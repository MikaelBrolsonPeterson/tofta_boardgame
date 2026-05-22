// Core game iconography — all icons are SVG, dark-background optimized.
// Standard viewBox: 0 0 24 24. Default size: 20px.

interface IconProps {
  size?: number
  className?: string
}

// ─── Action Tokens ────────────────────────────────────────────────────────────

/** Market action: green hexagon with a coin ring */
export function IconMarketAction({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="#15803d" />
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="none" stroke="#4ade80" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.8" fill="white" />
    </svg>
  )
}

/** Attack action: red hexagon with a sword */
export function IconAttackAction({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="#b91c1c" />
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="none" stroke="#f87171" strokeWidth="0.8" />
      {/* blade */}
      <line x1="12" y1="5.5" x2="12" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* tip */}
      <path d="M10 8.5 L12 5.5 L14 8.5" fill="white" />
      {/* crossguard */}
      <line x1="8.5" y1="11" x2="15.5" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* pommel */}
      <circle cx="12" cy="19" r="1.8" fill="white" />
    </svg>
  )
}

/** Either action: split hexagon, left=attack red / right=market green */
export function IconEitherAction({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <clipPath id="ei-l"><rect x="0" y="0" width="12" height="24" /></clipPath>
        <clipPath id="ei-r"><rect x="12" y="0" width="12" height="24" /></clipPath>
      </defs>
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="#b91c1c" clipPath="url(#ei-l)" />
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="#15803d" clipPath="url(#ei-r)" />
      <line x1="12" y1="2" x2="12" y2="22" stroke="white" strokeWidth="1.2" />
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="none" stroke="white" strokeWidth="0.6" opacity="0.4" />
    </svg>
  )
}

// ─── Currency & Points ────────────────────────────────────────────────────────

/** Gold coin: amber layered circle */
export function IconGold({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#92400e" />
      <circle cx="12" cy="12" r="8.5" fill="#b45309" />
      <circle cx="12" cy="12" r="7" fill="#d97706" />
      <circle cx="12" cy="12" r="5.5" fill="#fbbf24" />
      {/* shine arc */}
      <path d="M8.5 8 Q10 6 12.5 7" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      {/* 'g' label */}
      <text x="12" y="15.5" textAnchor="middle" fill="#78350f" fontSize="7" fontWeight="bold" fontFamily="Georgia, serif">g</text>
    </svg>
  )
}

/** Victory point: purple 5-pointed star */
export function IconVP({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon
        points="12,2 14.9,8.8 22.2,9.6 16.9,14.5 18.5,21.6 12,18 5.5,21.6 7.1,14.5 1.8,9.6 9.1,8.8"
        fill="#6d28d9"
        stroke="#a78bfa"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* inner highlight */}
      <polygon
        points="12,4.5 14,9.5 19,10.2 15.3,13.5"
        fill="white"
        opacity="0.12"
      />
    </svg>
  )
}

// ─── Strength Modifiers (no background — use inline in text) ─────────────────

/** Attack strength: red sword pointing up */
export function IconAttackStr({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="5" x2="12" y2="18.5" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9.5 8.5 L12 5 L14.5 8.5" fill="#ef4444" />
      <line x1="8.5" y1="11.5" x2="15.5" y2="11.5" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="20.5" r="1.8" fill="#ef4444" />
    </svg>
  )
}

/** Defense strength: blue shield */
export function IconDefenseStr({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2 L20 6 L20 13.5 C20 18 16.5 21.5 12 22.5 C7.5 21.5 4 18 4 13.5 L4 6 Z" fill="#1d4ed8" />
      <path d="M12 4.5 L18 8 L18 13.5 C18 16.8 15.5 19.5 12 20.5 C8.5 19.5 6 16.8 6 13.5 L6 8 Z" fill="#3b82f6" />
      {/* cross detail */}
      <line x1="12" y1="9" x2="12" y2="17" stroke="white" strokeWidth="1.2" opacity="0.35" />
      <line x1="8.5" y1="12.5" x2="15.5" y2="12.5" stroke="white" strokeWidth="1.2" opacity="0.35" />
    </svg>
  )
}

// ─── Infrastructure ────────────────────────────────────────────────────────────

/** Infrastructure token: purple hex outline */
export function IconInfraToken({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="#4c1d95" stroke="#8b5cf6" strokeWidth="2" />
      <polygon points="12,6.5 17.5,9.8 17.5,14.2 12,17.5 6.5,14.2 6.5,9.8" fill="#7c3aed" opacity="0.5" />
    </svg>
  )
}

/** Permanent marker: hex with a ring (survives conquest) */
export function IconPermanentMarker({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 20.8,7 20.8,17 12,22 3.2,17 3.2,7" fill="#1c3a5e" stroke="#60a5fa" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="#60a5fa" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.5" fill="#60a5fa" />
    </svg>
  )
}

// ─── Resources (SVG alternatives to emoji) ───────────────────────────────────

/** Stone: grey layered hexagon */
export function IconStone({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,3 19.5,7.5 19.5,16.5 12,21 4.5,16.5 4.5,7.5" fill="#374151" />
      <polygon points="12,5.5 17.5,9 17.5,15 12,18.5 6.5,15 6.5,9" fill="#6b7280" />
      <polygon points="12,8 15.5,10.5 15.5,13.5 12,16 8.5,13.5 8.5,10.5" fill="#9ca3af" />
    </svg>
  )
}

/** Wood: brown log (cross-section) */
export function IconWood({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" fill="#92400e" />
      <circle cx="12" cy="12" r="7" fill="#a16207" />
      <circle cx="12" cy="12" r="5" fill="#b45309" />
      <circle cx="12" cy="12" r="3" fill="#ca8a04" />
      <circle cx="12" cy="12" r="1.2" fill="#d97706" />
      {/* grain lines */}
      <path d="M5 9 Q8 7 12 9" stroke="#78350f" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M5 15 Q8 17 12 15" stroke="#78350f" strokeWidth="0.7" fill="none" opacity="0.5" />
    </svg>
  )
}

/** Food: golden grain heads */
export function IconFood({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* stalk */}
      <line x1="12" y1="21" x2="12" y2="7" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
      {/* center head */}
      <ellipse cx="12" cy="5.5" rx="2.8" ry="4" fill="#fbbf24" />
      {/* left head */}
      <ellipse cx="9" cy="9" rx="2.4" ry="3.5" fill="#fbbf24" transform="rotate(-25 9 9)" />
      {/* right head */}
      <ellipse cx="15" cy="9" rx="2.4" ry="3.5" fill="#fbbf24" transform="rotate(25 15 9)" />
      {/* husks */}
      <line x1="12" y1="9" x2="9.5" y2="11" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="11" x2="14.5" y2="13" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

/** Iron: dark steel ingot */
export function IconIron({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* ingot body */}
      <rect x="5" y="9" width="14" height="9" rx="1.5" fill="#374151" />
      {/* top face */}
      <path d="M7 9 L10 5.5 L17 5.5 L19 9 Z" fill="#4b5563" />
      {/* right face */}
      <path d="M19 9 L19 18 L17 18 L17 5.5 Z" fill="#1f2937" />
      {/* sheen line */}
      <line x1="8" y1="8" x2="14" y2="6.5" stroke="#9ca3af" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="#6b7280" strokeWidth="0.7" opacity="0.5" />
    </svg>
  )
}

/** Paper: scroll with lines */
export function IconPaper({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5.5" y="4" width="13" height="16" rx="1" fill="#fef9c3" />
      <rect x="5.5" y="4" width="13" height="16" rx="1" stroke="#ca8a04" strokeWidth="0.8" />
      {/* scroll curl top */}
      <path d="M5.5 5.5 Q3.5 5.5 3.5 7.5 Q3.5 9.5 5.5 9.5" fill="#fef3c7" stroke="#ca8a04" strokeWidth="0.8" />
      {/* scroll curl bottom */}
      <path d="M5.5 18.5 Q3.5 18.5 3.5 16.5 Q3.5 14.5 5.5 14.5" fill="#fef3c7" stroke="#ca8a04" strokeWidth="0.8" />
      {/* text lines */}
      <line x1="8.5" y1="9" x2="16" y2="9" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="8.5" y1="12" x2="16" y2="12" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="8.5" y1="15" x2="13.5" y2="15" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

/** Cloth: thread spool */
export function IconCloth({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* spool body */}
      <rect x="7.5" y="8.5" width="9" height="7" rx="0.5" fill="#a855f7" />
      {/* thread rows */}
      <line x1="7.5" y1="10.5" x2="16.5" y2="10.5" stroke="#c084fc" strokeWidth="0.8" />
      <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#c084fc" strokeWidth="0.8" />
      <line x1="7.5" y1="13.5" x2="16.5" y2="13.5" stroke="#c084fc" strokeWidth="0.8" />
      {/* end caps */}
      <rect x="5" y="6.5" width="14" height="3" rx="1.5" fill="#7c3aed" />
      <rect x="5" y="14.5" width="14" height="3" rx="1.5" fill="#7c3aed" />
      {/* spool axle */}
      <line x1="12" y1="3.5" x2="12" y2="6.5" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="17.5" x2="12" y2="20.5" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Glass: teal prism with light refraction */
export function IconGlass({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* prism body */}
      <polygon points="12,3 21,18 3,18" fill="#0e7490" />
      {/* light faces */}
      <polygon points="12,3 21,18 12,18" fill="#0891b2" />
      <polygon points="12,3 3,18 12,18" fill="#22d3ee" opacity="0.7" />
      {/* refracted beam */}
      <line x1="12" y1="18" x2="8" y2="22" stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="12" y1="18" x2="16" y2="22" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* incident ray */}
      <line x1="12" y1="3" x2="12" y2="0" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* shine */}
      <line x1="10" y1="8" x2="9" y2="6.5" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

/** Wild: gold radiant star */
export function IconWild({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const r = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={12 + 6.5 * Math.cos(r)}
            y1={12 + 6.5 * Math.sin(r)}
            x2={12 + 10 * Math.cos(r)}
            y2={12 + 10 * Math.sin(r)}
            stroke="#fde68a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        )
      })}
      {/* star body */}
      <polygon
        points="12,3.5 14.2,9.5 20.5,9.5 15.6,13.5 17.5,19.5 12,15.8 6.5,19.5 8.4,13.5 3.5,9.5 9.8,9.5"
        fill="#f59e0b"
        stroke="#fbbf24"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" fill="#fde68a" opacity="0.5" />
    </svg>
  )
}

// ─── Composite helpers ────────────────────────────────────────────────────────

/** Inline cost badge: icon + numeric label */
export function CostBadge({
  icon,
  value,
  size = 16,
}: {
  icon: React.ReactNode
  value: string | number
  size?: number
}) {
  return (
    <span className="inline-flex items-center gap-0.5 align-middle">
      {icon}
      <span style={{ fontSize: size * 0.75 }} className="font-semibold leading-none">
        {value}
      </span>
    </span>
  )
}

// ─── Icon registry (for legend + lookups) ────────────────────────────────────

export const ICON_REGISTRY = [
  { key: 'market-action',   label: 'Market Action',     component: IconMarketAction },
  { key: 'attack-action',   label: 'Attack Action',     component: IconAttackAction },
  { key: 'either-action',   label: 'Either Action',     component: IconEitherAction },
  { key: 'gold',            label: 'Gold',              component: IconGold },
  { key: 'vp',              label: 'Victory Points',    component: IconVP },
  { key: 'attack-str',      label: 'Attack Strength',   component: IconAttackStr },
  { key: 'defense-str',     label: 'Defense Strength',  component: IconDefenseStr },
  { key: 'infra-token',     label: 'Infra Token',       component: IconInfraToken },
  { key: 'permanent',       label: 'Permanent Marker',  component: IconPermanentMarker },
  { key: 'stone',           label: 'Stone',             component: IconStone },
  { key: 'wood',            label: 'Wood',              component: IconWood },
  { key: 'food',            label: 'Food',              component: IconFood },
  { key: 'iron',            label: 'Iron',              component: IconIron },
  { key: 'paper',           label: 'Paper',             component: IconPaper },
  { key: 'cloth',           label: 'Cloth',             component: IconCloth },
  { key: 'glass',           label: 'Glass',             component: IconGlass },
  { key: 'wild',            label: 'Wild',              component: IconWild },
] as const
