## ADDED Requirements

### Requirement: All significant game events are appended to the log
The store SHALL append a timestamped entry to `log` for every significant event: combat (with roll values and outcome), conquest, revolt, region abandonment, card purchase, era transition, income collection.

#### Scenario: Combat event logged
- **WHEN** combat resolves
- **THEN** a log entry is added showing attacker, defender, region name, roll values, and outcome (success/failure/revolt)

#### Scenario: Era transition logged
- **WHEN** an era transition occurs
- **THEN** a log entry records the new era number

### Requirement: GameLog component displays events in reverse chronological order
The GameLog component SHALL display log entries with the most recent at the top, scrollable, so the player can see what just happened without scrolling.

#### Scenario: New event added
- **WHEN** a new log entry is appended
- **THEN** it appears at the top of the GameLog panel

### Requirement: Log entries are readable without game knowledge
Each log entry SHALL use plain language that identifies the players, regions, and outcomes involved — not internal IDs or codes.

#### Scenario: Combat log readability
- **WHEN** Player 1 attacks Region "Forest-3" and wins
- **THEN** the log reads something like "Player 1 conquered Forest-3 (roll: +2 vs 0)"
