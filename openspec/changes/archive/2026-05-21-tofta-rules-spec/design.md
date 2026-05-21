## Context

Tofta's rules currently live in a single `rules.md` file. The game has reached a level of design stability where formalising the rules as structured capability specs makes ongoing changes (card design, balance tweaks, playtesting feedback) easier to propose, track, and validate. This design pass does not change any rules — it captures the current state.

## Goals / Non-Goals

**Goals:**
- Capture all current rules as structured, testable capability specs
- Establish a baseline so future rule changes can be proposed as deltas against named specs
- Make it possible to validate new card text against existing specs (e.g. a card referencing a terrain type or marker slot that doesn't exist)

**Non-Goals:**
- Changing any rules
- Speccing the browser prototype (separate effort)
- Designing new cards (next session)

## Decisions

**One spec file per capability area, not per rule**
Each capability (e.g. `marker-system`, `scoring`) groups related requirements. The alternative — one file per rule — would fragment context and make cross-requirement validation harder. Grouping by capability keeps related scenarios together and mirrors how a player thinks about the game.

**rules.md remains the human-readable source; specs are the structured layer**
The specs do not replace `rules.md`. They provide a machine-readable, scenario-based reference that OpenSpec can validate against. Rules.md stays as the authoritative design narrative; specs are the contract layer for future change proposals.

**Scenarios use WHEN/THEN format (no GIVEN)**
The game has no complex preconditions that can't be expressed in the WHEN clause. Adding GIVEN would increase verbosity without benefit for this domain.

## Risks / Trade-offs

- **Specs drift from rules.md** → Mitigate by updating both in the same commit when rules change. The OpenSpec archive process enforces this by merging change specs into the main spec at close.
- **Scenarios are game-design tests, not software tests** → These scenarios describe expected game behaviour, not code behaviour. They serve as a checklist during playtesting and card design review, not automated test cases (for now).

## Open Questions

- Should the browser prototype share the same OpenSpec instance or have its own? (Likely its own, since the specs are fundamentally different in nature.)
- VP purchase cards (Era III, per commodity type): rates not yet settled — will be a future change proposal.
- Military marker rotation Misc card: design pending.
- Production marker preservation card: design pending.
