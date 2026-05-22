## MODIFIED Requirements

### Requirement: Military markers are removed on conquest by default
Military markers SHALL be removed from a region when that region is conquered. This replaces the previous era-based removal rule.

#### Scenario: Region with standard military marker is conquered
- **WHEN** a player conquers a region that contains a military marker
- **THEN** the military marker is removed from the region

### Requirement: Permanent markers survive conquest
Military markers designated as permanent (indicated by a symbol on the token) SHALL remain on a region when it is conquered. The conquering player inherits the marker's effect.

#### Scenario: Region with permanent marker is conquered
- **WHEN** a player conquers a region that contains a permanent military marker
- **THEN** the marker remains on the region under the new owner's control

### Requirement: Permanent markers are rotatable
A permanent marker's facing SHALL be adjustable after placement. The owning player may rotate the marker as an action.

#### Scenario: Player rotates a permanent marker
- **WHEN** a player owns a region with a permanent marker and takes a rotate action
- **THEN** the marker's facing changes to the chosen orientation

### Requirement: Permanent markers are upgradable via era cards
A permanent marker MAY be upgraded through an era card effect. Any player may use a card to upgrade any player's permanent marker.

#### Scenario: Player upgrades an opponent's marker
- **WHEN** a player plays an era card with an upgrade effect targeting an opponent's permanent marker
- **THEN** the marker is upgraded according to the card's effect; the marker remains the opponent's property

### Requirement: Era-based marker removal is dropped
Markers SHALL NOT be removed at era transitions. Removal happens only through conquest (for standard markers) or never (for permanent markers).

### Requirement: Military markers are hex-sized and directional
Military markers SHALL be hexagonal in shape to match the hex grid and support directional placement. The initial placement facing determines any directional bonuses or dependencies.

### Requirement: Production markers are smaller positional tokens
Production markers SHALL be physically distinct from military markers — smaller tokens that fit inside a hex alongside a military marker. They represent resource or commodity production on the region.

### Requirement: Defender may rearrange production markers before conquest executes
When a player's region is about to be conquered and that region has a production marker, the defender SHALL have the opportunity to move one production marker to another of their regions before ownership transfers.

#### Scenario: Defender moves a production marker before conquest
- **WHEN** a conquest is resolved and the defender has a production marker in the contested region
- **THEN** the defender may move that marker to any other region they own before ownership of the contested region transfers; if no other region is available, the marker is removed
