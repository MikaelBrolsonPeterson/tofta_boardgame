## ADDED Requirements

### Requirement: Each card class has a building track with defined tiers
The store SHALL track a position (0–4 for Military/Market/Science/Misc; 0–3 for Wonders) per class per player. Each purchase of a class card advances the track by one and unlocks the corresponding bonus permanently.

#### Scenario: First Military card purchased
- **WHEN** a player buys their first Military card
- **THEN** the Military track advances to position 1 and the Tier 1 bonus (+1 attack action/round) is permanently applied

#### Scenario: Track at maximum
- **WHEN** a player's track is at its maximum position
- **THEN** no further advancement occurs even if another card of that class is bought (class purchase limit prevents this)

### Requirement: Track bonuses are cumulative and permanent
Once a track tier bonus is unlocked, it SHALL remain active for the rest of the game regardless of whether the associated card is later discarded.

#### Scenario: Card discarded after track bonus unlocked
- **WHEN** a player discards a Military card whose placement unlocked the Tier 1 bonus
- **THEN** the +1 attack action/round bonus remains active

### Requirement: BuildingTrack component displays track state visually
The BuildingTrack component SHALL show each class's current track position and the bonuses unlocked vs still locked, for the current player.

#### Scenario: Two tiers unlocked
- **WHEN** a player has 2 Market class cards placed
- **THEN** the BuildingTrack shows tiers 1 and 2 as unlocked, tiers 3 and 4 as locked
