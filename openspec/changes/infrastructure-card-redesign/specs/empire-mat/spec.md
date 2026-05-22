## MODIFIED Requirements

### Requirement: Building track is decoupled from empire card ownership
The building track SHALL advance when an infrastructure token is placed, independent of which empire cards the player holds. A player does not need an empire card of a given class to place tokens or advance that class's track.

#### Scenario: Player advances Military track without a Military card
- **WHEN** a player places a Military infrastructure token
- **THEN** the Military track advances one step regardless of whether the player has any Military empire cards

### Requirement: Empire cards give effects, production markers, and abilities only
Empire cards SHALL NOT grant the right to place hex markers. Their value is in their effects, production marker bonuses, and special abilities printed on the card.

### Requirement: Building track tiers unlock predetermined bonuses
Each tier of the building track SHALL have a predetermined bonus (action, gold, or VP) that unlocks permanently when that tier is reached. The bonus is the same for all players and does not depend on which specific token was placed.

#### Scenario: Player reaches tier 2 of the Market track
- **WHEN** a player's Market track reaches tier 2
- **THEN** the tier 2 bonus (as printed on the track) unlocks for that player permanently

### Requirement: Track bonus is permanent once unlocked
A tier bonus that has been unlocked SHALL remain in effect for the rest of the game, even if the infrastructure tokens that triggered it are subsequently removed.
