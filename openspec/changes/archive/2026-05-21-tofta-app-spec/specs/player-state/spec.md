## ADDED Requirements

### Requirement: Each player has a defined state structure
Each player entry in the store SHALL contain: id, name, colour, gold, resources (Stone/Wood/Food), commodities (Iron/Paper/Cloth/Glass/Wild), VP, attack actions remaining, market actions remaining, modifier deck, modifier discard pile, active empire cards, and building track positions per class.

#### Scenario: Player state on game start
- **WHEN** the game initialises
- **THEN** each player starts with 5 gold, 0 resources, 0 commodities, 0 VP, and a standard modifier deck

### Requirement: PlayerPanel displays current player state
The PlayerPanel SHALL display the current player's gold, resources, commodities, VP, income rate, and remaining action counts.

#### Scenario: Player buys a card
- **WHEN** a card purchase reduces a player's gold
- **THEN** the PlayerPanel updates immediately to show the new gold total

### Requirement: Income is collected at end of turn
At `endTurn`, each player SHALL receive income equal to total taxation of connected regions minus total upkeep. Income rate is recalculated dynamically.

#### Scenario: Player ends turn with 3 connected regions
- **WHEN** a player ends their turn with total taxation 8 and upkeep 3
- **THEN** they receive 5 gold

### Requirement: Commodities are cleared at end of round
At the end of each round, all commodity stockpiles SHALL be reset to 0 for all players. Resources are not cleared.

#### Scenario: Unspent Iron at round end
- **WHEN** a round ends and a player has unspent Iron
- **THEN** their Iron count returns to 0; their Stone/Wood/Food totals are unchanged

### Requirement: Active empire cards are tracked per player
Each player's active empire cards SHALL be stored and their effects applied. The player's active card count SHALL not exceed the era's slot limit (3/4/5).

#### Scenario: Player at slot limit tries to buy
- **WHEN** a player has 3 active cards in Era I
- **THEN** the buy action requires discarding a card first (or is blocked until a slot is free)
