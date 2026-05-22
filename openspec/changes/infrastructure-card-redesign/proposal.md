## Why

The current system ties hex marker placement to empire card ownership, making cards do double duty (effect + placement right) and leaving the building track as a passive bonus tracker. Playtesting revealed the cards feel flat and the market action economy is too diffuse. This change makes infrastructure placement and empire cards the two central market actions, frees cards to have richer effects, and restructures the action economy around meaningful choices.

## What Changes

- **Infrastructure system (Option A):** Building track tiers unlock hex markers; empire cards give effects only — no placement rights
- **Marker permanence:** Military markers removed on conquest by default; permanent markers (symbol on token) survive conquest and are rotatable; era-based removal dropped
- **Marker upgrades:** Permanent markers upgradable via era cards; anyone can upgrade anyone's marker
- **Variable infrastructure costs:** Tokens chosen from class pool at variable costs; higher tiers cost more
- **Market action economy restructured:** Two central actions (buy card, place infrastructure); bank conversion kept at 4:1 baseline; trading/Draft/Cull/VP purchase fully card-gated
- **Card action costs explicit:** Each card states which action it costs; some cards have dual results based on which action is spent
- **Enrichment cards added:** Resource → commodity conversion (Market class, Era II)
- **Era III VP conversion cards:** One per commodity type; VP purchase fully moved out of baseline
- **Era III military cards:** Counter VP engine; trigger on combat draw results; Raid card added
- **Era I/II infrastructure card:** Allows attack action to be spent when placing military infrastructure

## Capabilities

### New Capabilities

- `infrastructure-system`: Token pool, tier costs, track-as-bonus-progression, build action

### Modified Capabilities

- `marker-system`: Permanent markers, conquest removal, upgrade mechanic, era-based removal dropped
- `market-and-cards`: Economy restructured; trading, Draft/Cull, VP purchase card-gated; dual-action cards; enrichment cards
- `empire-mat`: Track no longer tied to card ownership; purely bonus progression
- `scoring`: VP purchase removed from baseline; Era III conversion cards added
- `combat-system`: Raid card; dual-action card mechanic in combat context

## Impact

- `rules.md` — significant rewrite of Buildings/Markers, Market, Empire Cards, and card tables sections
- Existing card table entries need review — many cards are remnants of the old placement system
- App will need follow-up change to implement infrastructure system
