import { create } from 'zustand'
import type { GameState, Player, PlayerId, CombatResult, EmpireCard, CardClass } from '../types/game'
import { buildInitialMap } from '../data/initialMap'
import { BASE_DECK, INDEPENDENT_DECK, shuffle, drawOne, modifierToNumber } from '../data/modifierDeck'
import { TERRAIN } from '../data/terrainConfig'
import { getNeighbors, hexKey, isAdjacent } from '../utils/hex'
import { EMPIRE_CARDS } from '../data/empireCards'
import { CLASS_LIMIT, TRACK_BENEFITS } from '../data/buildingTrack'

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const PLAYER_COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f97316', '#a855f7']

function makePlayer(index: number): Player {
  return {
    id: `player${index + 1}` as PlayerId,
    name: `Player ${index + 1}`,
    color: PLAYER_COLORS[index],
    gold: index === 0 ? 4 : 5,
    attackActionsRemaining: 1,
    marketActionsRemaining: 1,
    attackActionsPerTurn: 1,
    marketActionsPerTurn: 1,
    resources: { stone: 0, wood: 0, food: 0 },
    commodities: { iron: 0, paper: 0, cloth: 0, glass: 0, wild: 0 },
    incomeRate: 0,
    modifierDeck: shuffle([...BASE_DECK]),
    modifierDiscard: [],
    activeCards: [],
    buildingTrack: { military: 0, market: 0, science: 0, wonders: 0, misc: 0 },
    victoryPoints: 0,
  }
}

function calcIncomeRate(regions: GameState['regions'], playerId: PlayerId): number {
  let tax = 0, upkeep = 0
  const mine = Object.values(regions).filter(r => r.owner === playerId)
  for (const region of mine) {
    const cfg = TERRAIN[region.terrain]
    upkeep += cfg.upkeep
    if (region.terrain === 'capitol') { tax += cfg.taxation; continue }
    const connected = getNeighbors(region.q, region.r).some(n => {
      const nb = regions[hexKey(n.q, n.r)]
      return nb?.owner === playerId
    })
    if (connected) tax += cfg.taxation
  }
  return tax - upkeep
}

interface Actions {
  selectHex: (q: number, r: number) => void
  initiateAttack: () => void
  cancelAttack: () => void
  executeAttack: (toQ: number, toR: number) => void
  abandonSelected: () => void
  endTurn: () => void
  buyCard: (cardId: string, payWithGold: boolean) => void
  replenishMarket: () => void
}

// Initialise market: deal 4 Era 1 cards face-up, rest go to deck
const _era1Shuffled = shuffleArray(EMPIRE_CARDS.filter(c => c.era === 1))
const _initialMarketCards: EmpireCard[] = _era1Shuffled.slice(0, 4)
const _initialMarketDeck: EmpireCard[] = [
  ..._era1Shuffled.slice(4),
  ...shuffleArray(EMPIRE_CARDS.filter(c => c.era === 2)),
  ...shuffleArray(EMPIRE_CARDS.filter(c => c.era === 3)),
]

export const useGameStore = create<GameState & Actions>((set, get) => ({
  regions: buildInitialMap(),
  players: [makePlayer(0), makePlayer(1)],
  currentPlayerIndex: 0,
  round: 1,
  era: 1,
  phase: 'action',
  selectedHex: null,
  attackSourceHex: null,
  conquestProgress: {},
  log: ['Game started. Player 1\'s turn.'],
  lastCombat: null,
  marketCards: _initialMarketCards,
  marketDeck: _initialMarketDeck,
  pendingClaims: {},

  selectHex: (q, r) => {
    const { phase } = get()
    if (phase === 'select-attack-target') {
      get().executeAttack(q, r)
      return
    }
    set(s => ({
      selectedHex: s.selectedHex?.q === q && s.selectedHex?.r === r ? null : { q, r },
      lastCombat: null,
    }))
  },

  initiateAttack: () => {
    const { selectedHex, players, currentPlayerIndex, regions } = get()
    if (!selectedHex) return
    const player = players[currentPlayerIndex]
    if (player.attackActionsRemaining <= 0) return
    const region = regions[hexKey(selectedHex.q, selectedHex.r)]
    if (region?.owner !== player.id) return
    set({ phase: 'select-attack-target', attackSourceHex: selectedHex })
  },

  cancelAttack: () => set({ phase: 'action', attackSourceHex: null }),

  executeAttack: (toQ, toR) => {
    const { regions, players, currentPlayerIndex, attackSourceHex, conquestProgress } = get()
    if (!attackSourceHex) return
    const attacker = players[currentPlayerIndex]
    const target = regions[hexKey(toQ, toR)]
    if (!target) return
    if (target.owner === attacker.id) {
      set({ phase: 'action', attackSourceHex: null, selectedHex: { q: toQ, r: toR } })
      return
    }
    if (!isAdjacent(attackSourceHex, { q: toQ, r: toR })) {
      set({ phase: 'action', attackSourceHex: null })
      return
    }
    const cfg = TERRAIN[target.terrain]
    if (!cfg.conquerable) {
      set(s => ({
        phase: 'action', attackSourceHex: null,
        log: [...s.log, `${attacker.name}: ${cfg.label} cannot be conquered without special cards.`],
      }))
      return
    }

    // Draw attacker card
    const atk = drawOne(attacker.modifierDeck, attacker.modifierDiscard)

    // Draw defender card (independent deck or defending player's deck)
    const defenderPlayer = target.owner ? players.find(p => p.id === target.owner) : null
    const defSrc = defenderPlayer
      ? drawOne(defenderPlayer.modifierDeck, defenderPlayer.modifierDiscard)
      : drawOne(shuffle([...INDEPENDENT_DECK]), [])

    const atkVal = modifierToNumber(atk.card)
    const defVal = modifierToNumber(defSrc.card)
    const atkTotal = 1 + atkVal
    // Independent (neutral) regions don't benefit from terrain defense bonuses
    const defBonus = target.owner ? cfg.defenseBonus : 0
    const defTotal = 1 + defBonus + defVal

    const success = atk.card !== 'fail' && (atk.card === 'success' || atkTotal > defTotal)

    // Fail or Success: reshuffle the player's full personal deck (preserving all modifications)
    const atkNeedsReshuffle = atk.card === 'fail' || atk.card === 'success'
    const finalAtkDeck = atkNeedsReshuffle ? shuffle([...atk.deck, ...atk.discard]) : atk.deck
    const finalAtkDiscard = atkNeedsReshuffle ? [] : atk.discard

    // Same for defending player
    const defNeedsReshuffle = defenderPlayer && (defSrc.card === 'fail' || defSrc.card === 'success')
    const finalDefDeck = defNeedsReshuffle ? shuffle([...defSrc.deck, ...defSrc.discard]) : defSrc.deck
    const finalDefDiscard = defNeedsReshuffle ? [] : defSrc.discard

    const fmtStrength = (card: typeof atk.card, total: number) =>
      card === 'success' ? 'SUCCESS' : card === 'fail' ? 'FAIL' : String(total)

    const combatResult: CombatResult = {
      attackerRoll: atk.card,
      defenderRoll: defSrc.card,
      attackerTotal: atkTotal,
      defenderTotal: defTotal,
      success,
      message: success
        ? `Attack succeeded! (${fmtStrength(atk.card, atkTotal)} vs ${fmtStrength(defSrc.card, defTotal)})`
        : `Attack failed. (${fmtStrength(atk.card, atkTotal)} vs ${fmtStrength(defSrc.card, defTotal)})`,
    }

    const key = hexKey(toQ, toR)
    const required = cfg.attacksToConquer
    const progress = (conquestProgress[key] ?? 0) + (success ? 1 : 0)
    const conquered = success && progress >= required

    set(s => {
      const newRegions = { ...s.regions }
      const newProgress = { ...s.conquestProgress }
      const newPendingClaims = { ...s.pendingClaims }

      if (conquered) {
        newRegions[key] = { ...target, owner: attacker.id }
        delete newProgress[key]
        delete newPendingClaims[key]
      } else if (success) {
        newProgress[key] = progress
      } else {
        delete newProgress[key]
        // Revolt: failed attack on neutral territory creates a pending claim
        if (!target.owner) {
          newPendingClaims[key] = attacker.id
        }
      }

      const newPlayers = s.players.map(p => {
        if (p.id === attacker.id) {
          return {
            ...p,
            attackActionsRemaining: p.attackActionsRemaining - 1,
            modifierDeck: finalAtkDeck,
            modifierDiscard: finalAtkDiscard,
          }
        }
        if (defenderPlayer && p.id === defenderPlayer.id) {
          return { ...p, modifierDeck: finalDefDeck, modifierDiscard: finalDefDiscard }
        }
        return p
      })

      const finalPlayers = newPlayers.map(p => ({
        ...p, incomeRate: calcIncomeRate(newRegions, p.id),
      }))

      const progressNote = !conquered && success ? ` (${progress}/${required})` : ''
      const revoltNote = !success && !target.owner ? ' [Revolt pending]' : ''
      const logEntry = `${attacker.name} → ${cfg.label} (${toQ},${toR}): ${combatResult.message}${progressNote}${revoltNote}`

      return {
        regions: newRegions,
        players: finalPlayers,
        conquestProgress: newProgress,
        pendingClaims: newPendingClaims,
        phase: 'action',
        attackSourceHex: null,
        selectedHex: { q: toQ, r: toR },
        log: [...s.log, logEntry],
        lastCombat: combatResult,
      }
    })
  },

  abandonSelected: () => {
    const { selectedHex, regions, players, currentPlayerIndex } = get()
    if (!selectedHex) return
    const player = players[currentPlayerIndex]
    const region = regions[hexKey(selectedHex.q, selectedHex.r)]
    if (!region || region.owner !== player.id) return
    if (region.terrain === 'capitol') return

    set(s => {
      const newRegions = {
        ...s.regions,
        [hexKey(selectedHex.q, selectedHex.r)]: { ...region, owner: null, building: null },
      }
      const newPlayers = s.players.map(p => ({
        ...p, incomeRate: calcIncomeRate(newRegions, p.id),
      }))
      return {
        regions: newRegions,
        players: newPlayers,
        selectedHex: null,
        log: [...s.log, `${player.name} abandoned ${TERRAIN[region.terrain].label} at (${selectedHex.q},${selectedHex.r}).`],
      }
    })
  },

  buyCard: (cardId, payWithGold) => {
    set(s => {
      const player = s.players[s.currentPlayerIndex]
      const cardIndex = s.marketCards.findIndex(c => c.id === cardId)
      if (cardIndex === -1) return s

      const card = s.marketCards[cardIndex]

      // Check market action available
      if (player.marketActionsRemaining <= 0) return s

      // Check class limit
      const cls = card.class as CardClass
      if (player.buildingTrack[cls] >= CLASS_LIMIT[cls]) return s

      // One building per owned region
      const ownedRegions = Object.values(s.regions).filter(r => r.owner === player.id).length
      if (player.activeCards.length >= ownedRegions) return s

      // Check affordability
      if (payWithGold) {
        if (player.gold < card.goldCost) return s
      } else {
        // Must satisfy ALL altCost items
        for (const item of card.altCost) {
          const resKeys = ['stone', 'wood', 'food']
          const comKeys = ['iron', 'paper', 'cloth', 'glass', 'wild']
          if (resKeys.includes(item.type)) {
            if (player.resources[item.type as keyof typeof player.resources] < item.amount) return s
          } else if (comKeys.includes(item.type)) {
            if (player.commodities[item.type as keyof typeof player.commodities] < item.amount) return s
          }
        }
      }

      // Deduct cost
      let newResources = { ...player.resources }
      let newCommodities = { ...player.commodities }
      let newGold = player.gold

      if (payWithGold) {
        newGold -= card.goldCost
      } else {
        for (const item of card.altCost) {
          const resKeys = ['stone', 'wood', 'food']
          if (resKeys.includes(item.type)) {
            newResources = {
              ...newResources,
              [item.type]: newResources[item.type as keyof typeof newResources] - item.amount,
            }
          } else {
            newCommodities = {
              ...newCommodities,
              [item.type]: newCommodities[item.type as keyof typeof newCommodities] - item.amount,
            }
          }
        }
      }

      // Apply track benefit at current position (before incrementing)
      const trackPos = player.buildingTrack[cls]
      const benefits = TRACK_BENEFITS[cls]
      const benefit = benefits[trackPos]

      let newAttackActionsPerTurn = player.attackActionsPerTurn
      let newAttackActionsRemaining = player.attackActionsRemaining
      let newMarketActionsPerTurn = player.marketActionsPerTurn
      let newMarketActionsRemaining = player.marketActionsRemaining
      let newVP = player.victoryPoints + card.vp

      if (benefit) {
        if (benefit.type === 'gold') {
          newGold += benefit.amount
        } else if (benefit.type === 'attackAction') {
          newAttackActionsPerTurn += benefit.amount
          newAttackActionsRemaining += benefit.amount
        } else if (benefit.type === 'marketAction') {
          newMarketActionsPerTurn += benefit.amount
          newMarketActionsRemaining += benefit.amount
        } else if (benefit.type === 'vp') {
          newVP += benefit.amount
        }
      }

      // Decrement market actions
      newMarketActionsRemaining -= 1

      // Build updated player
      const updatedPlayer: Player = {
        ...player,
        gold: newGold,
        resources: newResources,
        commodities: newCommodities,
        activeCards: [...player.activeCards, card],
        buildingTrack: { ...player.buildingTrack, [cls]: trackPos + 1 },
        attackActionsPerTurn: newAttackActionsPerTurn,
        attackActionsRemaining: newAttackActionsRemaining,
        marketActionsPerTurn: newMarketActionsPerTurn,
        marketActionsRemaining: newMarketActionsRemaining,
        victoryPoints: newVP,
      }

      // Leave slot empty until replenished
      const newMarketCards = [...s.marketCards] as (EmpireCard | null)[]
      newMarketCards[cardIndex] = null
      const newPlayers = s.players.map((p, i) =>
        i === s.currentPlayerIndex
          ? { ...updatedPlayer, incomeRate: calcIncomeRate(s.regions, p.id) }
          : p
      )
      return {
        players: newPlayers,
        marketCards: newMarketCards,
        log: [...s.log, `${player.name} bought ${card.name}.`],
      }
    })
  },

  replenishMarket: () => {
    set(s => {
      const player = s.players[s.currentPlayerIndex]
      if (player.marketActionsRemaining <= 0) return s

      const emptySlots = s.marketCards.filter(c => c === null).length
      if (emptySlots === 0) return s

      const cost = 2 + emptySlots
      if (player.gold < cost) return s

      const eraCards = s.marketDeck.filter(c => c.era === s.era)
      const otherCards = s.marketDeck.filter(c => c.era !== s.era)
      const newMarketCards = [...s.marketCards] as (EmpireCard | null)[]
      const deck = [...eraCards]

      for (let i = 0; i < newMarketCards.length; i++) {
        if (newMarketCards[i] === null && deck.length > 0) {
          newMarketCards[i] = deck.shift()!
        }
      }

      const newPlayers = s.players.map((p, i) => {
        if (i !== s.currentPlayerIndex) return p
        return { ...p, gold: p.gold - cost, marketActionsRemaining: p.marketActionsRemaining - 1 }
      })

      return {
        players: newPlayers,
        marketCards: newMarketCards,
        marketDeck: [...deck, ...otherCards],
        log: [...s.log, `${player.name} replenished market for ${cost}g.`],
      }
    })
  },

  endTurn: () => {
    set(s => {
      const player = s.players[s.currentPlayerIndex]
      const income = Math.max(0, player.incomeRate)
      const nextIndex = (s.currentPlayerIndex + 1) % s.players.length
      const isNewRound = nextIndex === 0
      const newRound = isNewRound ? s.round + 1 : s.round
      const newEra = newRound > 8 ? 3 : newRound > 4 ? 2 : 1
      const eraChanged = newEra !== s.era

      const newPlayers = s.players.map((p, i) => {
        const refreshed = {
          ...p,
          attackActionsRemaining: p.attackActionsPerTurn,
          marketActionsRemaining: p.marketActionsPerTurn,
        }
        // Collect income at end of own turn
        if (i === s.currentPlayerIndex) return { ...refreshed, gold: p.gold + income }
        return refreshed
      })

      const logs: string[] = [
        `${player.name} ended turn. (+${income} gold)`,
        ...(isNewRound ? [`── Round ${newRound} ──`] : []),
        ...(eraChanged ? [`══ Era ${newEra} begins! ══`] : []),
      ]

      // Resolve Revolt claims and refresh market when era changes; fill empty slots each round
      let newRegions = s.regions
      let newMarketCards = s.marketCards
      let newMarketDeck = s.marketDeck
      let newPendingClaims = s.pendingClaims
      if (eraChanged) {
        newRegions = { ...s.regions }
        // Transfer any revolted neutral tiles to claimants
        for (const [claimKey, claimantId] of Object.entries(s.pendingClaims)) {
          const tile = newRegions[claimKey]
          if (tile && tile.owner === null) {
            newRegions[claimKey] = { ...tile, owner: claimantId }
            const claimantName = s.players.find(p => p.id === claimantId)?.name ?? claimantId
            logs.push(`${claimantName} received ${TERRAIN[tile.terrain].label} (${tile.q},${tile.r}) via Revolt.`)
          }
        }
        newPendingClaims = {}

        const marketSize = newEra === 3 ? 5 : 4
        const eraCards = shuffleArray(s.marketDeck.filter(c => c.era === newEra))
        const otherCards = s.marketDeck.filter(c => c.era !== newEra)
        newMarketCards = eraCards.slice(0, marketSize)
        newMarketDeck = [...eraCards.slice(marketSize), ...otherCards]
      } else if (isNewRound) {
        // Fill empty slots from current era deck between rounds
        const eraCards = newMarketDeck.filter(c => c.era === s.era)
        const otherCards = newMarketDeck.filter(c => c.era !== s.era)
        const filled = [...newMarketCards] as (EmpireCard | null)[]
        const deck = [...eraCards]
        for (let i = 0; i < filled.length; i++) {
          if (filled[i] === null && deck.length > 0) {
            filled[i] = deck.shift()!
          }
        }
        newMarketCards = filled
        newMarketDeck = [...deck, ...otherCards]
      }

      // Recalculate income after any region changes
      const finalPlayers = newPlayers.map(p => ({
        ...p, incomeRate: calcIncomeRate(newRegions, p.id),
      }))

      return {
        regions: newRegions,
        players: finalPlayers,
        currentPlayerIndex: nextIndex,
        round: newRound,
        era: newEra,
        phase: 'action',
        selectedHex: null,
        attackSourceHex: null,
        conquestProgress: {},
        pendingClaims: newPendingClaims,
        lastCombat: null,
        log: [...s.log, ...logs],
        marketCards: newMarketCards,
        marketDeck: newMarketDeck,
      }
    })
  },
}))
