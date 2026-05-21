## Why

Three rule changes are settled in rules.md and the rules spec but not yet reflected in the app: commodity clearing at round end, standard VP purchase, and the marker system. The app is used for playtesting so these gaps make it inaccurate as a playtesting tool.

## What Changes

- **Commodity clearing**: All commodity stockpiles reset to 0 at end of each round
- **Standard VP purchase**: New market action — spend 3 of same commodity + 1 market action for 3 VP
- **Marker system**: Regions hold military markers and production markers as distinct objects; military markers are era-based and removed at era transitions; production markers are destroyed on conquest; defender can rearrange production markers before conquest resolves

## Capabilities

### New Capabilities

- `vp-purchase`: Standard VP purchase action (3 same commodity + 1 market action = 3 VP)

### Modified Capabilities

- `player-state`: Commodity clearing at end of each round
- `market`: VP purchase integrated as a market action option
- `combat-system`: Production markers destroyed on conquest; military markers persist (rotatable); defender rearranges before conquest
- `hex-map`: Regions visually show military and production markers
- `era-and-round`: Military markers removed at era transitions
- `turn-management`: endTurn clears commodities; market actions gate VP purchase

## Impact

- `app/src/types/game.ts` — new marker types
- `app/src/store/gameStore.ts` — new state (markers per region), new actions (placeMarker, purchaseVP, rearrangeMarkers), updated endTurn and era transition logic
- `app/src/components/HexTile.tsx` — render markers on regions
- `app/src/components/ActionPanel.tsx` or `MarketPanel.tsx` — VP purchase button
- `app/src/components/HexMap.tsx` — defender rearrange phase
