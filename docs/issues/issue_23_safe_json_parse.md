# Issue #23 — Unprotected JSON.parse in App.jsx crashes on corrupted localStorage

## Problem

In `App.jsx`, the `profileNames` and `parentStatus` state initializers called `JSON.parse()` without any error handling. If localStorage contained corrupted or invalid JSON (e.g. from a browser extension, manual tampering, or a storage bug), the entire application would crash on startup with a white screen.

Additionally, `parseInt()` for `currentProfile` was missing its radix parameter, which can cause unexpected behavior in edge cases.

### Affected lines (before fix)

```javascript
const [currentProfile, setCurrentProfile] = useState(() =>
    localStorage.getItem('currentProfile_v1') ? parseInt(localStorage.getItem('currentProfile_v1')) : 1
);
const [profileNames, setProfileNames] = useState(() =>
    localStorage.getItem('heroProfileNames_v1') ? JSON.parse(localStorage.getItem('heroProfileNames_v1')) : defaultProfileNames
);
const [parentStatus, setParentStatus] = useState(() =>
    localStorage.getItem('heroParentStatus_v1') ? JSON.parse(localStorage.getItem('heroParentStatus_v1')) : { 1: false, 2: false, 3: false }
);
```

## Fix

### 1. Wrapped JSON.parse in try-catch

Both `profileNames` and `parentStatus` initializers now catch parse errors and fall back to their default values:

```javascript
const [profileNames, setProfileNames] = useState(() => {
    try { return JSON.parse(localStorage.getItem('heroProfileNames_v1')) || defaultProfileNames; }
    catch { return defaultProfileNames; }
});
```

### 2. Added radix to parseInt

```javascript
parseInt(localStorage.getItem('currentProfile_v1'), 10)
```

## Files changed

- `src/App.jsx`
