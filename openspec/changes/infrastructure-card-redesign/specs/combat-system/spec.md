## MODIFIED Requirements

### Requirement: Raid card targets bordering regions only
The Raid card effect SHALL only apply to regions that share a border with a region the acting player controls.

#### Scenario: Player uses Raid on a non-bordering region
- **WHEN** a player attempts to Raid a region that does not border any region they control
- **THEN** the action is invalid; the Raid may not proceed

#### Scenario: Player uses Raid on a bordering region
- **WHEN** a player spends a Raid card action on a bordering region
- **THEN** the player gains resources from that region as stated on the card

### Requirement: Raid card may be activated with either action type
The Raid card SHALL accept either an attack action or a market action as its activation cost. The player chooses which to spend.

### Requirement: Era III military cards trigger on combat draw results
Era III military class cards SHALL include at least one card whose effect triggers based on the result of a modifier card draw during combat (e.g., triggering on a Fail draw or a specific result).

#### Scenario: Combat draw triggers an Era III card effect
- **WHEN** a combat draw produces a result matching an Era III card's trigger condition
- **THEN** the card's effect activates automatically for the player holding that card

### Requirement: Military markers removed on conquest do not carry to the new owner
When a standard (non-permanent) military marker is removed on conquest, it is discarded. The conquering player does not receive or inherit the marker.
