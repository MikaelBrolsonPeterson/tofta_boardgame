## MODIFIED Requirements

### Requirement: VP purchase is not a baseline scoring action
Spending commodities to gain VP SHALL NOT be available as a direct market action. This option is removed from the baseline action set.

### Requirement: VP conversion is gated behind Era III cards
A player MAY only convert commodities to VP if they hold the relevant Era III VP conversion empire card.

#### Scenario: Player attempts VP purchase without a conversion card
- **WHEN** a player has 3 or more commodities but no Era III VP conversion card for that commodity type
- **THEN** no VP purchase option is presented; the commodities cannot be converted to VP

#### Scenario: Player uses Era III card to convert VP
- **WHEN** a player holds an Era III VP conversion card for commodity type X and spends a market action with 3 of commodity X
- **THEN** they receive VP as stated on the card and the 3 commodities are removed

### Requirement: One VP conversion card exists per commodity type in Era III
Era III SHALL contain at least one VP conversion card for each of iron, paper, cloth, and glass. These cards are distinct and limited, creating a race to acquire them in the late game.
