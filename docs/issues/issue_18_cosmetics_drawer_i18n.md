# Issue #18 — CosmeticsDrawer hardcoded English strings

## Problem

The `CosmeticsDrawer` component (`src/components/drawers/CosmeticsDrawer.jsx`) contained multiple hardcoded English strings that were not using the i18n translation system. This meant the entire cosmetics/themes panel stayed in English regardless of the user's language setting.

### Affected strings

| Hardcoded string | Location |
|---|---|
| `"Themes & Cosmetics"` | Drawer title (h2) |
| `"Theme Select"` | Section header |
| `"Border Effects"` | Section header |
| `"ACTIVE"` | Active border badge |
| `"Color"` | Color picker label |
| `"Badge Required"` | Locked tooltip |
| `"Earn the ... badge to unlock this effect"` | Locked tooltip description |
| `"Locked"` / `"Unlocked"` | Lock status labels |
| Effect names and descriptions | All border/achievement effects |

Additionally, the `BORDER_EFFECTS` and `ACHIEVEMENT_EFFECTS` arrays duplicated effect names and descriptions that already existed in the locale files under `effects.border.*` and `effects.achievement.*`.

## Fix

### 1. Added `cosmetics` translation keys to all 4 locale files

New keys added to `en.json`, `es.json`, `fr.json`, `eo.json`:

```json
"cosmetics": {
    "title": "Themes & Cosmetics",
    "themeSelect": "Theme Select",
    "borderEffects": "Border Effects",
    "active": "ACTIVE",
    "color": "Color",
    "badgeRequired": "{{badge}} Badge Required",
    "earnBadge": "Earn the {{badge}} badge to unlock this effect",
    "locked": "Locked",
    "unlocked": "Unlocked"
}
```

### 2. Updated `CosmeticsDrawer.jsx`

- Added `useTranslation` hook import and usage
- Replaced all hardcoded strings with `t()` calls
- Removed duplicated `name` and `description` fields from `BORDER_EFFECTS` and `ACHIEVEMENT_EFFECTS` arrays
- Created `EFFECT_I18N_KEY` mapping to resolve effect IDs to locale keys (e.g. `solid-picker` → `solidPicker`)
- Effect names/descriptions now read from existing `effects.border.*` and `effects.achievement.*` locale keys

### 3. Verification

- Locale parity test (`localeParity.test.js`) passes — all 4 locale files have identical key coverage

## Files changed

- `src/components/drawers/CosmeticsDrawer.jsx`
- `src/i18n/locales/en.json`
- `src/i18n/locales/es.json`
- `src/i18n/locales/fr.json`
- `src/i18n/locales/eo.json`
