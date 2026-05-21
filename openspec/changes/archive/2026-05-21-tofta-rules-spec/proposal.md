## Why

The Tofta board game rules exist as a single large markdown file (`rules.md`) with no formal structure for tracking capabilities, requirements, or design decisions. Formalising the rules as OpenSpec specs makes it easier to propose, review, and validate rule changes — especially as card design and playtesting introduce ongoing updates.

## What Changes

- Capture the full ruleset as structured capability specs
- Covers: game structure, player empire mat and building tracks, marker system, conquest and combat, market and cards, trading, scoring, and comeback mechanics
- No rules are being changed — this is a documentation and structure pass only

## Capabilities

### New Capabilities

- `game-structure`: Game overview, player count, eras, rounds, player order
- `empire-mat`: Player mat, active card slots, building track system, track bonuses
- `marker-system`: Military markers and production markers — placement, era-based removal, conquest behaviour, defender priority
- `conquest-and-combat`: Attack actions, strength resolution, modifier decks, advantage/disadvantage, revolt, ties
- `regions-and-map`: Region types, terrain effects, connectivity, taxation, upkeep, scaling upkeep
- `resources-and-commodities`: Resources (accumulate), commodities (spent each round), stockpiles, trading, bank conversion
- `market-and-cards`: Market slots, empire cards, action cards, card classes, draft/cull, modifier draw pile, VP purchase
- `scoring`: Milestones, awards, final scoring, capitol capture, VP purchase
- `comeback-mechanic`: Catch-up deck, last-place determination

### Modified Capabilities

## Impact

- `rules.md` remains the human-readable source of truth; specs are the structured reference layer
- Future card design and rule change proposals should reference these capability specs
