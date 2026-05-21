## ADDED Requirements

### Requirement: Hex grid is rendered as an SVG
The app SHALL render the game map as an SVG hex grid. Each region is a hexagonal tile with terrain type, owner colour, and any placed markers shown visually.

#### Scenario: Map renders on load
- **WHEN** the app loads
- **THEN** all regions are visible on the SVG hex grid with correct terrain colours

### Requirement: Selecting a hex updates the selected region
Clicking a hex SHALL update `selectedHex` in the store. If the app is in `select-attack-target` phase, selecting a valid target hex SHALL immediately trigger attack execution.

#### Scenario: Clicking own region in action phase
- **WHEN** a player clicks a region they own during the action phase
- **THEN** `selectedHex` is set to that region and its details are shown in the InfoPanel

#### Scenario: Clicking target in attack phase
- **WHEN** the app is in `select-attack-target` phase and the player clicks a valid target
- **THEN** `executeAttack` is called immediately

### Requirement: Valid attack targets are highlighted
When in `select-attack-target` phase, all regions adjacent to the attack source that are valid targets SHALL be visually highlighted. Non-valid regions SHALL appear dimmed.

#### Scenario: Attack initiated from a region
- **WHEN** a player initiates an attack from a region
- **THEN** adjacent regions that can be attacked are highlighted; all others are dimmed

### Requirement: Pending claims are shown on the map
Regions with a pending claim (failed conquest that resulted in revolt) SHALL be visually distinguished on the map until the claim resolves.

#### Scenario: Region with pending claim
- **WHEN** a region has a pending claim
- **THEN** it displays a distinct overlay or colour indicating the pending claim state
