## Why

The browser prototype (`app/`) is a playtesting aid for Tofta with no formal spec. As the game rules evolve (marker system, commodity changes, VP purchase, new cards), the app needs to keep pace. Without a spec, it's unclear which rules are implemented, which are missing, and what the app is actually supposed to do. Formalising it as capability specs makes gaps visible and gives a clear target for each implementation session.

## What Changes

- Capture the current app as structured capability specs
- Covers: hex map rendering, combat system, market and card buying, player state, building track, era/round management, turn management, game log
- No code is changed — this is a documentation pass

## Capabilities

### New Capabilities

- `hex-map`: Hex grid rendering, tile selection, terrain display, ownership colours, attack targeting highlights
- `combat-system`: Attack initiation, modifier deck draws, strength resolution, conquest progress, revolt mechanic, advantage/disadvantage
- `market`: Market slot display, card purchase, slot refill, era deck management
- `player-state`: Per-player gold, resources, commodities, VP, action counts, modifier deck, active empire cards
- `building-track`: Per-class track progression, bonus unlocking, visual display
- `era-and-round`: Round and era advancement, era transition logic, base action scaling
- `turn-management`: Action execution order, end-of-turn income, action validation
- `game-log`: Event logging, combat results, conquest and revolt messages

### Modified Capabilities

## Impact

- `app/src/` — all components and the Zustand store are in scope
- Future rule-change proposals (e.g. marker system, commodity rules) should reference these specs when updating the app
