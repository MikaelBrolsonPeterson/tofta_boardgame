## ADDED Requirements

### Requirement: Final scoring counts regions, card VP, milestones, and awards
At the end of Era 3, final scoring SHALL tally: 1 VP per controlled region + printed VP on empire cards + milestone VP + award VP + any other card-specified VP.

#### Scenario: Player controls 5 regions and has a 2 VP Wonder
- **WHEN** final scoring occurs
- **THEN** that player scores at least 7 VP from regions and the Wonder card

### Requirement: Milestones award 5 VP to the first player to meet the condition
Each milestone SHALL be claimable only once, by the first player to meet its condition. Once claimed, no other player can claim it.

| Milestone | Condition |
|-----------|-----------|
| Ruins Explorer | Conquer an Ancient Ruins region |
| Prosperous Empire | Reach an income rate of 10 |
| Developed Lands | Have 3 regions of the same terrain type with markers |
| Master of a Class | First to max out any single class track |

#### Scenario: Two players could claim Ruins Explorer simultaneously
- **WHEN** two players conquer an Ancient Ruins in the same round
- **THEN** the player who acted earlier in the turn order claims the milestone

### Requirement: Awards are funded during play and scored at the end
Any player MAY fund an award during the game for 1 market action + 3 gold. At final scoring, the leader in a funded award category scores 5 VP; the runner-up scores 2 VP. Unfunded awards are not scored.

| Award | Scored by |
|-------|-----------|
| Treasure Hoard | Most gold in treasury |
| Prosperous Realm | Highest income rate |
| Renaissance Empire | Most total building track steps across all classes |
| Grand Architect | Empire cards with highest combined cost |
| Industrial Power | Most commodities produced per round |

#### Scenario: Unfunded award at game end
- **WHEN** no player has funded the Treasure Hoard award
- **THEN** no VP are awarded for gold at end of game

#### Scenario: Award with only one player eligible
- **WHEN** only one player has a score in a funded award category
- **THEN** that player scores 5 VP; no runner-up VP is awarded

### Requirement: Capitol capture ends the game at close of that round
When a player captures an opponent's Capitol, the current round SHALL play out to its end. The captor gains +5 VP. If the Capitol is recaptured before the round ends, the game continues normally.

#### Scenario: Capitol captured mid-round
- **WHEN** a player captures an opponent's Capitol on their turn
- **THEN** remaining players still take their turns this round; the game ends if the Capitol is still captured at round end

#### Scenario: Capitol recaptured before round end
- **WHEN** a subsequent player recaptures the Capitol in the same round
- **THEN** the game does not end and continues normally; no +5 VP is awarded
