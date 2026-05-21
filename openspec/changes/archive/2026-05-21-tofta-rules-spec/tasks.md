## 1. Archive specs into main OpenSpec

- [ ] 1.1 Run `openspec archive tofta-rules-spec` to merge capability specs into `openspec/specs/`
- [ ] 1.2 Verify all 9 capability specs appear under `openspec/specs/`
- [ ] 1.3 Commit the resulting `openspec/specs/` structure

## 2. Validate specs against rules.md

- [ ] 2.1 Run `openspec validate tofta-rules-spec` and resolve any issues
- [ ] 2.2 Cross-check each spec scenario against the corresponding section of `rules.md`
- [ ] 2.3 Fix any discrepancies between spec and rules.md

## 3. Establish change workflow for future rule updates

- [ ] 3.1 Document in README.md that rule changes should be proposed via `/opsx:propose`
- [ ] 3.2 Test the workflow by proposing a small rule change as a new change proposal
