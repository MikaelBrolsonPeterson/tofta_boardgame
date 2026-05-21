## ADDED Requirements

### Requirement: Game tracks current round and era
The store SHALL maintain `round` (1–15) and `era` (1–3). Era is derived from round: rounds 1–5 = Era I, 6–10 = Era II, 11–15 = Era III.

#### Scenario: Round 5 → round 6
- **WHEN** the last player ends their turn on round 5
- **THEN** round advances to 6, era advances to 2, and the era transition logic fires

### Requirement: Base actions scale with era
At the start of each player's turn, base attack and market actions SHALL be set according to the current era: Era I = 1 each, Era II = 2 each, Era III = 3 each. Building track and card bonuses are added on top.

#### Scenario: Player turn in Era II with no track bonuses
- **WHEN** it is a player's turn in Era II
- **THEN** they have exactly 2 attack actions and 2 market actions

### Requirement: Era transition clears the market and resets era effects
At an era transition, the app SHALL: remove unsold cards from the market, populate with new era cards, recalculate income rates, and reset card rotation state (era effects replenished).

#### Scenario: Era I → Era II transition
- **WHEN** era transitions from I to II
- **THEN** market is cleared and refilled with Era II cards; all rotated empire cards are flipped upright

### Requirement: InfoPanel shows current round and era
The InfoPanel SHALL always display the current round number and era.

#### Scenario: Round 7
- **WHEN** the game is on round 7
- **THEN** InfoPanel shows "Round 7 — Era II"
