## ADDED Requirements

### Requirement: Conquering a region costs one attack action
A player SHALL spend 1 attack action to attempt to conquer a region adjacent to one they control. Swamp costs 2 attack actions; Capitol costs 3. Multi-action costs are paid upfront and resolved as a single roll.

#### Scenario: Attacking a grassland
- **WHEN** a player spends 1 attack action on an adjacent grassland
- **THEN** a single combat roll is made to determine the outcome

#### Scenario: Attacking a Capitol
- **WHEN** a player spends 3 attack actions on an adjacent Capitol
- **THEN** a single combat roll is made; if it fails, revolt applies as normal

### Requirement: Strength determines conquest outcome
Strength SHALL be the sum of: player base strength (offensive or defensive) + region bonuses + modifier deck draw + empire card bonuses. If attacker strength exceeds defender strength, the attacker wins.

#### Scenario: Attacker wins
- **WHEN** attacker total strength is strictly greater than defender total strength
- **THEN** the attacker takes control of the region

#### Scenario: Tie goes to the defender
- **WHEN** attacker and defender have equal total strength
- **THEN** the defender wins; the contested region goes into revolt against the defender

### Requirement: Failed conquest of an independent region results in revolt
When a player's attack on an independent region fails (including Fail card), the player SHALL still conquer the region but it revolts: no taxation, no marker placement, cannot attack from it. Revolt clears at the start of that player's next turn.

#### Scenario: Revolting region at start of next turn
- **WHEN** a player begins their turn with a revolting region
- **THEN** the revolt is cleared and the region operates normally

#### Scenario: Attacking a revolting region
- **WHEN** any player attacks a revolting region
- **THEN** the attacker gains +1 to their attack strength

### Requirement: Failed conquest of a player region has no revolt fallback
When a player's attack on another player's region fails, the region does not change hands and no revolt occurs.

#### Scenario: Failed player-vs-player attack
- **WHEN** an attacker's strength does not exceed a defending player's strength
- **THEN** the defender retains the region with no revolt

### Requirement: Personal modifier deck has a defined starting composition
Each player's personal modifier deck SHALL contain: 1× Fail (reshuffle), 1× −2, 2× −1, 4× 0, 2× +1, 1× +2, 1× Success (reshuffle). Fail and Success cards cannot be culled.

#### Scenario: Drawing Fail from personal deck
- **WHEN** a player draws Fail from their personal modifier deck
- **THEN** the attack fails immediately and the deck (remaining + discard + Fail card) is reshuffled

#### Scenario: Drawing Success from personal deck
- **WHEN** a player draws Success from their personal modifier deck
- **THEN** the attack succeeds immediately and the deck is reshuffled

### Requirement: Independent region modifier deck has Fail but no Success
The shared independent state modifier deck SHALL contain: 1× Fail (reshuffle), 1× −2, 2× −1, 4× 0, 2× +1, 1× +2. It has no Success card. It is reshuffled fresh for every attack against an independent region.

#### Scenario: Drawing Fail against an independent region
- **WHEN** Fail is drawn from the independent deck
- **THEN** the attack fails (revolt applies) and the independent deck reshuffles

### Requirement: Advantage and disadvantage each draw two modifier cards
- **Advantage**: Draw two cards, keep the best. Ignore Fail (pick the other); if both Fail, attack fails.
- **Disadvantage**: Draw two cards, keep the worst. Ignore Success (pick the other); if both Success, attack succeeds.
- In both cases, if Fail or Success appears among the drawn cards, reshuffle the deck immediately.

#### Scenario: Advantage draws one Fail and one +2
- **WHEN** a player with advantage draws Fail and +2
- **THEN** +2 is used, Fail is ignored, and the deck reshuffles

#### Scenario: Disadvantage draws two Success cards
- **WHEN** a player with disadvantage draws two Success cards
- **THEN** the attack succeeds and the deck reshuffles

### Requirement: Conquest of a player region destroys the production marker
When a player conquers another player's region, any production marker on the region SHALL be destroyed. The defender's empire card remains active; they may replant the marker later.

#### Scenario: Conquest with active production marker
- **WHEN** an attacker conquers a region with a production marker
- **THEN** the production marker is removed; the losing player's empire card stays on their mat

### Requirement: Conqueror takes up to 2 resources on conquest
When conquering a player region, the attacker SHALL take up to 2 resources from the region's stockpile. Commodities on the region are lost.

#### Scenario: Region has 3 resources and 2 commodities
- **WHEN** a player conquers such a region
- **THEN** the attacker takes 2 resources; the remaining resource and all commodities are lost
