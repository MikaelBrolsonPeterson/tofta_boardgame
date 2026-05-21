## ADDED Requirements

### Requirement: Two marker types exist — military and production
Empire cards that place markers SHALL produce one of two types:
- **Military markers**: hexagonal tiles the same size as a region tile, placed on top of the region. Encode directional effects via orientation.
- **Production markers**: smaller hexagonal tokens placed on a region. Affect only the region they occupy.

#### Scenario: Identifying marker type from a card
- **WHEN** a player reads an empire card
- **THEN** the card effect clearly states whether it places a military marker or a production marker

### Requirement: Each region holds one military and one production marker by default
A region SHALL accommodate at most one military marker and one production marker simultaneously unless a card explicitly grants a second production marker slot.

#### Scenario: Placing a second production marker without a slot card
- **WHEN** a region already has a production marker and a player attempts to place another
- **THEN** the placement is not allowed unless the player has a card granting a second slot

### Requirement: Marker placement costs a market action plus progressive gold
Placing a marker (except auto-placing resource buildings) SHALL cost 1 market action and a gold amount based on how many markers of that class have already been placed: 0 placed = 3 gold; 1 placed = 6 gold; 2 placed = 10 gold; 3 placed = 15 gold.

#### Scenario: Placing a second Market class marker
- **WHEN** a player already has 1 Market class marker on the board and places another
- **THEN** the cost is 1 market action + 6 gold

### Requirement: Resource building cards auto-place their production marker on purchase
Farm, Lumber Mill, Quarry, and Salt Mine SHALL place their production marker automatically at the moment their empire card is purchased. No separate placement action or gold cost is required.

#### Scenario: Buying a Farm card
- **WHEN** a player purchases the Farm empire card
- **THEN** a production marker is immediately placed on an eligible grassland region of their choice at no additional cost

### Requirement: Military markers are era-based and removed at era transitions
Military markers SHALL be removed from the board at the end of each era transition. A military marker placed in Era I does not persist into Era II.

#### Scenario: Era I→II transition with military markers on board
- **WHEN** Era I ends
- **THEN** all military markers currently on the board are removed

### Requirement: Conqueror may rotate a military marker one step on conquest
When a player conquers a region carrying a military marker, they SHALL be permitted to rotate the marker one step (60°) to reorient its directional effect.

#### Scenario: Conquering a region with a directional military marker
- **WHEN** a player conquers a region with a military marker
- **THEN** they may rotate it exactly one 60° step in either direction, or leave it as-is

### Requirement: Production markers are destroyed on conquest
When a region with a production marker is conquered, the production marker SHALL be destroyed. The conqueror does not inherit it.

#### Scenario: Conquering a region with a production marker
- **WHEN** a player conquers a region that has a production marker
- **THEN** the production marker is removed from the board

### Requirement: Defender rearranges production markers before conquest resolves
Before a conquest resolves, the defending player SHALL be permitted to rearrange any of their production markers among regions they still control.

#### Scenario: Defender moves a production marker before losing a region
- **WHEN** an attack is declared on a region the defender controls
- **THEN** the defender may move production markers to other controlled regions before the conquest result is applied

### Requirement: Destroyed production markers can be replanted
When a production marker is destroyed by conquest or card discard, the losing player SHALL be able to replant it on another eligible region they control at a cost of 1 market action and no additional gold.

#### Scenario: Replanting after conquest
- **WHEN** a player's production marker is destroyed by conquest
- **THEN** on their next turn they may spend 1 market action to place the marker on any eligible region they control

### Requirement: Standard builds place a production marker without advancing the track
Any player may place a basic production marker (Farm, Lumber Mill, Quarry, Salt Mine) without an empire card for 1 market action + 3 gold. This uses a standard token (flat disc) and does NOT advance the building track.

#### Scenario: Standard build on a grassland
- **WHEN** a player spends 1 market action + 3 gold on a standard Farm build
- **THEN** a flat disc token is placed on an eligible grassland; the Market track does not advance

#### Scenario: Upgrading a standard token
- **WHEN** a player spends 1 market action + 1 gold on a region with a standard token
- **THEN** the standard token is replaced by a cube from the Market class track, unlocking the track bonus
