# Issue #22 — PhantomEvent cooldown shared across all player profiles

## Problem

The `PhantomEvent` component (`src/components/PhantomEvent.jsx`) stored its spawn cooldown timestamp in a single global localStorage key: `phantomEvent_lastSpawn_v1`. This caused the phantom cooldown to be shared across all 3 player profiles.

When switching profiles, the new profile inherited the cooldown from the previous one, meaning a phantom that just spawned for Profile 1 would also be on cooldown for Profile 2 and 3.

## Fix

### 1. Made localStorage key profile-aware

Replaced the static constant:
```javascript
const PHANTOM_COOLDOWN_KEY = 'phantomEvent_lastSpawn_v1';
```

With a function that generates per-profile keys:
```javascript
const getPhantomCooldownKey = (profileId) => `phantomEvent_lastSpawn_v1_p${profileId}`;
```

### 2. Added `currentProfile` prop

The component now accepts a `currentProfile` prop (defaults to 1) and uses it in all localStorage read/write operations.

### 3. Updated App.jsx

Passed the `currentProfile` state to the `<PhantomEvent>` component.

### 4. Updated dependency arrays

Added `currentProfile` to the `useCallback` dependency arrays for `scheduleNextSpawn` and `spawnPhantom` so the cooldown recalculates when profiles change.

## Files changed

- `src/components/PhantomEvent.jsx`
- `src/App.jsx`
