# Changelog

All notable changes implemented since the initial codebase handoff.

## PR #24 — CosmeticsDrawer i18n (issue #21)

### Bug Fix
- **CosmeticsDrawer** (`src/components/drawers/CosmeticsDrawer.jsx`): All hardcoded English strings ("Themes & Cosmetics", "Theme Select", "Border Effects", "ACTIVE", "Color", tooltip text) replaced with i18n `t()` calls.
- Added `cosmetics.*` translation keys to all 4 locale files (en, es, fr, eo).
- Effect names/descriptions now pull from existing `effects.border.*` and `effects.achievement.*` keys instead of duplicated hardcoded values.

---

## PR #25 — PhantomEvent profile isolation (issue #22)

### Bug Fix
- **PhantomEvent** (`src/components/PhantomEvent.jsx`): Phantom spawn cooldown was stored in a single global localStorage key, causing it to leak between player profiles. Now uses per-profile keys (`phantomEvent_lastSpawn_v1_p{profileId}`).
- Added `currentProfile` prop to PhantomEvent component.

---

## PR #26 — JSON.parse safety (issue #23)

### Bug Fix
- **App.jsx**: `profileNames` and `parentStatus` state initializers used `JSON.parse()` without try-catch. Corrupted localStorage would crash the app on startup. Now wrapped in try-catch with fallback to defaults.
- Added missing radix parameter to `parseInt()`.

---

## PR #30 — PhantomEvent i18n (issue #27)

### Bug Fix
- **PhantomEvent** (`src/components/PhantomEvent.jsx`): Hardcoded `"+1 Level!"` and `"Phantom"` alt text replaced with i18n `t()` calls.
- Added `phantom.levelUp` translation key to all 4 locale files.

---

## PR #31 — Fisher-Yates shuffle (issue #28)

### Bug Fix
- **SkillCard** (`src/components/skills/SkillCard.jsx`): Memory game card shuffle used `sort(() => Math.random() - 0.5)` which produces biased distributions. Replaced with Fisher-Yates (Knuth) shuffle for uniform randomization.

---

## PR #32 — Debug log cleanup (issue #29)

### Cleanup
- **App.jsx**: Removed 15 `console.log` debug statements from speech recognition and mic toggle functions. Kept `console.warn` and `console.error` in catch blocks for actual error reporting.

---

## Commit `bd6fd0a` — Documentation & Project Launch

### Files added
- **`README.md`** — Full project README with features, tech stack, installation steps, scripts, project structure, and game mechanics documentation.
- **`docs/ARCHITECTURE.md`** — Architecture overview: data flow, state persistence, key files with line counts, and known architecture issues.

---

## Commit `a2ddc97` — Themes Fix, New Themes, Grid Layout

### Bug Fixes
- **Spy theme background** (`src/constants/gameData.jsx`): The Spy theme was pointing to `minecraft.png` instead of `spy.png`. Fixed so it now shows its own background.
- **Spy theme logo** (`src/constants/gameData.jsx`): Was referencing `spy_logo.png` which didn't exist. Changed to `spy.png`.
- **Broken memory card backs** (`src/constants/gameData.jsx`): K-Pop, Pokemon, and Spy themes referenced non-existent card back images (`kpop_memorycard.jpg`, `pokemon_memorycard.jpg`, `spy_memorycard.jpg`). All three now fall back to the shared `memorycard.jpg` that actually exists.

### New Features
- **2 new themes** (`src/constants/gameData.jsx`):
  - **Sci-Fi** (`scifi`) — uses `Scifi.png`, space-themed skill names (Decryption, Quantum Math, Star Logs, etc.).
  - **Fantasy** (`fantasy`) — uses `fantasy.png`, magic-themed skill names (Ancient Scrolls, Potion Brewing, Rune Carving, etc.).
  - Both added to `THEME_CONFIG` and `THEMES_LIST`.
- **3-column theme grid** (`src/components/drawers/CosmeticsDrawer.jsx`): Theme selector changed from `grid-cols-2` to `grid-cols-3` to accommodate 6 themes.

### Documentation
- **`docs/ADDING_THEMES.md`** — Step-by-step guide for adding new themes (assets, config, optional customizations).
- **`docs/KNOWN_ISSUES.md`** — Documents remaining bugs (missing assets, empty mob lists), dead code, and monolithic components.
