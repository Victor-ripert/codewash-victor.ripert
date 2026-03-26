# Issue 27: PhantomEvent hardcoded strings not translated

## 1. Context
- Branch: `27-phantom-event-i18n`
- Area: i18n coverage for the PhantomEvent component
- Environment: React web app using `i18next` + `react-i18next`

## 2. Problem Summary
- The `PhantomEvent` component contains two hardcoded English strings that are never passed through the i18n translation system:
  - The `alt` attribute on the phantom image is hardcoded as `"Phantom"`.
  - The reward text displayed on click is hardcoded as `"+1 Level!"`.
- When users switch to a non-English language, these strings remain in English, breaking the localized experience.

## 3. Observations
1. `PhantomEvent.jsx` does not import or use the `useTranslation` hook.
2. The `alt="Phantom"` attribute is a static English string; the translated mob name already exists at `sound.mobNames.phantom` in all locale files.
3. The `+1 Level!` reward text is hardcoded inline in the JSX with no translation key.
4. All four locale files (`en.json`, `es.json`, `fr.json`, `eo.json`) lack a dedicated `phantom` translation section for component-specific strings.

## 4. Impact
- User impact: non-English users see untranslated strings in the phantom event, degrading the localized experience.
- Accessibility impact: screen readers announce the English alt text regardless of the selected language.
- Risk level: Low (cosmetic/i18n only, no functional regression).

## 5. Suspected Causes
1. The PhantomEvent component was added after the initial i18n rollout and was not wired into the translation system.
   - Evidence for: no `useTranslation` import, no `t()` calls anywhere in the file.
   - Evidence against: the mob name key `sound.mobNames.phantom` already exists, suggesting awareness of the i18n system.

## 6. Proposed Fixes
1. Add a `phantom.levelUp` translation key to all four locale files.
   - `en.json`: `"+1 Level!"`
   - `es.json`: `"+1 Nivel!"`
   - `fr.json`: `"+1 Niveau!"`
   - `eo.json`: `"+1 Nivelo!"`
2. Update `PhantomEvent.jsx` to:
   - Import `useTranslation` from `react-i18next`.
   - Call `const { t } = useTranslation()` inside the component.
   - Replace `alt="Phantom"` with `alt={t('sound.mobNames.phantom')}`.
   - Replace the hardcoded `+1 Level!` text with `{t('phantom.levelUp')}`.

## 7. Validation Plan
1. Switch to each supported language (en, es, fr, eo) and trigger the phantom event.
2. Verify the alt text matches the translated mob name for the active language.
3. Verify the reward text displays the translated "+1 Level!" string for the active language.
4. Confirm no regressions in English mode.

## 8. Implementation Results
- Completed: added `phantom.levelUp` key to all four locale files (`en.json`, `es.json`, `fr.json`, `eo.json`).
- Completed: updated `PhantomEvent.jsx` to import and use `useTranslation` hook.
- Completed: replaced hardcoded `alt="Phantom"` with `alt={t('sound.mobNames.phantom')}`.
- Completed: replaced hardcoded `+1 Level!` text with `{t('phantom.levelUp')}`.
