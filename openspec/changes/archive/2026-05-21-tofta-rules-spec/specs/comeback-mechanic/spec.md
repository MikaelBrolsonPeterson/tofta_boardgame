## ADDED Requirements

### Requirement: Last-place player draws a catch-up card each round
At the end of each round, the player in last place SHALL draw the top card from the Catch-Up Deck and add it to their modifier discard pile. It enters circulation the next time their deck reshuffles.

Last place is determined by: (1) fewest regions controlled; (2) tiebreak: lowest income rate; (3) tiebreak: lowest taxation.

#### Scenario: Clear last-place player
- **WHEN** one player controls fewer regions than all others at round end
- **THEN** that player draws the top card from the Catch-Up Deck

#### Scenario: Tiebreak on regions controlled
- **WHEN** two players are tied on region count
- **THEN** the one with the lower income rate is last place

### Requirement: Catch-Up Deck has a defined composition and reshuffles when empty
The Catch-Up Deck SHALL contain 12 cards: 6× +2, 5× +3, 1× Successful attack (reshuffle). Cards have colored faces distinct from all other modifier cards. When the deck runs out, all 12 cards are reshuffled back in.

#### Scenario: Catch-Up Deck exhausted
- **WHEN** the last card is drawn from the Catch-Up Deck
- **THEN** all 12 cards are reshuffled face-down to form a new deck

#### Scenario: Catch-up card enters the modifier deck
- **WHEN** a catch-up card is added to a player's modifier discard pile
- **THEN** it enters circulation the next time that player's deck reshuffles (not immediately)
