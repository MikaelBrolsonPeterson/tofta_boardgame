## ADDED Requirements

### Requirement: Region types have defined upkeep, taxation, and combat modifiers
Each region type SHALL have fixed values for upkeep, taxation, defense modifier, attack modifier, attacks required to conquer, and any special rules:

| Type | Upkeep | Taxation | Def mod | Atk mod | Attacks | Special |
|------|--------|----------|---------|---------|---------|---------|
| Ocean | 0 | 1 | 0 | +1 | 1 | Requires Navy card |
| Grassland | 1 | 3 | 0 | 0 | 1 | — |
| Mountain | 3 | 1 | +2 | 0 | 1 | — |
| Swamp | 1 | 0 | +1 | 0 | 2 | — |
| Desert | 0 | 1 | 0 | +1 | 1 | Attacker disadvantage |
| Forest | 2 | 1 | +1 | 0 | 1 | Per 3 forests: +1 attack action/era |
| Capitol | 1 | 4 | +2 | +2 | 3 | Attacker disadvantage |
| Water | 0 | 3 | — | — | — | Cannot be attacked directly |
| Ancient Ruins | 2 | 2 | −1 | 0 | 1 | Produces 1 Wild/round automatically |

#### Scenario: Attacking a mountain region
- **WHEN** a player attacks a mountain
- **THEN** the defender adds +2 to their defense strength

#### Scenario: Attacking a desert region
- **WHEN** a player attacks a desert
- **THEN** the attacker draws two modifier cards and uses the worst (disadvantage)

### Requirement: Regions must be connected to the Capitol to generate taxation
A region SHALL generate taxation only if there is a continuous path of player-controlled regions back to that player's Capitol. Disconnected regions cost upkeep but produce no tax.

#### Scenario: Region cut off by conquest
- **WHEN** an opponent conquers a region that connects two parts of a player's empire
- **THEN** the isolated regions produce no taxation starting that round

### Requirement: Upkeep scales with empire size
All regions SHALL apply a global upkeep modifier based on total empire size: 1–5 regions = base upkeep; 6–9 regions = +1 to all; 10+ regions = +2 to all.

#### Scenario: Empire reaches 6 regions
- **WHEN** a player controls 6 regions
- **THEN** every region costs 1 additional upkeep

### Requirement: Players unable to pay upkeep must abandon regions
If a player cannot pay full upkeep at income collection, they SHALL abandon regions of their choice until upkeep is affordable. Forced abandonment may cascade if it breaks connectivity.

#### Scenario: Abandonment cascades
- **WHEN** a player abandons a region that was the only connection between two parts of their empire
- **THEN** the now-isolated regions no longer generate taxation, potentially requiring further abandonment

### Requirement: Forests provide bonus attack actions per 3 controlled
For every 3 forest regions a player controls, they SHALL gain +1 attack action per era.

#### Scenario: Player controls 3 forests
- **WHEN** a player has exactly 3 forest regions at the start of an era
- **THEN** they gain +1 attack action per turn for that era

### Requirement: Ancient Ruins produce 1 Wild commodity automatically
An Ancient Ruins region SHALL produce 1 Wild commodity per round without any production marker. Wild counts as any commodity but not as a resource.

#### Scenario: Controlling Ancient Ruins
- **WHEN** a player controls an Ancient Ruins region at the end of a round
- **THEN** they receive 1 Wild commodity (must be spent this round or lost)
