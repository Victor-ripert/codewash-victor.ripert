# Issue #33 — Update documentation to reflect recent fixes

## Problem

Several documentation files were outdated after 6 bug fixes (issues #21-#29):

### KNOWN_ISSUES.md
- Listed bugs that were already fixed in commit `a2ddc97` (spy theme background, missing assets)
- Did not mention any of the recently discovered and fixed issues

### CHANGELOG.md
- Was an untracked file with no entries for recent work
- Missing all entries for issues #21-#29 and PRs #24-#32

### MICROPHONE_FEATURE.md
- Debugging section referenced `console.log` statements with `[Speech Recognition]` and `[Mic Toggle]` prefixes
- These logs were removed in PR #32 (issue #29)

### ARCHITECTURE.md
- PhantomEvent description didn't mention the new `currentProfile` prop added in PR #25

## Fix

### KNOWN_ISSUES.md
- Removed fixed bugs (spy theme background, missing assets)
- Added "Recently Fixed" table listing all 6 issues and their PRs
- Added "Previously Fixed" section for commit `a2ddc97` fixes
- Updated empty mob list issue to include Sci-Fi and Fantasy themes (5 themes total, not 3)

### CHANGELOG.md
- Added entries for all 6 PRs (#24-#32) with descriptions of each fix
- Tracked as a new file in git

### MICROPHONE_FEATURE.md
- Updated debugging section to note that console.log statements were removed (issue #29)
- Added guidance for local debugging

### ARCHITECTURE.md
- Updated PhantomEvent description to note `currentProfile` prop

## Files changed

- `docs/KNOWN_ISSUES.md`
- `docs/CHANGELOG.md`
- `docs/MICROPHONE_FEATURE.md`
- `docs/ARCHITECTURE.md`
