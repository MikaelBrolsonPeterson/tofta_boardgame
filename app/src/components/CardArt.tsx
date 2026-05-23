import { useId } from 'react'
import type { CardClass } from '../types/game'

interface CardArtProps {
  cardClass: CardClass
}

function MilitaryArt() {
  const id = useId()
  const skyGradId = `${id}-sky`
  const torchLeftId = `${id}-torch-left`
  const torchRightId = `${id}-torch-right`
  const moonMaskId = `${id}-moon-mask`

  return (
    <svg viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id={skyGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050015" />
          <stop offset="100%" stopColor="#1a0840" />
        </linearGradient>
        <radialGradient id={torchLeftId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff8020" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#ff4800" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff4800" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={torchRightId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff8020" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#ff4800" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff4800" stopOpacity="0" />
        </radialGradient>
        <mask id={moonMaskId}>
          <rect width="200" height="90" fill="white" />
          <circle cx="170" cy="10" r="8.5" fill="black" />
        </mask>
      </defs>

      {/* Sky */}
      <rect width="200" height="90" fill={`url(#${skyGradId})`} />

      {/* Moon with crescent mask */}
      <circle cx="165" cy="14" r="10" fill="#e8d5b0" mask={`url(#${moonMaskId})`} />

      {/* Stars */}
      <circle cx="12" cy="8" r="0.9" fill="white" opacity="0.8" />
      <circle cx="28" cy="4" r="0.8" fill="white" opacity="0.6" />
      <circle cx="45" cy="11" r="1.0" fill="white" opacity="0.9" />
      <circle cx="58" cy="5" r="0.8" fill="white" opacity="0.7" />
      <circle cx="72" cy="14" r="0.9" fill="white" opacity="0.5" />
      <circle cx="88" cy="7" r="0.8" fill="white" opacity="0.8" />
      <circle cx="105" cy="3" r="1.0" fill="white" opacity="0.6" />
      <circle cx="118" cy="10" r="0.8" fill="white" opacity="0.9" />
      <circle cx="132" cy="5" r="0.9" fill="white" opacity="0.7" />
      <circle cx="148" cy="18" r="0.8" fill="white" opacity="0.5" />
      <circle cx="178" cy="24" r="0.9" fill="white" opacity="0.8" />
      <circle cx="190" cy="9" r="0.8" fill="white" opacity="0.6" />
      <circle cx="20" cy="22" r="0.9" fill="white" opacity="0.7" />
      <circle cx="62" cy="28" r="0.8" fill="white" opacity="0.5" />

      {/* Far mountains */}
      <polygon points="0,90 0,60 18,48 36,62 55,44 72,56 90,42 110,55 128,40 148,54 165,43 182,56 200,48 200,90" fill="#0e0428" />

      {/* Nearer ground hills */}
      <polygon points="0,90 0,76 25,72 60,78 80,73 120,80 155,74 185,79 200,75 200,90" fill="#08001e" />

      {/* Left tower */}
      <rect x="20" y="33" width="24" height="57" fill="#06001a" />
      {/* Left tower merlons */}
      <rect x="20" y="26" width="6" height="9" fill="#06001a" />
      <rect x="29" y="26" width="6" height="9" fill="#06001a" />
      <rect x="38" y="26" width="6" height="9" fill="#06001a" />

      {/* Right tower */}
      <rect x="156" y="33" width="24" height="57" fill="#06001a" />
      {/* Right tower merlons */}
      <rect x="156" y="26" width="6" height="9" fill="#06001a" />
      <rect x="165" y="26" width="6" height="9" fill="#06001a" />
      <rect x="174" y="26" width="6" height="9" fill="#06001a" />

      {/* Main castle wall */}
      <rect x="42" y="45" width="116" height="45" fill="#07001c" />

      {/* Wall battlements — 9 merlons */}
      <rect x="44" y="38" width="7" height="9" fill="#07001c" />
      <rect x="55" y="38" width="7" height="9" fill="#07001c" />
      <rect x="66" y="38" width="7" height="9" fill="#07001c" />
      <rect x="77" y="38" width="7" height="9" fill="#07001c" />
      <rect x="88" y="38" width="7" height="9" fill="#07001c" />
      <rect x="99" y="38" width="7" height="9" fill="#07001c" />
      <rect x="110" y="38" width="7" height="9" fill="#07001c" />
      <rect x="121" y="38" width="7" height="9" fill="#07001c" />
      <rect x="132" y="38" width="7" height="9" fill="#07001c" />
      <rect x="143" y="38" width="7" height="9" fill="#07001c" />

      {/* Gate arch */}
      <rect x="89" y="62" width="22" height="28" fill="#1a0840" />
      <ellipse cx="100" cy="62" rx="11" ry="6" fill="#1a0840" />

      {/* Arrow slits on wall face */}
      <rect x="52" y="52" width="2" height="8" fill="#02000a" />
      <rect x="70" y="52" width="2" height="8" fill="#02000a" />
      <rect x="118" y="52" width="2" height="8" fill="#02000a" />
      <rect x="136" y="52" width="2" height="8" fill="#02000a" />
      <rect x="154" y="52" width="2" height="8" fill="#02000a" />

      {/* Torch glow left tower */}
      <circle cx="32" cy="33" r="10" fill={`url(#${torchLeftId})`} />
      <circle cx="32" cy="33" r="2" fill="#ffaa40" />

      {/* Torch glow right tower */}
      <circle cx="168" cy="33" r="10" fill={`url(#${torchRightId})`} />
      <circle cx="168" cy="33" r="2" fill="#ffaa40" />
    </svg>
  )
}

function MarketArt() {
  const id = useId()
  const skyGradId = `${id}-sky`
  const horizonGlowId = `${id}-glow`
  const lanternGlowId = `${id}-lantern`

  return (
    <svg viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id={skyGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#140c38" />
          <stop offset="50%" stopColor="#5c1f82" />
          <stop offset="100%" stopColor="#c05010" />
        </linearGradient>
        <radialGradient id={horizonGlowId} cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#f08020" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f08020" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={lanternGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb040" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffb040" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="200" height="90" fill={`url(#${skyGradId})`} />

      {/* Horizon glow */}
      <rect width="200" height="90" fill={`url(#${horizonGlowId})`} />

      {/* Water — lower third */}
      <rect x="0" y="60" width="200" height="30" fill="#0a2040" />

      {/* Water reflection highlights */}
      <line x1="10" y1="66" x2="60" y2="66" stroke="#1a4060" strokeWidth="0.8" opacity="0.5" />
      <line x1="5" y1="71" x2="75" y2="71" stroke="#1a4060" strokeWidth="0.6" opacity="0.4" />
      <line x1="80" y1="68" x2="140" y2="68" stroke="#1a4060" strokeWidth="0.7" opacity="0.4" />
      <line x1="110" y1="74" x2="190" y2="74" stroke="#1a4060" strokeWidth="0.6" opacity="0.3" />
      <line x1="30" y1="78" x2="100" y2="78" stroke="#1a4060" strokeWidth="0.5" opacity="0.3" />
      {/* Warm glow reflections on water */}
      <line x1="70" y1="63" x2="130" y2="63" stroke="#c05010" strokeWidth="1.0" opacity="0.25" />
      <line x1="60" y1="67" x2="145" y2="67" stroke="#c05010" strokeWidth="0.7" opacity="0.18" />

      {/* Left ship */}
      <polygon points="18,60 14,60 16,70 46,70 48,60 44,60" fill="#06101e" />
      {/* Left mast */}
      <line x1="31" y1="38" x2="31" y2="60" stroke="#06101e" strokeWidth="1.5" />
      {/* Left sail */}
      <polygon points="31,40 31,58 50,54 48,44" fill="#06101e" />
      {/* Left small sail */}
      <polygon points="31,40 31,52 16,50 18,43" fill="#06101e" />

      {/* Right ship */}
      <polygon points="125,60 121,60 123,70 157,70 159,60 155,60" fill="#06101e" />
      {/* Right mast */}
      <line x1="140" y1="34" x2="140" y2="60" stroke="#06101e" strokeWidth="1.5" />
      {/* Right sail */}
      <polygon points="140,36 140,57 162,52 160,40" fill="#06101e" />
      {/* Right small sail */}
      <polygon points="140,36 140,54 122,50 124,42" fill="#06101e" />

      {/* Dock/pier — horizontal rect at waterline from right */}
      <rect x="155" y="58" width="45" height="5" fill="#06101e" />
      <rect x="165" y="63" width="5" height="12" fill="#06101e" />
      <rect x="178" y="63" width="5" height="10" fill="#06101e" />
      <rect x="191" y="63" width="5" height="8" fill="#06101e" />

      {/* Merchant canopy — foreground arched shape */}
      <path d="M0,90 L0,78 Q30,68 60,74 Q90,80 110,72 Q130,64 160,74 L160,90 Z" fill="#06101e" />

      {/* Hanging lanterns */}
      {/* Lantern 1 */}
      <circle cx="42" cy="46" r="8" fill={`url(#${lanternGlowId})`} />
      <line x1="42" y1="36" x2="42" y2="42" stroke="#06101e" strokeWidth="1" />
      <circle cx="42" cy="44" r="2.5" fill="#ffb040" />

      {/* Lantern 2 */}
      <circle cx="95" cy="42" r="8" fill={`url(#${lanternGlowId})`} />
      <line x1="95" y1="32" x2="95" y2="38" stroke="#06101e" strokeWidth="1" />
      <circle cx="95" cy="40" r="2.5" fill="#ffb040" />

      {/* Lantern 3 */}
      <circle cx="148" cy="45" r="8" fill={`url(#${lanternGlowId})`} />
      <line x1="148" y1="35" x2="148" y2="41" stroke="#06101e" strokeWidth="1" />
      <circle cx="148" cy="43" r="2.5" fill="#ffb040" />
    </svg>
  )
}

function ScienceArt() {
  const id = useId()
  const skyGradId = `${id}-sky`
  const domeGlowId = `${id}-dome-glow`

  return (
    <svg viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id={skyGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010818" />
          <stop offset="100%" stopColor="#0a2050" />
        </linearGradient>
        <radialGradient id={domeGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a0d8ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a0d8ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="200" height="90" fill={`url(#${skyGradId})`} />

      {/* Stars — scattered dots */}
      <circle cx="8" cy="5" r="0.8" fill="white" opacity="0.9" />
      <circle cx="22" cy="12" r="0.7" fill="white" opacity="0.7" />
      <circle cx="38" cy="6" r="0.9" fill="white" opacity="0.8" />
      <circle cx="52" cy="16" r="0.8" fill="white" opacity="0.6" />
      <circle cx="68" cy="8" r="0.7" fill="white" opacity="0.9" />
      <circle cx="84" cy="4" r="0.8" fill="white" opacity="0.7" />
      <circle cx="100" cy="11" r="0.9" fill="white" opacity="0.8" />
      <circle cx="115" cy="5" r="0.8" fill="white" opacity="0.6" />
      <circle cx="130" cy="14" r="0.7" fill="white" opacity="0.9" />
      <circle cx="148" cy="7" r="0.8" fill="white" opacity="0.7" />
      <circle cx="162" cy="18" r="0.9" fill="white" opacity="0.8" />
      <circle cx="178" cy="8" r="0.8" fill="white" opacity="0.6" />
      <circle cx="192" cy="15" r="0.7" fill="white" opacity="0.9" />
      <circle cx="55" cy="28" r="0.8" fill="white" opacity="0.7" />
      <circle cx="170" cy="30" r="0.7" fill="white" opacity="0.6" />
      <circle cx="12" cy="30" r="0.8" fill="white" opacity="0.5" />
      <circle cx="190" cy="28" r="0.7" fill="white" opacity="0.7" />
      <circle cx="78" cy="25" r="0.8" fill="white" opacity="0.6" />

      {/* Constellation lines — connecting 4-5 stars */}
      <line x1="84" y1="4" x2="100" y2="11" stroke="white" strokeWidth="0.4" opacity="0.4" />
      <line x1="100" y1="11" x2="115" y2="5" stroke="white" strokeWidth="0.4" opacity="0.4" />
      <line x1="115" y1="5" x2="130" y2="14" stroke="white" strokeWidth="0.4" opacity="0.4" />
      <line x1="38" y1="6" x2="52" y2="16" stroke="white" strokeWidth="0.4" opacity="0.4" />
      <line x1="52" y1="16" x2="68" y2="8" stroke="white" strokeWidth="0.4" opacity="0.4" />

      {/* Moon */}
      <circle cx="30" cy="18" r="14" fill="#d5c8a0" />
      {/* Moon shadow offset — inner circle suggestion */}
      <circle cx="34" cy="15" r="10" fill="#c0b08a" opacity="0.5" />
      {/* Crater details */}
      <circle cx="24" cy="14" r="2.5" fill="#b8a070" opacity="0.6" />
      <circle cx="34" cy="22" r="1.8" fill="#b8a070" opacity="0.5" />
      <circle cx="28" cy="23" r="1.2" fill="#b8a070" opacity="0.4" />

      {/* Rolling hill silhouette */}
      <polygon points="0,90 0,62 20,58 45,65 70,55 100,62 130,52 160,60 185,55 200,60 200,90" fill="#050e20" />

      {/* Observatory building on hill */}
      {/* Base rect */}
      <rect x="82" y="47" width="36" height="20" fill="#030c1a" />
      {/* Dome — ellipse on top of building */}
      <ellipse cx="100" cy="47" rx="18" ry="12" fill="#030c1a" />
      {/* Dome opening slit — bright arc */}
      <path d="M 92,42 A 18,12 0 0 1 108,42" fill="none" stroke="#a0d8ff" strokeWidth="1.5" opacity="0.8" />
      {/* Dome glow */}
      <circle cx="100" cy="44" r="10" fill={`url(#${domeGlowId})`} />

      {/* Left cypress tree */}
      <polygon points="58,90 58,52 50,65 66,65" fill="#051205" />
      <polygon points="58,65 52,72 64,72" fill="#051205" />
      <polygon points="58,72 53,80 63,80" fill="#051205" />

      {/* Right cypress tree */}
      <polygon points="142,90 142,52 134,65 150,65" fill="#051205" />
      <polygon points="142,65 136,72 148,72" fill="#051205" />
      <polygon points="142,72 137,80 147,80" fill="#051205" />
    </svg>
  )
}

function WondersArt() {
  const id = useId()
  const skyGradId = `${id}-sky`

  return (
    <svg viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id={skyGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c2808" />
          <stop offset="55%" stopColor="#c85010" />
          <stop offset="100%" stopColor="#f0b030" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="200" height="90" fill={`url(#${skyGradId})`} />

      {/* Sun rays from top-right — thin triangles */}
      <polygon points="195,0 188,0 160,55" fill="#f8e060" opacity="0.15" />
      <polygon points="200,5 200,15 155,58" fill="#f8e060" opacity="0.12" />
      <polygon points="200,20 200,32 158,62" fill="#f8e060" opacity="0.10" />
      <polygon points="200,36 200,48 162,68" fill="#f8e060" opacity="0.08" />
      <polygon points="185,0 175,0 150,50" fill="#f8e060" opacity="0.12" />
      <polygon points="172,0 163,0 145,45" fill="#f8e060" opacity="0.10" />
      <polygon points="158,0 150,0 138,40" fill="#f8e060" opacity="0.08" />
      <polygon points="200,52 200,62 165,72" fill="#f8e060" opacity="0.07" />

      {/* Distant mountains */}
      <polygon points="0,90 0,55 20,44 40,58 60,42 80,54 100,40 120,52 140,38 162,50 180,42 200,52 200,90" fill="#5c2005" />

      {/* Foreground ground */}
      <rect x="0" y="82" width="200" height="8" fill="#150802" />

      {/* Temple elevated platform steps */}
      <rect x="55" y="72" width="90" height="6" fill="#2a1005" />
      <rect x="62" y="66" width="76" height="7" fill="#2a1005" />

      {/* Temple columns — 6 thin rects */}
      <rect x="66" y="42" width="5" height="25" fill="#1a0a02" />
      <rect x="79" y="42" width="5" height="25" fill="#1a0a02" />
      <rect x="92" y="42" width="5" height="25" fill="#1a0a02" />
      <rect x="104" y="42" width="5" height="25" fill="#1a0a02" />
      <rect x="116" y="42" width="5" height="25" fill="#1a0a02" />
      <rect x="129" y="42" width="5" height="25" fill="#1a0a02" />

      {/* Pediment — triangular top */}
      <polygon points="60,43 100,24 140,43" fill="#1a0a02" />

      {/* Entablature / architrave bar under pediment */}
      <rect x="62" y="42" width="76" height="4" fill="#1a0a02" />

      {/* Left cypress tree */}
      <polygon points="42,90 42,55 35,68 49,68" fill="#0f1e05" />
      <polygon points="42,68 36,75 48,75" fill="#0f1e05" />
      <polygon points="42,75 37,83 47,83" fill="#0f1e05" />

      {/* Right cypress tree */}
      <polygon points="158,90 158,55 151,68 165,68" fill="#0f1e05" />
      <polygon points="158,68 152,75 164,75" fill="#0f1e05" />
      <polygon points="158,75 153,83 163,83" fill="#0f1e05" />
    </svg>
  )
}

function MiscArt() {
  const id = useId()
  const skyGradId = `${id}-sky`

  return (
    <svg viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id={skyGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#160830" />
          <stop offset="50%" stopColor="#7c3080" />
          <stop offset="100%" stopColor="#e8782a" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="200" height="90" fill={`url(#${skyGradId})`} />

      {/* Birds — simple V shapes */}
      <path d="M 28,18 L 32,22 L 36,18" fill="none" stroke="white" strokeWidth="0.9" opacity="0.5" />
      <path d="M 60,12 L 64,16 L 68,12" fill="none" stroke="white" strokeWidth="0.9" opacity="0.5" />
      <path d="M 110,8 L 114,12 L 118,8" fill="none" stroke="white" strokeWidth="0.9" opacity="0.5" />
      <path d="M 150,20 L 154,24 L 158,20" fill="none" stroke="white" strokeWidth="0.9" opacity="0.5" />
      <path d="M 180,14 L 184,18 L 188,14" fill="none" stroke="white" strokeWidth="0.9" opacity="0.5" />

      {/* Far hills — muted purple */}
      <polygon points="0,90 0,55 25,48 55,56 80,45 110,53 140,44 170,52 200,46 200,90" fill="#4a2860" />

      {/* Mid hills — richer green */}
      <polygon points="0,90 0,64 20,60 50,67 75,58 105,65 135,56 165,63 190,57 200,62 200,90" fill="#1a4020" />

      {/* Near hills — dark green */}
      <polygon points="0,90 0,74 30,70 65,76 95,68 130,75 165,70 200,74 200,90" fill="#0e2a14" />

      {/* Trees along mid-hill line */}
      {/* Tree 1 */}
      <line x1="32" y1="70" x2="32" y2="63" stroke="#081208" strokeWidth="1.5" />
      <circle cx="32" cy="60" r="4" fill="#081208" />

      {/* Tree 2 */}
      <line x1="68" y1="68" x2="68" y2="60" stroke="#081208" strokeWidth="1.5" />
      <circle cx="68" cy="57" r="4.5" fill="#081208" />

      {/* Tree 3 */}
      <line x1="108" y1="70" x2="108" y2="62" stroke="#081208" strokeWidth="1.5" />
      <circle cx="108" cy="59" r="4" fill="#081208" />

      {/* Tree 4 */}
      <line x1="145" y1="68" x2="145" y2="60" stroke="#081208" strokeWidth="1.5" />
      <circle cx="145" cy="57" r="5" fill="#081208" />

      {/* Tree 5 */}
      <line x1="178" y1="69" x2="178" y2="62" stroke="#081208" strokeWidth="1.5" />
      <circle cx="178" cy="59" r="3.5" fill="#081208" />

      {/* Path — curved lighter shape winding from foreground toward center */}
      <path d="M 75,90 Q 85,80 95,72 Q 105,64 112,58" fill="none" stroke="#5a3810" strokeWidth="5" opacity="0.7" strokeLinecap="round" />
      <path d="M 75,90 Q 85,80 95,72 Q 105,64 112,58" fill="none" stroke="#7a5428" strokeWidth="2" opacity="0.5" strokeLinecap="round" />

      {/* Small house on mid-hill */}
      {/* House body */}
      <rect x="118" y="60" width="14" height="10" fill="#081208" />
      {/* Roof */}
      <polygon points="116,60 125,53 134,60" fill="#081208" />
      {/* Door */}
      <rect x="122" y="66" width="4" height="4" fill="#0e2a14" />
    </svg>
  )
}

export default function CardArt({ cardClass }: CardArtProps) {
  switch (cardClass) {
    case 'military':
      return <MilitaryArt />
    case 'market':
      return <MarketArt />
    case 'science':
      return <ScienceArt />
    case 'wonders':
      return <WondersArt />
    case 'misc':
      return <MiscArt />
  }
}
