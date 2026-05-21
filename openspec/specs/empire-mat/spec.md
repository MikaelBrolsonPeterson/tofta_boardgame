## ADDED Requirements

### Requirement: Active card slots expand each era
Each player's empire mat SHALL have 3 active card slots in Era I, 4 in Era II, and 5 in Era III. A player may not have more empire cards on their mat than their current slot count.

#### Scenario: Buying a card when slots are full
- **WHEN** a player has 3 active cards in Era I and wants to buy a new one
- **THEN** the player MUST discard an existing card first, then buy the new one

#### Scenario: Slot expansion at era transition
- **WHEN** Era II begins
- **THEN** each player gains a fourth active card slot

### Requirement: Each card class has a building track with 4 slots (Wonders: 3)
The empire mat SHALL have a building track for each card class: Military, Market, Science, and Misc each with 4 slots; Wonders with 3 slots. Each slot begins covered by a cube. Placing a marker moves a cube from the track to the board, permanently unlocking that tier's bonus.

#### Scenario: First Military marker placed
- **WHEN** a player places their first Military class marker
- **THEN** the first cube moves from the Military track to the board, unlocking the Tier 1 bonus (+1 attack action per round)

#### Scenario: Track bonus is permanent
- **WHEN** a building track cube is moved to the board
- **THEN** the corresponding bonus is unlocked permanently for the rest of the game, even if the card or marker is later removed

### Requirement: Building track bonuses are defined per class
Track bonuses SHALL be cumulative and permanent once unlocked:

- Military / Misc: Tier 1 = +1 attack action/round; Tier 2 = +3 gold; Tier 3 = +2nd attack action/round; Tier 4 = +5 VP
- Market / Science: Tier 1 = +1 market action/round; Tier 2 = +3 gold; Tier 3 = +2nd market action/round; Tier 4 = +5 VP
- Wonders: Tier 1 = +2 VP; Tier 2 = +4 VP; Tier 3 = +7 VP

#### Scenario: Wonders track advances on card purchase
- **WHEN** a player buys a Wonder card
- **THEN** the Wonders track advances immediately, without requiring marker placement

#### Scenario: All other tracks advance on marker placement
- **WHEN** a player places a Military, Market, Science, or Misc class marker
- **THEN** the corresponding track advances

### Requirement: Class purchase limit is 4 (Wonders: 3)
A player SHALL buy at most 4 cards of any single non-Wonder class and at most 3 Wonder cards over the entire game.

#### Scenario: Attempting a 5th Military card
- **WHEN** a player already has 4 Military cards purchased (across the whole game)
- **THEN** they may not buy another Military card
