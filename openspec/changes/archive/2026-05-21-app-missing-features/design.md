## Context

Three rule changes are settled but missing from the app: commodity clearing at round end, standard VP purchase, and the marker system. The app uses a Zustand store as single source of truth. The marker system requires a new game phase (`defender-rearrange`) to allow the defending player to move production markers before a conquest resolves.

## Goals / Non-Goals

**Goals:** Implement commodity clearing, VP purchase, and the full marker system including defender rearrange.

**Non-Goals:** Building placement UI (cards still auto-describe placement; the full placement action flow is a future change).

## Decisions

**Marker state lives on HexRegion**
`militaryMarker` and `productionMarker` replace the existing `building` field on `HexRegion`. Each is a `Marker | null` object with a label and the era it was placed in.

**Defender rearrange is a new game phase**
When an attack succeeds against a player region, the state transitions to `defender-rearrange` instead of immediately executing conquest. The pending conquest is stored in state. The defender clicks their production markers to move them, then confirms. Only then does conquest execute.

**VP purchase is a store action gated by commodity count**
`purchaseVP(commodity)` validates market actions > 0 and commodity count >= 3, deducts 3 of that commodity, awards 3 VP. The UI shows one button per commodity type the player can afford.

**Military markers cleared at era transition**
In `endTurn`, when `eraChanged`, all `militaryMarker` fields on all regions are set to null.

**Commodities cleared at new round**
In `endTurn`, when `isNewRound`, all player commodity objects are reset to zero.

## Risks / Trade-offs

- **Defender rearrange adds UI complexity** → Mitigated by a clear phase label and simple click-to-move UX. Cancel is not needed — defender must confirm to proceed.
- **building field removal is breaking** → `initialMap.ts` and any reference to `region.building` must be updated simultaneously.

## Open Questions

- Marker placement via UI (moving cubes off the building track) is not yet designed — deferred.
