# Architecture

## Overview

The application is a single-page React app with an optional Electron wrapper for desktop builds. All game state lives in `App.jsx` and is passed down to child components via props.

## Data Flow

```
App.jsx (all state + business logic)
├── ProfileCard        ← player stats display
├── SkillCard (x6)     ← each minigame, receives skill state + callbacks
├── MenuDrawer         ← navigation, profile switching
├── SettingsDrawer     ← volume, sound, reset controls
├── CosmeticsDrawer    ← theme + border selection
├── BugReportModal     ← bug reporting (placeholder)
├── ResetModal         ← game reset confirmation
└── PhantomEvent       ← random special events
```

## State Persistence

- All game state is stored in `localStorage`
- Key format: `heroSkills_v23_p{1-3}` (versioned, per-profile)
- 3 independent save profiles
- Theme, border, and settings also persisted

## Key Files

| File | Lines | Role |
|------|-------|------|
| `App.jsx` | ~1500 | Monolithic main component — all state, all logic, all UI composition |
| `SkillCard.jsx` | ~2000 | All 6 minigame implementations in one component |
| `GlobalStyles.jsx` | ~1000 | All CSS animations and border effects (injected as `<style>`) |
| `gameData.jsx` | ~420 | All game constants: mobs, themes, words, items, difficulties |
| `gameUtils.js` | ~200 | Combat math, XP, mob selection, challenge generation |
| `soundManager.js` | ~150 | Audio playback system (BGM + SFX) |

## Known Architecture Issues

- `App.jsx` is a monolith (~1500 lines) — all state and logic in one component
- `SkillCard.jsx` handles all 6 different minigames in a single component
- No state management library — everything is `useState` in App.jsx
- No routing — single view with drawers/modals
- `assets.js` exports paths that are not used anywhere
- `MenuDrawer_old.jsx` is dead code (superseded by `MenuDrawer.jsx`)
