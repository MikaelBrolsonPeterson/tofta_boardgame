## ADDED Requirements

### Requirement: Actions are validated before execution
The app SHALL prevent a player from taking an action they cannot legally take: no attack without attack actions remaining, no market purchase without market actions remaining, no action on another player's turn.

#### Scenario: Player out of attack actions
- **WHEN** a player has 0 attack actions remaining
- **THEN** the Attack button is disabled

#### Scenario: Wrong player's turn
- **WHEN** it is not the current player's turn
- **THEN** action buttons are disabled for all other players

### Requirement: End turn advances to the next player and collects income
`endTurn` SHALL: collect income for the current player, advance `currentPlayerIndex`, reset actions for the next player, resolve any pending revolts, and advance the round when all players have taken their turn.

#### Scenario: Last player ends their turn
- **WHEN** the last player in a round ends their turn
- **THEN** the round counter increments, revolts resolve, and the first player's turn begins

#### Scenario: Income collection on end turn
- **WHEN** a player ends their turn
- **THEN** gold equal to their income rate is added to their treasury

### Requirement: Abandon region is a free action available any number of times per turn
A player SHALL be able to abandon any non-Capitol region they own at any point during their turn as a free action. Abandoning may affect connectivity and income rate.

#### Scenario: Abandoning a region
- **WHEN** a player abandons a region
- **THEN** it becomes independent immediately; income rate is recalculated; any marker on the region is destroyed
