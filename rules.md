# Bulltofta "Tofta"

**Players:** 2–5

## Synopsis

You are the Queen of a small, small empire. Your empire may lack in size but certainly not in hunger for more power! The object of the game is to expand your empire by conquest, develop an economy, and hinder your opponent. Points are scored by fulfilling objectives, expanding your empire, and claiming regions adjacent to any of your current empire tiles.

### Alternate Synopsis

You are two competing beehives in a park called Bulltofta. You race for claiming flowers, trees, and other valuable biotopes around your hive before your adversary does.

---

## Game Mechanics

### General

The game consists of 12 rounds where each player has one turn each. At the start each player has 1 attack action and 1 market action per turn. More actions of both types can be acquired by purchasing and assigning Empire cards to your Empire.

### Player Empire Mat

Each player has their own empire mat. The number of Empire card slots expands each era: 3 slots in Era I, 4 in Era II, and 5 in Era III. Empire cards can be bought at the market from a set of available cards using money and Market actions.

### Market Mat

All players can use their market action to buy cards from the market. The market has two kinds of cards:
1. Empire cards
2. Deck modifier cards

When purchased, Empire cards are added to the player's empire mat and modifier cards to the modifier deck respectively.

### Eras

The 12 rounds are divided into 3 Eras. Different eras have unique Empire cards, and certain Empire cards give different bonuses depending on the current era.

| Era | Empire card slots on player mat | Empire cards in market | Modifier cards in market |
|-----|--------------------------------|------------------------|--------------------------|
| 1   | 3                              | 4                      | 2                        |
| 2   | 4                              | 4                      | 2                        |
| 3   | 5                              | 5                      | ?                        |

### Player Order and the Initiative Track

At the start of each era, players select their position on the Initiative Track. The track has **N+2 spots** where N is the number of players — always two more spots than players, making the bottom positions genuinely tempting.

**Selection order:** The player who held spot 1 last era picks first this era; selection then proceeds clockwise. At game start, the first picker is chosen randomly.

Lower spots (later in turn order) grant increasingly valuable rewards. Only positions 1 through N+2 are available for the current player count.

| Position | Reward | Available from |
|----------|--------|----------------|
| 1 | Nothing | 2+ players |
| 2 | +2 gold | 2+ players |
| 3 | +1 resource or commodity (your choice) | 2+ players |
| 4 | +3 gold | 2+ players |
| 5 | +2 resources or commodities (your choice) | 3+ players |
| 6 | +1 extra attack action this era | 4+ players |
| 7 | Draw 2 Empire cards, keep 1 free | 5+ players |

**Incentives for going first:** first market pick each round, first to act on Event cards.

**Incentives for going last:** full information, and the ability to attack a high-value region right before the round resets — leaving an opponent to start their next turn with crippled income and no immediate recourse (the "king hit").

**Income Rate** is displayed on the player mat as: `Taxation – Upkeep = Income Rate`. It is recalculated at each era transition.

---

## Turn

A player performs their actions in any order.

### Actions

| Name | Description |
|------|-------------|
| Market action | Costs a Market action. Either: buy a card from market; perform any actions stated on the card; or add card to Empire mat on an empty space (not a decree — card's effect goes into effect immediately). |
| Attack action | Perform an attack on a region adjacent to a region you control. Costs an Attack action and initiates a comparison of strength. |
| Abandon region | Free action. Can be performed any number of times per turn. The region immediately becomes independent (reverts to the independent state deck for defense). Any building on the region is destroyed. Income rate is recalculated immediately — abandoning a region in the middle of your empire may isolate other tiles, cutting their taxation. |
| Sell Empire card | Can be performed whenever the player wants, except during an Attack action. Sell an Empire card to make room for a newly purchased card. |

### End of Round

When the round ends each player:
- Collects money from the bank. The amount equals the difference between total region taxation and upkeep.
- Performs any actions stated on Empire cards.

### Change of Era

| Era | Ends at round | What happens |
|-----|---------------|--------------|
| 1   | 4             | Light scoring; remove unpurchased Era cards; populate market with next era cards; recalculate Income Rate; players select Initiative Track positions |
| 2   | 8             | Same as above |
| 3   | 12            | Full scoring |

Resources and commodities reset to zero at each era transition.

### End Conditions

- Players complete all 12 rounds.
- Taking another player's capitol will end the game (?). If the capitol is retaken (or freed by a third player) during the next round, the game continues?

### Scoring

| Era    | Scoring rules |
|--------|---------------|
| 1 and 2 | Runtime scoring. Scoring for regions? |
| 3       | Final scoring. Scoring for regions, Empire cards, and remaining money. |

---

## Map

### Regions

A hexagonal region adjacent to 6 other regions. The entire map consists of hexagons with different terrains that affect the flow of the game. For example, ocean acts as a barrier and mountains create military strongpoints that are expensive to maintain.

### Region Control

A region is controlled by the player who last conquered it, unless that player has abandoned it. Region control is indicated by placing a meeple of the conquering player's color on the region.

### Independent Regions

At the start of the game the map is filled with independent regions. They do not add region defense bonuses to strength when attacked and are therefore simpler to conquer. But beware of the fail card!

### Taxation and Upkeep

Taxation is the primary way players make money. Some of it is spent on upkeep to maintain control of territories.

**Special case:** Regions not adjacent to any other player-controlled regions will not produce tax, just upkeep.

**Exception:** The player start region is the Capitol.

### Resources

Resources (Stone, Wood, Food) are **not generated automatically by terrain**. They are produced only by resource buildings placed on eligible tiles via Empire cards. Controlling mountains does nothing on its own — you need a Quarry on one first.

Resources carry over between rounds within an era but **reset to zero at each era transition**.

| Resource | Produced by | Eligible terrain |
|----------|-------------|-----------------|
| Stone | Quarry | Mountain |
| Wood | Lumber Mill | Forest |
| Food | Farm, Salt Mine | Grassland, Desert |

**Empire card dual pricing:** Each card lists a gold cost and a resource or commodity cost. Pay one or the other — never both. Example: *Mountain Fort* costs `3 gold` OR `1 stone`.

### Commodities

Commodities are a processed tier above raw resources, produced by commodity buildings. They are required for most Era II and III Empire cards. Commodities also carry over within an era and reset at era transition.

| Commodity | Produced by | Eligible terrain |
|-----------|-------------|-----------------|
| Iron | Mine (1/round), Iron Forge (2/round) | Mountain |
| Paper | Papyrus Workshop (1/round), Scriptorium (2/round) | Grassland, Swamp / Anywhere |
| Cloth | Loom | Grassland |
| Glass | Glassworks | Desert, Ocean |
| Wild | Ancient Ruins (automatic, no building needed) | — |

**Wild** counts as any commodity but **cannot substitute for resources**. It is generated automatically by controlling an Ancient Ruins region — no building required.

### Buildings

Both resource buildings and commodity buildings follow the same placement rules:

- When you purchase a building card, you immediately place the building token on an eligible tile you currently control. If you have no eligible tile, you may not purchase the card.
- The building is attached to that tile. If an opponent conquers the tile, the building is **destroyed**.
- Only one building per tile.
- A building generates its output each round as long as you control the tile.

### Region Types

| Type           | Upkeep | Taxation | Defense mod | Attack mod | Attacks to conquer | Special |
|----------------|--------|----------|-------------|------------|--------------------|---------|
| Ocean          | 0      | 1        | 0           | +1         | 1                  | Not conquerable without Navy card |
| Grassland      | 1      | 3        | 0           | 0          | 1                  | Eligible for: Farm, Papyrus Workshop, Loom |
| Mountain       | 3      | 1        | +2          | 0          | 1                  | Eligible for: Quarry, Mine, Iron Forge |
| Swamp          | 1      | 0        | +1          | 0          | 2                  | Eligible for: Papyrus Workshop |
| Desert         | 0      | 1        | 0           | +1         | 1                  | Attacker suffers disadvantage. Eligible for: Glassworks, Salt Mine |
| Forest         | 2      | 1        | +1          | 0          | 1                  | Per 3 forests controlled: +1 attack action per era. Eligible for: Lumber Mill |
| Capitol        | 1      | 4        | +2          | +2         | 3                  | Attacker has disadvantage |
| Water          | 0      | 3        | —           | —          | —                  | Cannot be attacked; only via fishing village/harbor/fleet. Eligible for: Glassworks |
| Ancient Ruins  | 2      | 2        | -1          | 0          | 1                  | Produces 1 Wild (commodity) per round automatically. 1–2 placed centrally on map |

---

## Conquest

### General

Conquering a region costs one Attack action. The conquest succeeds if the attacker has more strength than the defender.

- **Success:** Take control of the region and place your indicator there. Conquered regions provide tax but also cost upkeep.
- **Failure:** The region remains independent, but the player gains half the taxation of the region (rounded up) right away, which can be used to purchase cards.
- **Versus another player:** Remove that player's token and place one of your own instead.

### Multiple Attacks to Conquer

Some regions (Swamp: 2, Capitol: 3) require more than one successful attack to conquer. All required attacks must be made consecutively within the same turn, each costing one Attack action and resolved separately. If any attack fails, the entire conquest attempt fails for that turn — no partial progress carries over. The attacker may try again on a future turn.

### Strength

Strength is the sum of:
- Player base strength (offensive or defensive)
- Region bonuses (defensive or offensive)
- The number drawn from the modifier deck
- Any Empire card bonuses

### Advantage and Disadvantage

| Condition     | Effect |
|---------------|--------|
| Advantage     | Draw two cards from the modifier deck and pick the best. If Fail is drawn, the attack succeeds but the deck is reshuffled. |
| Disadvantage  | Draw two cards from the modifier deck and pick the worst. The player will not automatically succeed. |

### Starting Strength Modifier Deck

| Modifier              | # Cards |
|-----------------------|---------|
| Fail attack (reshuffle) | 1     |
| -2                    | 1       |
| -1                    | 2       |
| 0                     | 4       |
| +1                    | 2       |
| +2                    | 1       |
| Successful attack     | 1       |

### Independent State Modifier Deck

Independent states have a separate modifier deck that all players draw from when calculating the independent region's defensive strength.

| Modifier              | # Cards |
|-----------------------|---------|
| Fail attack (reshuffle) | 1 (2?) |
| -2                    | 1       |
| -1                    | 2       |
| 0                     | 4       |
| +1                    | 2       |
| +2                    | 1       |
| Successful attack     | 1       |

---

## Trading

### Player Trading

On your turn, as a market action, you may trade with any player whose empire shares at least one border with yours. You pay them gold; they grant you access to one unit of a resource or commodity their buildings currently produce. The trading partner does not lose the resource — you are purchasing production access for this round. They keep the gold.

| Purchase | Standard rate | With Trade Route card |
|----------|--------------|----------------------|
| 1 resource (Stone, Wood, Food) | 2 gold | 1 gold |
| 1 commodity (Iron, Paper, Cloth, Glass, Wild) | 3 gold | 2 gold |

The reduced rate applies to the **buyer** — you need the Trade Route card on your Empire mat to trade at reduced cost, regardless of whether your neighbor has it.

You may trade multiple times per turn as long as you have market actions and gold, and may trade with multiple neighbors in the same turn.

### Bank Conversion

If you have no eligible trading partner or prefer not to fund an opponent, you may convert your own stockpile via the bank. This costs a market action:

- 3 identical resources → 1 resource of any type
- 3 identical commodities → 1 commodity of any type

---

## Market

At any given time, 5 Empire cards and 2 Strength modifier cards are available for purchase. When buying a card a player pays the cost indicated on the card to the bank.

- **Strength modifier cards** are added to the Strength modifier discard pile.
- **Empire cards** are executed right away or placed on the Empire mat.

### Empire Cards

Empire cards are used to enact decrees in your empire.

**Properties:**
- **Cost:** Each card has two prices — a gold cost and a resource or commodity cost. Pay one or the other. Example: `3 gold OR 1 stone`. Your empire's tile composition and buildings determine which currency is easier to spend.
- **Requirement:** Buying a card with a specified requirement is only allowed if the requirement is fulfilled (e.g., have four mountain regions). Unfulfilled requirements at the end of the game may affect scoring.

### Empire Card Classes

| Class    | Color  | Effect examples |
|----------|--------|-----------------|
| Military | Red    | Add to strength when attacking or defending; reduce an opponent's strength; give advantage on attacks against certain region types; make opponent attack with disadvantage |
| Market   | Green  | Increase taxation in specified region types; decrease upkeep in specified region types |
| Science  | Lilac  | Give more market actions; give more attack actions; allow taking cards from market without paying; allow conquering regions without attacking (must be adjacent to a controlled region) |
| Wonders  | Brown  | VP for end-game scoring |
| Misc     | Grey   | Fishing (access water tiles); Cavalry (attack non-adjacent territory); gain taxation from isolated controlled regions |

### Victory Points

Some cards have victory points marked on them.

---

## Mechanics Under Consideration

- **Event cards:** Every new round a new event card is revealed with slight modifications to conditions. Extra strong modification the round before end of era — Turmoil!
- **Monetary system:** (under design)
- **Building track (Scythe-style):** Each player mat has a fixed number of building slots per class (proposed: 4 Military, 4 Market, 4 Science, 4 Misc, 3 Wonders = 19 total). Buildings start on the player mat. Placing a building onto a map region removes it from the mat and reveals a benefit in the slot underneath. Benefits tier per track: gold first, then actions/market actions, then points. Wonder track gives points only, with increasing amounts per building placed (e.g. 2 / 4 / 7 VP). This limits building spam and ties deployment progression to economic advancement. Open question: does "4 per type" mean per card class or per specific building card?

---

## Example Cards

All costs follow the format: `gold cost OR resource/commodity cost`. Pricing uses the formula: non-buildings = `(units × trading rate) + 1 + era bonus (0/1/2)`; resource buildings = `(units × rate) + 3`; commodity buildings = `(units × rate) + 4`. Resource trading rate = 2 gold, commodity trading rate = 3 gold.

### Military (Red)

| Card | Era | Cost | Placement | Effect |
|------|-----|------|-----------|--------|
| Watchtower | I | 3 gold OR 1 stone | Any controlled region | +1 defense to one region. Limit 1 per region. |
| Mountain Fort | I | 3 gold OR 1 stone | Any controlled region | +1 defense to this region and all adjacent. Stacks. |
| Battering Ram | I | 3 gold OR 1 stone | — | Target region loses 1 defense this era. |
| War Camp | I | 5 gold OR 2 food | Any controlled region | +1 attack action per era. |
| Siege Engine | II | 5 gold OR 1 iron | — | Target region loses its terrain defense bonus for one attack. |
| Shield Wall | II | 7 gold OR 1 iron + 1 food | — | All your regions gain +1 defense this round. Once per era. |
| Castle | II | 6 gold OR 2 stone | Any controlled region | +2 defense to this region and all adjacent. Stacks. |
| Mercenaries | II | 6 gold OR 2 food | — | Gain 2 extra attack actions this era. Each used attack costs 1 additional gold. |
| Fortress | III | 9 gold OR 3 stone | Any controlled region | +3 defense to one region permanently. |

### Market (Green) — Resource buildings

| Card | Era | Cost | Placement | Effect |
|------|-----|------|-----------|--------|
| Quarry | I | 5 gold OR 1 wood | Mountain | Produces 1 Stone per round. |
| Lumber Mill | I | 5 gold OR 1 stone | Forest | Produces 1 Wood per round. |
| Farm | I | 5 gold OR 1 wood | Grassland | Produces 1 Food per round. |
| Salt Mine | I | 5 gold OR 1 stone | Desert | Produces 1 Food per round. |
| Fishing Village | I | 3 gold OR 1 wood | — | Water tiles adjacent to your regions generate taxation without conquest. |
| Trade Route | II | 5 gold OR 1 food | — | Gain 1 gold per shared border with another player per round. Reduces your trading cost to 1 gold per resource and 2 gold per commodity. |
| Harbor | II | 6 gold OR 2 wood | — | Conquer and tax water and ocean tiles. |

### Market (Green) — Commodity buildings

| Card | Era | Cost | Placement | Effect |
|------|-----|------|-----------|--------|
| Mine | I | 6 gold OR 1 stone | Mountain | Produces 1 Iron per round. |
| Papyrus Workshop | I | 6 gold OR 1 food | Grassland or Swamp | Produces 1 Paper per round. |
| Loom | II | 6 gold OR 1 food | Grassland | Produces 1 Cloth per round. |
| Iron Forge | II | 10 gold OR 2 iron | Mountain | Produces 2 Iron per round. |
| Glassworks | II | 8 gold OR 2 food | Desert or Ocean | Produces 1 Glass per round. |
| Scriptorium | III | 10 gold OR 2 paper | Any controlled region | Produces 2 Paper per round. |

### Science (Lilac)

| Card | Era | Cost | Placement | Effect |
|------|-----|------|-----------|--------|
| Cartography | I | 3 gold OR 1 food | — | Once per era, reveal 3 face-down regions anywhere on the map. |
| Dispatch | I | 3 gold OR 1 food | — | +1 market action per era. |
| Taxation Reform | II | 7 gold OR 1 paper + 1 food | — | Reduce all your region upkeep by 1 (minimum 0) this era. |
| Military Academy | II | 7 gold OR 1 iron + 1 food | — | +1 base attack strength permanently. |
| Guild | II | 7 gold OR 1 paper + 1 food | — | +2 market actions per era. |
| Alchemy | III | 6 gold OR 1 wild | — | Once per round, convert any 2 commodities into 1 wild. |

### Wonders (Brown)

| Card | Era | Cost | Placement | Effect |
|------|-----|------|-----------|--------|
| Monument | II | 7 gold OR 1 stone + 1 cloth | — | +2 VP. |
| Lighthouse | II | 7 gold OR 1 glass + 1 wood | — | +2 VP. +1 strength on all attacks against water and ocean regions. |
| Great Wall | III | 11 gold OR 2 iron + 1 stone | — | +1 VP per mountain region at end of game. |
| Grand Market | III | 9 gold OR 1 cloth + 1 paper | — | +1 VP per 5 gold in treasury at end of game. |
| Cathedral | III | 11 gold OR 2 glass + 1 stone | — | +3 VP. All your regions gain +1 defense permanently. |

### Misc (Grey)

| Card | Era | Cost | Placement | Effect |
|------|-----|------|-----------|--------|
| Fishing Fleet | I | 3 gold OR 1 wood | — | Conquer water and ocean tiles (requires attack action as normal). |
| Pillage | I | 3 gold OR 1 food | — | When you successfully conquer a region this era, gain gold equal to its taxation value. |
| Vanguard | I | 3 gold OR 1 food | — | Once per era: abandon up to 2 regions, then immediately claim 1 adjacent independent region without an attack action. |
| Cavalry | II | 6 gold OR 2 food | — | Once per era, attack a territory not adjacent to your empire. |
| Espionage | II | 5 gold OR 1 paper | — | Once per era: steal 1 resource or commodity from a player you share a border with (they lose it). |
| Strategic Withdrawal | II | 7 gold OR 1 food + 1 cloth | — | Once per era: abandon up to 3 regions, then immediately claim 2 adjacent independent regions without attack actions. |
| Supply Lines | II | 7 gold OR 1 food + 1 cloth | — | Isolated regions generate half taxation instead of none. |
| Grand Migration | III | 11 gold OR 2 paper + 1 food | — | Once per era: abandon any number of regions, then claim up to half that number (rounded down) of independent regions anywhere on the map without attack actions. |
| Corsairs | III | 8 gold OR 1 iron + 1 wood | — | Once per era: raid an opponent's region adjacent to water or ocean — steal gold equal to that region's taxation value. |
| Navy | III | 10 gold OR 2 wood + 1 iron | — | Full ocean access. +1 attack action usable only on ocean and water tiles. |
