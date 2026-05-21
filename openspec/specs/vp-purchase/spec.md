## ADDED Requirements

### Requirement: Player can spend 3 of the same commodity for 3 VP
As a market action, a player SHALL be able to spend 3 identical commodities to gain 3 VP. Wild counts as its own commodity type for this purpose (3 Wild = 3 VP). This option is always available.

#### Scenario: Player has 3 Iron and buys VP
- **WHEN** a player spends 1 market action and 3 Iron
- **THEN** their Iron drops by 3, their VP increases by 3, and 1 market action is consumed

#### Scenario: Player lacks 3 of any commodity
- **WHEN** a player has fewer than 3 of every commodity type
- **THEN** the VP purchase option is disabled
