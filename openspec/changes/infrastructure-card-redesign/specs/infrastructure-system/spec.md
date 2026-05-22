## ADDED Requirements

### Requirement: Building track unlocks hex markers; empire cards give effects only
The building track SHALL be the mechanism by which players unlock the right to place hex markers. Empire cards SHALL NOT grant placement rights — they give effects, production markers, and abilities only.

#### Scenario: Player buys a Military empire card
- **WHEN** a player buys a Military empire card
- **THEN** the card goes on their empire mat and its effect activates; no placement right is granted

### Requirement: Infrastructure tokens are chosen from a class pool at variable costs
Each class SHALL have a pool of infrastructure tokens at variable costs. Higher-tier tokens cost more. Players choose which token to place; the track does not dictate the specific token, only the tier available.

#### Scenario: Player places a Military token
- **WHEN** a player spends 1 market action and pays a token's gold cost
- **THEN** they choose a token from the Military class pool, place it on an eligible region, and the Military track advances one step

### Requirement: Track advancement unlocks a fixed bonus regardless of which token was placed
Advancing the track SHALL unlock the next tier bonus (action, gold, or VP) regardless of which specific token was placed. The bonus is predetermined and the same for all players.

#### Scenario: Third Military token placed
- **WHEN** a player places their third Military token
- **THEN** the Military track advances to tier 3 and its predetermined bonus unlocks permanently

### Requirement: Attack actions can substitute for market actions when placing military infrastructure via a specific card
A card (Era I or II) SHALL allow a player to spend an attack action instead of a market action when placing military infrastructure tokens.

#### Scenario: Player uses attack action for military build
- **WHEN** a player has the relevant card on their mat and spends an attack action
- **THEN** they may place a military infrastructure token as if they had spent a market action

### Requirement: Bank conversion is always available at a 4:1 rate
Any player MAY spend 1 market action to convert 4 identical resources into 1 resource of any type. This is the only baseline conversion available without a card.

#### Scenario: Converting 4 Stone to Wood
- **WHEN** a player spends 1 market action and removes 4 Stone
- **THEN** they receive 1 Wood
