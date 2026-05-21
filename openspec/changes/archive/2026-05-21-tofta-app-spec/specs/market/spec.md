## ADDED Requirements

### Requirement: Market displays up to 5 cards from the current era deck
The MarketPanel SHALL show up to 5 face-up cards drawn from the active era deck. Cards show name, class, cost, era, and effect.

#### Scenario: Market on game start
- **WHEN** the game starts in Era I
- **THEN** 5 Era I cards are visible in the market

### Requirement: Purchasing a card deducts its cost and places it on the empire mat
`buyCard` SHALL deduct the card's gold cost from the current player's gold, increment the corresponding class building track, apply any immediate bonuses (gold, actions, VP), and add the card to the player's active cards.

#### Scenario: Buying a card with sufficient gold
- **WHEN** a player buys a card costing 4 gold and has at least 4 gold
- **THEN** 4 gold is deducted, the building track advances, and the card appears on the player's empire mat

#### Scenario: Buying a card with insufficient gold
- **WHEN** a player cannot afford a card
- **THEN** the buy button is disabled for that card

### Requirement: Purchased card slot refills immediately from the era deck
After a purchase, the empty market slot SHALL be refilled immediately from the top of the current era deck.

#### Scenario: Card purchased from market
- **WHEN** a card is bought
- **THEN** its slot is immediately replaced by the next card from the era deck

### Requirement: Market refreshes with new era cards at each era transition
At an era transition, all remaining unpurchased era cards SHALL be removed and the market SHALL be repopulated with cards from the new era deck.

#### Scenario: Era I → Era II transition
- **WHEN** round 5 ends
- **THEN** unsold Era I cards are removed and 5 Era II cards populate the market
