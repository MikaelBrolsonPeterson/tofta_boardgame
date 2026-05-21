## ADDED Requirements

### Requirement: Resources accumulate on producing regions
Resources (Stone, Wood, Food) SHALL accumulate on the region that produces them and persist across era transitions. They are not reset at end of round.

#### Scenario: Farm produces Food over multiple rounds
- **WHEN** a player controls a region with a Farm production marker for 3 rounds without spending Food
- **THEN** 3 Food are stockpiled on that region

### Requirement: Commodities do not accumulate
Commodities (Iron, Paper, Cloth, Glass, Wild) SHALL NOT accumulate. Any commodity not spent during the round it is produced is lost at the end of that round.

#### Scenario: Unspent Iron at end of round
- **WHEN** a player produces 2 Iron in a round and spends 1 on a card
- **THEN** the remaining 1 Iron is lost at end of round

### Requirement: Conquering a region yields up to 2 resources; commodities are lost
When a region is conquered, the attacker SHALL take up to 2 resources from the stockpile. Any resources beyond 2 are destroyed. Commodities on the region are lost regardless.

#### Scenario: Region with 4 resources stockpiled
- **WHEN** a player conquers such a region
- **THEN** the attacker takes 2 resources; the other 2 are destroyed

### Requirement: Resources and commodities are stored on the producing region
Stockpiles SHALL be kept on the region that produces them. When spending, the player chooses which region to draw from. Stockpiles are public information.

#### Scenario: Spending Stone from a region
- **WHEN** a player buys a card costing 1 Stone
- **THEN** they remove 1 Stone from any region they control that has Stone stockpiled

### Requirement: Player trading requires a shared border
A player MAY trade with any player whose empire shares at least one border with theirs, at a cost of 1 market action. Standard rates: 1 resource = 2 gold; 1 commodity = 3 gold. With Trade Route card: 1 resource = 1 gold; 1 commodity = 2 gold.

#### Scenario: Trading without Trade Route card
- **WHEN** a player spends 1 market action to buy 1 Iron from a neighbour
- **THEN** they pay 3 gold to the neighbour and receive access to 1 Iron this round

### Requirement: Bank conversion is available as a market action
A player MAY spend 1 market action to convert their own stockpile: 3 identical resources → 1 resource of any type; 3 identical commodities → 1 commodity of any type.

#### Scenario: Converting Stone to Wood
- **WHEN** a player spends 1 market action and removes 3 Stone from their stockpiles
- **THEN** they receive 1 Wood
