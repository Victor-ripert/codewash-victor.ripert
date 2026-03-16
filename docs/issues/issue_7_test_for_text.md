## Issue 7: Text regression safety before i18n

### Problem
- UI copy is currently hardcoded; migrating to translation files risks unintentionally changing visible text.
- We need automated checks that assert key user-facing strings remain unchanged during the i18n rollout.

### What we added
- **Playwright text-regression spec**: [e2e/text-regression.spec.ts](../e2e/text-regression.spec.ts) runs in the existing e2e suite and asserts that critical strings still render. It opens drawers/modals via the icon buttons and validates:
	- Settings drawer: “Settings”, “Audio Configuration”, “Music Volume”, “SFX Volume”, “Danger Zone”, “DELETE PROFILE PROGRESS”.
	- Reset modal: “Delete Progress?”, irreversible warning, “Type DELETE to confirm:”, “Cancel”, “Delete”.
	- Bug report modal: “Discovered a bug?”, “Whoa... That sucks...”.
	- Menu drawer: “Achievements”, “Total Level:”, “Badges:”, “Achievements:”.
	- Skill colors: “Pink”, “Cyan”.
- Uses Playwright `webServer` (build + preview) so the app auto-starts in CI.

### How it protects the migration
- Assertions are on rendered text, not on source constants, so moving strings into translation files keeps tests green as long as the copy stays identical.
- Deterministic flow: targets stable icon button positions (top-left settings, top-right menu, bottom-right bug) and closes overlays to avoid flake.

### How to run
- Local: `npm run test:e2e` (Playwright will build + start preview via `webServer`).
- CI: already included in the `e2e` matrix job in [.github/workflows/ci.yml](../.github/workflows/ci.yml).

### Next steps after i18n
- If copy changes intentionally (e.g., wording tweaks), update the expected strings in the spec to match the new translations.
- Consider adding data-testid attributes for more resilient selectors if layout shifts during the migration.
