# Issue #12: Spy Theme Background Configuration Bug

## Summary
The Spy theme in the application uses an incorrect or inconsistent background asset configuration, causing visual inconsistencies when the theme is selected.

## Current Status
**Reported in**: [KNOWN_ISSUES.md](../KNOWN_ISSUES.md)  
**Severity**: Medium  
**Type**: Visual Bug

## Affected Component
- **File**: `src/constants/gameData.jsx`
- **Config Object**: `THEME_CONFIG['spy']`
- **Lines**: ~205-209

## Problem Description

### Current Configuration
```javascript
'spy': {
    name: 'Spy',
    style: { 
        backgroundImage: `url('assets/themes/spy.png')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
    },
    assets: {
        logo: 'assets/themes/spy.png',  // ⚠️ Using same file as background
        cardBack: 'assets/themes/memorycard.jpg',
        mobs: {}
    },
    skills: { ... }
}
```

### Issue Details
1. **Logo vs Background Conflict**: The `logo` property currently uses `'assets/themes/spy.png'`, which is the same file as the background image. This suggests:
   - Either the logo should point to a dedicated logo file (`assets/themes/spy_logo.png`)
   - Or the implementation doesn't distinguish between the two assets (both display the same image)

2. **Missing Assets**: The theme references `assets/themes/memorycard.jpg` from the base theme, but should ideally have theme-specific memory card backgrounds:
   - `assets/themes/spy_memorycard.jpg` (missing)

3. **Empty Mob List**: The `mobs: {}` object is empty, meaning the spy theme falls back to default Minecraft mobs for all games, defeating the theme customization purpose.

## Impact
- Spy theme appears visually inconsistent (same image for both logo and background)
- No dedicated memory card styling for Spy theme
- Theme is purely cosmetic — no actual gameplay customization
- User expectations are not met (selected theme should fully customize appearance)

## Root Cause
The theme configuration system was not completed for non-Minecraft themes. The `THEME_CONFIG` establishes the structure but wasn't populated with complete assets for alternative themes.

## Proposed Solution

### Option 1: Minimal Fix (Recommended Short-term)
1. **Verify asset existence** in `public/assets/themes/`:
   - Confirm `spy.png` exists and is appropriate for background
   - Check if dedicated logo file exists or create `spy_logo.png`

2. **Update theme configuration**:
```javascript
'spy': {
    name: 'Spy',
    style: { 
        backgroundImage: `url('assets/themes/spy.png')`,  // Keep as-is if correct
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
    },
    assets: {
        logo: 'assets/themes/spy_logo.png',  // Use dedicated logo file
        cardBack: 'assets/themes/spy_memorycard.jpg',  // Theme-specific memory cards
        mobs: {}  // Keep empty if no custom mobs needed
    },
    skills: { ... }
}
```

3. **Create/provide missing assets**:
   - Ensure `public/assets/themes/spy_logo.png` exists
   - Create or provide `public/assets/themes/spy_memorycard.jpg`

### Option 2: Comprehensive Fix (Recommended Long-term)
Implement theme-specific mob lists and complete asset suites for all themes:

```javascript
'spy': {
    name: 'Spy',
    style: { 
        backgroundImage: `url('assets/themes/spy.png')`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
    },
    assets: {
        logo: 'assets/themes/spy_logo.png',
        cardBack: 'assets/themes/spy_memorycard.jpg',
        mobs: {
            // Define spy-themed mobs/characters
            'Agent': 'assets/mobs/spy/agent.png',
            'Double Agent': 'assets/mobs/spy/double_agent.png',
            'Hacker': 'assets/mobs/spy/hacker.png',
            // ... more spy-specific mobs
        }
    },
    skills: { ... }
}
```

**Implementation Steps**:
1. Design spy-themed character/mob assets
2. Design spy-specific memory card backgrounds
3. Create logo for spy theme
4. Update all theme configurations consistently
5. Add asset validation/fallback mechanism
6. Document theme asset requirements in [ADDING_THEMES.md](../ADDING_THEMES.md)

## Testing Checklist

- [ ] Verify spy theme background displays correctly (not showing Minecraft or wrong image)
- [ ] Verify spy theme logo displays correctly in UI
- [ ] Test memory game with spy theme — card backs should have spy styling
- [ ] Test skill cards display with correct mob choices
- [ ] Verify fallback behavior if image is missing
- [ ] Test all other themes still work correctly

## Related Issues
- Missing theme assets for K-Pop, Pokemon, and Sci-Fi themes
- Non-Minecraft themes have empty mob lists
- See also: [KNOWN_ISSUES.md](../KNOWN_ISSUES.md) - "Missing theme assets" section

## Files to Modify
1. `src/constants/gameData.jsx` — Update THEME_CONFIG['spy']
2. `public/assets/themes/` — Add missing spy theme assets
3. `docs/ADDING_THEMES.md` — Document required assets for themes

## Priority
**Medium** — This is a visual bug affecting theme selection, but doesn't prevent game functionality.
