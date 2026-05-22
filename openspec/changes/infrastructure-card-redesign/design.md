## Design

### Infrastructure Token Flow

1. Player spends 1 market action
2. Player pays the gold cost of a chosen token from the class pool (higher tiers cost more)
3. Player places the token on an eligible region (must be a region they control)
4. The building track for that class advances one step
5. If the new track position has a bonus tier, that bonus unlocks permanently for the player

Empire cards of the same class are NOT required to place tokens. Owning a Military card does not gate Military token placement.

### Token Pool Structure

Each class (Military, Market, Science, Wonders, Misc) has a pool of tokens at variable costs. Suggested cost bands:

| Tier | Cost |
|------|------|
| 1    | 2g   |
| 2    | 4g   |
| 3    | 6g   |

Exact costs and tier counts to be determined during card/token design phase.

### Building Track Bonuses

Tracks have predetermined bonuses per tier (printed on the track). Unlocks are permanent — tokens being removed later does not revoke bonuses. Bonuses are the same for all players (no asymmetry on the track itself).

Suggested bonus types: extra action (attack or market), gold income, VP at game end.

### Empire Card Action Cost Notation

Each empire card has a cost field that must state one of:
- `market action` — costs a market action to activate
- `attack action` — costs an attack action to activate
- `either` — player chooses which action to spend; card may produce different effects per action type (dual-action card)

### Dual-Action Cards

A dual-action card lists two effect blocks:
- **Market:** [effect when market action is spent]
- **Attack:** [effect when attack action is spent]

Example: The Era I/II infrastructure card reads:
- **Market:** Place a Military infrastructure token as normal
- **Attack:** Place a Military infrastructure token (uses attack action instead of market action)

Another dual-action example (Raid):
- **Market:** Gain resources from a bordering region
- **Attack:** Gain resources from a bordering region

### VP Purchase Removal from Baseline

The 3-commodity → VP conversion is removed from the baseline market action set. Instead:
- Era III contains one VP conversion card per commodity type (iron, paper, cloth, glass)
- Holding the card unlocks commodity → VP conversion as a market action
- This makes Era III card acquisition a strategic race

### Market Action Economy Summary

| Action | Baseline | Requires Card |
|--------|----------|---------------|
| Buy empire card | Yes | No |
| Place infrastructure token | Yes | No |
| Bank conversion (4:1 resources) | Yes | No |
| Trading with other players | No | Yes |
| Draft (draw from deck) | No | Yes |
| Cull (remove from mat) | No | Yes |
| VP purchase | No | Yes (Era III) |
| Resource → commodity enrichment | No | Yes (Era II Market) |

### Marker Permanence

- Default: Military markers removed on conquest
- Permanent markers: marked with a symbol on the token; survive conquest; inheritable by new owner
- Permanent markers are rotatable and upgradable via era cards
- Anyone may upgrade anyone's permanent marker (tactical/cooperative use case)
- Era-based removal is eliminated; timing is purely conquest-driven

### Defender Rearrange

When a player-owned region with a production marker is conquered:
1. Game enters `defender-rearrange` phase
2. Defender may move one production marker to any other region they own
3. Defender confirms or skips
4. Conquest executes: ownership transfers; standard military markers removed; permanent markers stay

### Raid Card

- Class: Military, Era II or III
- Activation: either attack action or market action (dual-action)
- Target: must border a region the player controls
- Effect: gain resources from target region (specific amount on card)
- Does NOT require the raided region to be conquered

### Era III Military Cards

At least one card should trigger on a modifier draw result (e.g., opponent draws Fail → you gain a bonus). These cards create incentive to build a strong modifier deck while countering pure VP-engine strategies.
