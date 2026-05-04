import { create } from 'zustand'
import type { GameState, Player, PlayerId, CombatResult } from '../types/game'
import { buildInitialMap } from '../data/initialMap'
import { BASE_DECK, shuffle, drawOne, modifierToNumber } from '../data/modifierDeck'
import { TERRAIN } from '../data/terrainConfig'
import { getNeighbors, hexKey, isAdjacent } from '../utils/hex'

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
}

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
      : drawOne(shuffle([...BASE_DECK]), [])

    const atkVal = modifierToNumber(atk.card)
    const defVal = modifierToNumber(defSrc.card)
    const atkTotal = 1 + atkVal
    const defTotal = 1 + cfg.defenseBonus + defVal

    const success = atk.card !== 'fail' && (atk.card === 'success' || atkTotal > defTotal)

    // On fail, reshuffle attacker deck
    const finalAtkDeck = atk.card === 'fail' ? shuffle([...BASE_DECK]) : atk.deck
    const finalAtkDiscard = atk.card === 'fail' ? [] : atk.discard

    const combatResult: CombatResult = {
      attackerRoll: atk.card,
      defenderRoll: defSrc.card,
      attackerTotal: atkTotal,
      defenderTotal: defTotal,
      success,
      message: success ? `Attack succeeded! (${atkTotal} vs ${defTotal})` : `Attack failed. (${atkTotal} vs ${defTotal})`,
    }

    const key = hexKey(toQ, toR)
    const required = cfg.attacksToConquer
    const progress = (conquestProgress[key] ?? 0) + (success ? 1 : 0)
    const conquered = success && progress >= required

    set(s => {
      const newRegions = { ...s.regions }
      const newProgress = { ...s.conquestProgress }

      if (conquered) {
        newRegions[key] = { ...target, owner: attacker.id }
        delete newProgress[key]
      } else if (success) {
        newProgress[key] = progress
      } else {
        delete newProgress[key]
      }

      // Failed vs independent: gain half taxation
      let goldBonus = 0
      if (!success && !target.owner) goldBonus = Math.ceil(cfg.taxation / 2)

      const newPlayers = s.players.map(p => {
        if (p.id === attacker.id) {
          return {
            ...p,
            gold: p.gold + goldBonus,
            attackActionsRemaining: p.attackActionsRemaining - 1,
            modifierDeck: finalAtkDeck,
            modifierDiscard: finalAtkDiscard,
          }
        }
        if (defenderPlayer && p.id === defenderPlayer.id) {
          return { ...p, modifierDeck: defSrc.deck, modifierDiscard: defSrc.discard }
        }
        return p
      })

      const finalPlayers = newPlayers.map(p => ({
        ...p, incomeRate: calcIncomeRate(newRegions, p.id),
      }))

      const progressNote = !conquered && success ? ` (${progress}/${required})` : ''
      const logEntry = `${attacker.name} → ${cfg.label} (${toQ},${toR}): ${combatResult.message}${progressNote}`

      return {
        regions: newRegions,
        players: finalPlayers,
        conquestProgress: newProgress,
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

  endTurn: () => {
    set(s => {
      const player = s.players[s.currentPlayerIndex]
      const income = Math.max(0, player.incomeRate)
      const nextIndex = (s.currentPlayerIndex + 1) % s.players.length
      const isNewRound = nextIndex === 0
      const newRound = isNewRound ? s.round + 1 : s.round
      const newEra = newRound > 8 ? 3 : newRound > 4 ? 2 : 1

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
        ...(newEra !== s.era ? [`══ Era ${newEra} begins! ══`] : []),
      ]

      return {
        players: newPlayers,
        currentPlayerIndex: nextIndex,
        round: newRound,
        era: newEra,
        phase: 'action',
        selectedHex: null,
        attackSourceHex: null,
        conquestProgress: {},
        lastCombat: null,
        log: [...s.log, ...logs],
      }
    })
  },
}))
