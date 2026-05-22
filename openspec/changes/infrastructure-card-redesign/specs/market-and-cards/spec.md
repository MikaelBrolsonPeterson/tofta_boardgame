## MODIFIED Requirements

### Requirement: Two central market actions
The market phase SHALL offer exactly two baseline actions: (1) buy an empire card, (2) place an infrastructure token. All other market operations (trading, Draft, Cull, VP purchase) are gated behind empire cards.

#### Scenario: Player takes a market action
- **WHEN** a player spends a market action
- **THEN** they must choose: buy a card from the market, or place an infrastructure token; no other baseline option is available

### Requirement: Each card states its action cost
Empire cards SHALL explicitly state which action type (market action, attack action, or either) is required to activate or play the card.

#### Scenario: Player reads a card
- **WHEN** a player examines an empire card
- **THEN** the cost section clearly indicates whether spending the card costs a market action, an attack action, or may use either

### Requirement: Dual-action cards produce different effects by action type
A card MAY specify two distinct outcomes: one if a market action is spent, one if an attack action is spent.

#### Scenario: Player uses dual-action card with market action
- **WHEN** a player activates a dual-action card by spending a market action
- **THEN** the card's market-action effect resolves

#### Scenario: Player uses dual-action card with attack action
- **WHEN** a player activates a dual-action card by spending an attack action
- **THEN** the card's attack-action effect resolves

### Requirement: Trading is fully card-gated
Trading between players SHALL NOT be a baseline market action. It SHALL only be available when a player has an empire card that grants trading ability.

### Requirement: Draft and Cull are fully card-gated
Drawing from the market deck (Draft) and removing a card from one's empire mat (Cull) SHALL only be available through empire card effects, not as baseline market actions.

### Requirement: VP purchase is fully card-gated
Purchasing victory points with commodities SHALL NOT be a baseline market action. It SHALL only be available through Era III empire cards (one card per commodity type).

### Requirement: Enrichment cards enable resource-to-commodity conversion
Era II Market class cards SHALL include enrichment cards that allow a player to convert resources into a commodity by spending a market action.

#### Scenario: Player uses an enrichment card
- **WHEN** a player has an Era II Market enrichment card on their empire mat and spends a market action
- **THEN** they convert the card's specified resources into one commodity of the card's type

### Requirement: Bank conversion remains at 4:1 without a card
Any player MAY spend 1 market action to convert 4 identical resources into 1 resource of any type, regardless of card holdings. This is the only baseline conversion.

### Requirement: Era III contains one VP conversion card per commodity type
Era III SHALL include at least one empire card for each commodity type (iron, paper, cloth, glass) that allows the holder to convert 3 of that commodity into VP by spending a market action.

#### Scenario: Player purchases VP via Era III card
- **WHEN** a player has the relevant Era III VP conversion card and spends a market action with 3 matching commodities
- **THEN** they convert the commodities and gain VP as stated on the card

### Requirement: Era III military cards counter the VP engine
Era III SHALL include military class empire cards whose effects trigger on combat draw results or otherwise counter a player who has built a VP conversion engine.

#### Scenario: Raid card used on a bordering region
- **WHEN** a player plays a Raid card by spending either an attack action or a market action
- **THEN** the effect applies to a region bordering the player's territory, gaining resources from that region according to the card effect
