## Tasks

### Rules

- [ ] Rewrite Buildings/Markers section: track-unlocks-markers, empire cards give effects only
- [ ] Rewrite Market section: two central actions, card-gated operations table, bank conversion 4:1 baseline
- [ ] Update Empire Cards section: add action cost notation, dual-action card format, remove placement right language
- [ ] Add Enrichment Cards subsection (Era II Market class)
- [ ] Add Era III VP Conversion Cards subsection (one per commodity)
- [ ] Add Era III Military Cards subsection (combat-trigger cards, Raid)
- [ ] Rewrite Marker System section: permanence, conquest removal, rotation, upgrades, defender rearrange
- [ ] Update Scoring section: remove baseline VP purchase; document card-gated VP path
- [ ] Remove era-based marker removal from all rule references
- [ ] Update card tables: review all existing cards against new action-cost-explicit format; flag cards that are remnants of old placement system

### Card Design

- [ ] Design Era I/II infrastructure card (dual-action: market or attack → place Military token)
- [ ] Design Era II Raid card (dual-action: market or attack → gain resources from bordering region)
- [ ] Design Era II Market enrichment cards (resource → commodity conversion, one per commodity type)
- [ ] Design Era III VP conversion cards (one per commodity type: iron, paper, cloth, glass)
- [ ] Design Era III military counter-cards (combat draw triggers, at least one Raid variant)
- [ ] Audit all existing cards: rewrite with explicit action cost notation; revise or retire cards tied to old placement system

### Token / Track Design

- [ ] Define token pool per class: which tokens exist, their tiers and gold costs
- [ ] Define track bonus per tier per class (action, gold, or VP)
- [ ] Specify permanent marker symbol (physical token design)
- [ ] Specify upgrade mechanic on permanent markers (what changes on upgrade)

### App (separate follow-up change)

- [ ] Implement infrastructure token pool and variable costs
- [ ] Implement build action (market action → place token → advance track)
- [ ] Implement track bonus unlock (permanent, not revokable)
- [ ] Remove empire-card-as-placement-right from all app logic
- [ ] Remove baseline VP purchase from MarketPanel
- [ ] Implement dual-action card UI (player chooses which action to spend)
- [ ] Implement Raid card targeting (bordering regions only)
- [ ] Implement permanent marker flag and conquest survival logic
- [ ] Implement permanent marker rotation action
- [ ] Implement permanent marker upgrade via card
- [ ] Implement defender rearrange for production markers on conquest (already partially in app)
