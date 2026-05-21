## ADDED Requirements

### Requirement: Attack is initiated from an owned region
`initiateAttack` SHALL validate that the current player owns the source region and has at least 1 attack action remaining, then set the app phase to `select-attack-target`.

#### Scenario: Valid attack initiation
- **WHEN** a player clicks Attack on a region they own with actions remaining
- **THEN** the phase changes to `select-attack-target` and valid targets are highlighted

#### Scenario: No attack actions remaining
- **WHEN** a player has 0 attack actions remaining
- **THEN** the Attack button is disabled and `initiateAttack` cannot be called

### Requirement: Combat resolves by comparing attacker and defender strength
`executeAttack` SHALL draw from the attacker's personal modifier deck, add terrain defense bonuses for the defender, and compare totals. Attacker wins if their total strictly exceeds the defender's.

#### Scenario: Attacker strength exceeds defender
- **WHEN** attacker total > defender total
- **THEN** the attacker takes control of the region and the combat result is logged

#### Scenario: Tie
- **WHEN** attacker total equals defender total
- **THEN** the defender retains the region; the region enters revolt against the defender

### Requirement: Fail and Success cards trigger immediate deck reshuffle
When Fail or Success is drawn from a player's personal modifier deck, the deck SHALL be immediately reshuffled (remaining deck + discard + drawn card all shuffled together).

#### Scenario: Fail drawn during combat
- **WHEN** the Fail card is drawn
- **THEN** the attack fails immediately and the personal modifier deck reshuffles

### Requirement: Independent regions use a shared deck with Fail but no Success
Attacks on independent (unowned) regions SHALL draw from the shared independent state deck, which is reshuffled fresh for each attack and contains a Fail card but no Success card.

#### Scenario: Attacking an independent region
- **WHEN** a player attacks an unowned region
- **THEN** the independent deck is used for the defender's draw; a fresh shuffle occurs before the draw

### Requirement: Failed attack on independent region results in revolt
When an attack on an independent region fails, the attacker SHALL still claim the region but it enters revolt: no taxation, cannot attack from it, markers cannot be placed. Revolt clears at the start of the player's next turn.

#### Scenario: Failed attack on grassland
- **WHEN** a player's attack on an independent grassland fails
- **THEN** a pending claim is created; the region shows as revolting

### Requirement: Combat result is stored and logged
After every attack, `lastCombat` SHALL be updated with the roll values, terrain bonus, outcome, and region. The event SHALL be appended to the game log.

#### Scenario: Combat log entry
- **WHEN** combat resolves
- **THEN** a log entry appears describing the attacker, target, roll values, and outcome
