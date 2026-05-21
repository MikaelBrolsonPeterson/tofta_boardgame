## ADDED Requirements

### Requirement: Market has 5 slots refilled immediately on purchase
The market SHALL always display 5 cards drawn from the current era deck. When a card is purchased the slot refills immediately from the era deck.

#### Scenario: Card purchased from market
- **WHEN** a player buys a card from the market
- **THEN** the empty slot is immediately refilled from the top of the current era deck

### Requirement: Empire cards are placed on the empire mat; action cards execute immediately
Empire cards SHALL be placed on the player's empire mat (requiring a free slot). Action cards SHALL execute their effect immediately on purchase and are then trashed — they never occupy a card slot.

#### Scenario: Buying an action card
- **WHEN** a player purchases an action card
- **THEN** its effect resolves immediately and the card goes to the trash

### Requirement: Each empire card has a gold cost and a resource/commodity cost; pay one
Every empire card SHALL list two prices. The player pays exactly one: either the gold cost or the resource/commodity cost.

#### Scenario: Paying with a resource instead of gold
- **WHEN** a card costs 5 gold OR 1 stone and a player has 1 stone
- **THEN** they may pay 1 stone instead of 5 gold

### Requirement: Draft and Cull improve the personal modifier deck
A player MAY spend 1 market action + 2 gold to either Draft or Cull:
- **Draft**: Draw 2 from the Modifier Draw Pile; add 1 to discard, return 1 to bottom of pile.
- **Cull**: Search deck and discard; choose 3 cards, permanently remove 1 (not Fail or Success), return 2.

#### Scenario: Draft draws two Fail cards
- **WHEN** a player drafts and both drawn cards are Fail
- **THEN** they must add one to their discard pile; they cannot opt out

#### Scenario: Attempting to cull Fail
- **WHEN** a player attempts to cull their Fail card
- **THEN** the cull is not permitted; Fail is a permanent fixture

### Requirement: Standard VP purchase is always available
Any player MAY spend 1 market action + 3 of the same commodity to gain 3 VP. This option is always available regardless of market contents. Wild counts as any commodity.

#### Scenario: Converting 3 Iron to VP
- **WHEN** a player spends 1 market action and 3 Iron
- **THEN** they gain 3 VP immediately

#### Scenario: Using Wild for VP purchase
- **WHEN** a player has 2 Iron and 1 Wild
- **THEN** they may spend all three for 3 VP

### Requirement: Modifier Draw Pile has a defined composition
The shared Modifier Draw Pile SHALL contain: 2× Fail, 1× −1, 2× 0, 3× +1, 4× +2, 3× Success. Cards returned to it go face-down to the bottom.

#### Scenario: Draw Pile runs out
- **WHEN** the Modifier Draw Pile is empty
- **THEN** all returned cards are shuffled to form a new pile
