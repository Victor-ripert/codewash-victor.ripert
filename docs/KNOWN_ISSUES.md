# Known Issues

## Bugs

### Non-Minecraft themes have empty mob lists
- **File**: `src/constants/gameData.jsx`, lines 190, 199, 208, 218, 228
- **Issue**: K-Pop, Pokemon, Spy, Sci-Fi, and Fantasy themes have `mobs: {}` (empty objects)
- **Impact**: All themes fall back to default Minecraft mobs — themes are cosmetic only

## Code Smells

### Dead code
- `src/components/drawers/MenuDrawer_old.jsx` — superseded by `MenuDrawer.jsx`
- `src/constants/assets.js` — exports asset paths not imported anywhere

### Monolithic components
- `App.jsx` (~1500 lines) — all game state, business logic, and UI in one file
- `SkillCard.jsx` (~2000 lines) — all 6 minigames in one component

## Recently Fixed

| Issue | PR | Description |
|---|---|---|
| #21 | #24 | CosmeticsDrawer hardcoded English strings — now uses i18n |
| #22 | #25 | PhantomEvent cooldown shared across profiles — now per-profile |
| #23 | #26 | Unprotected JSON.parse in App.jsx — now wrapped in try-catch |
| #27 | #30 | PhantomEvent hardcoded strings — now translated |
| #28 | #31 | SkillCard biased shuffle — replaced with Fisher-Yates |
| #29 | #32 | Debug console.log in production — removed |

### Previously Fixed (commit `a2ddc97`)
- Spy theme wrong background (`minecraft.png` → `spy.png`)
- Missing theme assets (card backs now fall back to `memorycard.jpg`)
- Spy theme logo (`spy_logo.png` → `spy.png`)
