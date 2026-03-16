# Issue 1: Text translation

## Problem
- All UI copy is hardcoded in components and utilities (see [HARDCODED_TEXT_LIST.md](HARDCODED_TEXT_LIST.md)), so language changes require code edits and cannot be localized.
- No i18n module is initialized in the app (no occurrences of an i18n provider or translation files under `src/`).
- Text duplication increases risk of inconsistencies (e.g., buttons, modal messages, effect descriptions, mob names).

## Goal
Centralize all user-facing strings in translation files and serve them through an i18n module (e.g., i18next via an `I18N` wrapper), enabling language switching without code changes.

## Plan
1) **Introduce i18n shell**
	- Add dependencies for the chosen i18n module (e.g., `i18next`, `react-i18next`, `i18next-browser-languagedetector`).
	- Create `src/i18n/index.js` (or `src/i18n/i18n.js`) to initialize the instance, load resources, set a default locale, and expose a provider hook.

2) **Create translation files**
	- Add locale JSON files, e.g., `src/i18n/locales/en.json`, `src/i18n/locales/es.json`.
	- Group keys by domain: `app`, `menus`, `settings`, `modals.reset`, `modals.bugReport`, `profile`, `skills`, `effects`, `sound.mobNames`, `storageKeys`.
	- Keep keys stable and human-readable: `menus.totalLevel`, `modals.reset.confirmMessage`, `effects.border.gradient.description`.

3) **Wire provider**
	- Wrap the React root in the i18n provider in [src/main.jsx](src/main.jsx) (or App entry) so all components can call `t()`.
	- Configure fallback locale and missing-key logging to the console for development.

4) **Migrate strings incrementally**
	- Replace hardcoded strings in the highest-traffic files first: [src/App.jsx](src/App.jsx), [src/components/drawers/MenuDrawer.jsx](src/components/drawers/MenuDrawer.jsx), [src/components/drawers/SettingsDrawer.jsx](src/components/drawers/SettingsDrawer.jsx), [src/components/modals/ResetModal.jsx](src/components/modals/ResetModal.jsx), [src/components/modals/BugReportModal.jsx](src/components/modals/BugReportModal.jsx), [src/components/ui/ParentalVerificationModal.jsx](src/components/ui/ParentalVerificationModal.jsx), [src/components/profile/ProfileCard.jsx](src/components/profile/ProfileCard.jsx), [src/components/skills/SkillCard.jsx](src/components/skills/SkillCard.jsx), and mappings in [src/utils/soundManager.js](src/utils/soundManager.js).
	- For data arrays (border effects, achievement effects), move display `name`/`description` fields to translation keys while keeping IDs in code.
	- Keep non-UI constants (localStorage keys, animation names) as constants but consider grouping them under a config module to avoid string drift.

5) **Testing**
	- Smoke test default locale renders all text via translations (no fallbacks shown).
	- Switch locale manually (e.g., set `lng` to `es`) to verify translations load and UI updates.
	- Add a simple runtime check that logs missing keys in development.

## Definition of done
- i18n module initialized and provider wraps the React root.
- Locale files exist for at least `en` and one additional language.
- All user-facing strings listed in [HARDCODED_TEXT_LIST.md](HARDCODED_TEXT_LIST.md) are served through translation keys.
- No missing translation warnings at runtime; fallback locale works.

