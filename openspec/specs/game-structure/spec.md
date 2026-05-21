## ADDED Requirements

### Requirement: Game is played over 15 rounds divided into 3 eras
The game SHALL consist of 15 rounds, divided into 3 eras of 5 rounds each. Era I covers rounds 1–5, Era II rounds 6–10, Era III rounds 11–15.

#### Scenario: Era transition at round 5
- **WHEN** round 5 ends
- **THEN** the game transitions to Era II: unpurchased Era I cards are removed, the market is populated with Era II cards, income rates are recalculated, and military markers placed in Era I are removed

#### Scenario: Era transition at round 10
- **WHEN** round 10 ends
- **THEN** the game transitions to Era III in the same manner as the Era I→II transition

#### Scenario: Game end after round 15
- **WHEN** round 15 ends
- **THEN** full final scoring takes place and the player with the most VP wins

### Requirement: Player count is 2–5
The game SHALL support 2 to 5 players.

#### Scenario: Valid player count
- **WHEN** the game is set up with 2–5 players
- **THEN** the game proceeds normally

### Requirement: Each player starts with defined resources
Each player SHALL begin the game with 5 gold, 1 Capitol region (taxation 4, upkeep 1), and 1 adjacent grassland region (taxation 3, upkeep 1), giving a starting income rate of 5 gold per round.

#### Scenario: Starting income calculation
- **WHEN** the game begins
- **THEN** each player's income rate equals 5 gold (taxation 7 − upkeep 2)

### Requirement: Player turn order rotates each round
The first player marker SHALL pass clockwise after each round. Within a round, turns proceed counterclockwise from the marker holder.

#### Scenario: Turn order in round 1
- **WHEN** round 1 begins with player A holding the first player marker
- **THEN** player A takes the last turn of round 1; the player to A's right takes the first turn

### Requirement: Base actions scale by era
Each player SHALL have 1 attack action and 1 market action per turn in Era I, 2 of each in Era II, and 3 of each in Era III. Additional actions can be gained from empire cards and building tracks.

#### Scenario: Era I base actions
- **WHEN** it is a player's turn in Era I
- **THEN** they have 1 attack action and 1 market action before any card bonuses

#### Scenario: Era III base actions
- **WHEN** it is a player's turn in Era III
- **THEN** they have 3 attack actions and 3 market actions before any card bonuses
