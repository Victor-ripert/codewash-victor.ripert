# Issue 15: Add other languages

## 1. Context
- Branch: `15-add-other-languages`
- Area: i18n scalability, locale resources, and settings language selector
- Environment: React web app using `i18next` + `react-i18next`

## 2. Problem Summary
- The app now supports runtime language switching in settings, but translation resources are currently limited to `en` and `es`. This branch specifically needs to add `fr` (French) and `eo` (Esperanto). The UI is partially extensible (`LOCALE_OPTIONS` exists), yet adding new languages still requires multiple manual edits and no formal checklist currently ensures translation quality or key parity.

## 3. Observations
1. `src/constants/locales.js` is data-driven, but currently exposes only two entries (`en`, `es`).
2. `src/i18n/index.js` statically imports and registers only `en.json` and `es.json`.
3. Locale files are broad and nested (`app`, `menus`, `settings`, `modals`, `profile`, `skills`, `effects`, `sound`), increasing risk of missing keys during new-locale onboarding.
4. Existing e2e coverage validates language switch and persistence, but does not validate multi-locale parity for newly added languages.
5. Current translation process has no documented acceptance gate for fallback leakage (e.g., untranslated keys silently falling back to English).

## 4. Impact
- User impact: non-English and non-Spanish users cannot fully use the app in their language.
- Product impact: localization expansion becomes slower and riskier as string count grows.
- Technical impact: each new locale can introduce regressions if keys drift or partial translations are merged.
- Risk level: Medium.

## 5. Suspected Causes
1. Initial i18n rollout prioritized infrastructure and first two languages, not a repeatable language-onboarding workflow.
- Evidence for: explicit two-language setup in `src/i18n/index.js` and `src/constants/locales.js`.
- Evidence against: selector architecture is already partially extensible.
2. Missing validation tooling for translation completeness.
- Evidence for: no dedicated parity checker and no automated missing-key assertion in tests.
- Evidence against: existing tests do verify switching behavior for current languages.

## 6. Proposed Fixes
1. Establish a formal locale onboarding path (recommended).
- Why it can work: turns language additions into a repeatable and low-risk process.
- Tradeoffs: requires initial setup effort for documentation and checks.
- Implementation notes:
- Add new locale files `src/i18n/locales/fr.json` and `src/i18n/locales/eo.json`.
- Register locale resources in `src/i18n/index.js`.
- Add locale entries in `src/constants/locales.js` (`fr`, `eo`).
- Define a checklist in docs for required keys and review criteria.

2. Add translation parity safeguards.
- Why it can work: catches missing keys before release.
- Tradeoffs: introduces maintenance overhead for test utilities/scripts.
- Implementation notes:
- Add a test utility that compares locale key trees against `en.json` as canonical source.
- Fail CI on missing/extra key mismatches for mandatory namespaces.
- Optionally allow explicit ignore lists for intentionally deferred keys.

3. Expand regression tests for newly added languages.
- Why it can work: validates real user flows for each locale.
- Tradeoffs: e2e runtime can increase as locales grow.
- Implementation notes:
- Add parameterized UI text checks for selected critical labels (`settings.title`, `menus.achievements`, reset modal labels).
- Keep one smoke path per locale and one persistence check path.

## 7. Validation Plan
1. Add both locales (`fr`, `eo`) and verify they appear automatically in settings language options.
2. Switch to French and verify key UI labels update without reload.
3. Switch to Esperanto and verify key UI labels update without reload.
4. Refresh the page and verify persisted language remains active for each newly selected locale.
5. Run parity checks against `en.json` and confirm no missing required keys in `fr.json` and `eo.json`.
6. Run unit + e2e localization tests to confirm no regression on `en`/`es`.

## 8. Open Questions
1. Resolved: locales in scope for this branch are French (`fr`) and Esperanto (`eo`).
2. Resolved: full translation coverage is required at first merge.
3. Resolved: locale labels in selector are endonym-only.

## 9. Recommendation
- Preferred fix: combine Option 1 + Option 2, then add Option 3 as regression hardening.
- Why: this balances immediate delivery (new locales) with long-term quality control (parity checks and repeatable workflow).
- Follow-up tasks:
- Add `fr.json` and `eo.json`, then register both in i18n resources.
- Add `fr` and `eo` entries in `LOCALE_OPTIONS`.
- Add parity-check test utility and CI integration.
- Update docs with onboarding checklist and acceptance criteria.

## 10. Implementation Results
- Completed: added `src/i18n/locales/fr.json` with full key parity.
- Completed: added `src/i18n/locales/eo.json` with full key parity.
- Completed: registered `fr` and `eo` in `src/i18n/index.js` resources.
- Completed: added `fr` and `eo` in `src/constants/locales.js` for settings selector.
- Completed: updated locale label keys to include `fr` and `eo` in `en.json` and `es.json`.
- Completed: extended unit language switch coverage in `src/components/drawers/__tests__/SettingsDrawer.test.jsx`.
- Completed: added locale parity guard test in `src/i18n/__tests__/localeParity.test.js`.
- Completed: extended e2e switch/persistence coverage in `e2e/text-regression.spec.ts`.

## 11. Validation Evidence
1. Unit tests passed:
- `npm run test:unit -- src/components/drawers/__tests__/SettingsDrawer.test.jsx src/i18n/__tests__/localeParity.test.js`
2. E2E test passed:
- `npm run test:e2e -- e2e/text-regression.spec.ts`
3. Notes:
- E2E run initially failed due permission errors in `test-results/` and `dist/`; resolved with:
- `sudo chown -R "$(id -un):$(id -gn)" test-results dist`
