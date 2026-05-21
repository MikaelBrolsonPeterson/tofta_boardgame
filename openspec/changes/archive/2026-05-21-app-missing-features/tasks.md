## 1. Types

- [x] 1.1 Add `Marker` interface and update `HexRegion` in game.ts
- [x] 1.2 Add `defender-rearrange` phase and `pendingConquest` / `rearrangeSourceKey` to GameState

## 2. Store

- [x] 2.1 Update initialMap.ts to use new HexRegion shape
- [x] 2.2 Add commodity clearing in endTurn (on new round)
- [x] 2.3 Add military marker clearing in endTurn (on era change)
- [x] 2.4 Add `purchaseVP` action
- [x] 2.5 Update executeAttack to trigger defender-rearrange phase on player conquest
- [x] 2.6 Add `confirmRearrange` action
- [x] 2.7 Update selectHex to handle defender-rearrange marker movement

## 3. UI

- [x] 3.1 Update HexTile to display military and production markers
- [x] 3.2 Add VP purchase controls to MarketPanel
- [x] 3.3 Add defender-rearrange UI to ActionPanel
