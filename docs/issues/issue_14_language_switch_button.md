# Issue 14: Add language switch button

## 1. Context
- Branch: `14-add-a-button-to-change-language`
- Area: i18n UX and settings drawer
- Environment: Web app (React + i18next), desktop and mobile

## 2. Problem Summary
- The app has translation infrastructure (`i18next`, English and Spanish locale files, language detection) but no visible UI action to change language at runtime. Users are forced to rely on browser language or previously cached language, which makes language switching non-discoverable and hard to control.

## 3. Observations
1. i18n is configured with `LanguageDetector` and localStorage caching, which supports manual switching, but no explicit call site to `i18n.changeLanguage(...)` is present in UI components.
2. `SettingsDrawer` contains profile, audio, and danger-zone controls, but no language section or button.
3. Locale files already include broad `settings` key groups, so adding one more settings subsection for language labels is structurally consistent.
4. Current behavior depends on auto-detection (`localStorage`, `navigator`), so first-time users may not know they can run the app in another language.

## 4. Impact
- User impact: Bilingual users, families, and testers cannot easily switch between `en` and `es` from the UI.
- Technical impact: Translation quality validation is slower because QA needs storage hacks or browser-level language changes.
- Risk level: Medium (feature gap, no data-loss risk).

## 5. Suspected Causes
1. i18n bootstrap was implemented before UX controls for language preference.
- Evidence for: i18n provider and resources exist, but no language selector in `SettingsDrawer`.
- Evidence against: none observed.
2. Feature scope focused on translation migration first, leaving language toggle for a later branch.
- Evidence for: existing issue docs prioritize moving strings to i18n and wiring provider.
- Evidence against: app already has a mature settings panel where this control naturally fits.

## 6. Proposed Fixes
1. Add a dedicated language button group in `SettingsDrawer` (recommended).
- Why it can work: centralizes user preferences in one discoverable panel.
- Tradeoffs: requires adding translation keys and minor layout changes.
- Implementation notes: update `src/components/drawers/SettingsDrawer.jsx`; call `i18n.changeLanguage('en'|'es')` via `useTranslation()`; add keys in `src/i18n/locales/en.json` and `src/i18n/locales/es.json` (for section title and button labels).
2. Add a compact global language toggle in the main app header/top actions.
- Why it can work: faster access during gameplay and testing.
- Tradeoffs: can increase UI clutter on smaller screens and duplicates settings behavior.
- Implementation notes: add a small `EN/ES` segmented button near existing top controls in `src/App.jsx`; keep state source in i18n instance to avoid duplicate local state.

## 7. Validation Plan
1. Open settings, click `EN` and `ES`, and verify visible text updates immediately without refresh.
2. Reload the page and verify selected language persists through i18next localStorage cache.
3. Verify both desktop and mobile layouts keep the new controls usable and not clipped.
4. Run existing smoke tests and add at least one UI test asserting language switch updates a known label (for example `settings.title` or `menus.achievements`).

## 8. Open Questions
1. Should language switching be available only in settings, or also as a quick-access button in the main screen?
2. Do we want only `en`/`es` now, or should the UI component be built as extensible for future locales?

## 9. Recommendation
- Preferred fix: Option 1 (language button group in `SettingsDrawer`) and defer quick-access toggle until a proven need appears.
- Why: low implementation complexity, clear discoverability, and alignment with user preference controls.
- Follow-up tasks: add translation keys for language labels; implement `changeLanguage` handler; add one regression test for runtime switch + persistence.
