# Known Issues

## Bugs

### Spy theme uses wrong background
- **File**: `src/constants/gameData.jsx`, line 205
- **Issue**: Spy theme background points to `minecraft.png` instead of `spy.png`
- **Impact**: Spy theme shows the Minecraft background instead of its own

### Missing theme assets
- **Files**: Referenced in `src/constants/gameData.jsx` (THEME_CONFIG)
- **Missing assets**:
  - `assets/themes/kpop_memorycard.jpg` — K-Pop memory card back
  - `assets/themes/pokemon_memorycard.jpg` — Pokemon memory card back
  - `assets/themes/spy_memorycard.jpg` — Spy memory card back
  - `assets/themes/spy_logo.png` — Spy theme logo
- **Impact**: Broken images when using non-Minecraft themes in Memory minigame

### Non-Minecraft themes have empty mob lists
- **File**: `src/constants/gameData.jsx`, lines 190, 199, 208
- **Issue**: K-Pop, Pokemon, and Spy themes have `mobs: {}` (empty objects)
- **Impact**: All themes fall back to default Minecraft mobs — themes are cosmetic only

## Code Smells

### Dead code
- `src/components/drawers/MenuDrawer_old.jsx` — superseded by `MenuDrawer.jsx`
- `src/constants/assets.js` — exports asset paths not imported anywhere

### Monolithic components
- `App.jsx` (~1500 lines) — all game state, business logic, and UI in one file
- `SkillCard.jsx` (~2000 lines) — all 6 minigames in one component

## Unused Assets
- `public/assets/themes/Scifi.png` — Sci-Fi background, not used by any theme
- `public/assets/themes/fantasy.png` — Fantasy background, not used by any theme
