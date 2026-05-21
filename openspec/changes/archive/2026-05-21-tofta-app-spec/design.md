## Context

The Tofta browser prototype is a React/TypeScript/Vite/Tailwind app with a Zustand store (`gameStore.ts`). It was built incrementally alongside the rules and reflects most but not all of the current rule set. The marker system redesign, commodity non-accumulation rule, and standard VP purchase are recent rule changes not yet implemented in the app.

## Goals / Non-Goals

**Goals:**
- Document what the app currently does as structured specs
- Make gaps between the rules spec and app spec visible
- Give a clear baseline for future implementation sessions

**Non-Goals:**
- Implementing missing features (separate change proposals)
- Speccing game AI or multiplayer networking
- Performance optimisation

## Decisions

**Separate spec from the rules spec**
The app spec describes what the software does; the rules spec describes what the game does. They reference each other but are distinct — a rule change proposal modifies the rules spec, then triggers an app change proposal to implement it.

**Zustand store is the single source of truth**
All game state lives in `gameStore.ts`. Components read from the store and dispatch actions; they hold no local game state. This makes the spec component-agnostic — the spec describes store behaviour, not React rendering details.

**Specs describe observable behaviour, not implementation**
Scenarios are written in terms of user actions and visible outcomes, not internal store mutations. This keeps the specs stable as the implementation evolves.

## Risks / Trade-offs

- **App lags behind rules** → Known gap. The marker system, commodity clearing, and VP purchase are not yet in the app. These will each be separate change proposals.
- **Specs may not match current code exactly** → This is a documentation pass based on observed behaviour. Discrepancies should be resolved when implementing future changes.

## Open Questions

- Should the app support more than 2 players in the UI? Currently optimised for 2-player playtesting.
- Marker system implementation: military and production markers need new visual components and store state.
- Commodity clearing at round end: needs to be added to `endTurn` logic.
- Standard VP purchase: needs a UI action and store handler.
