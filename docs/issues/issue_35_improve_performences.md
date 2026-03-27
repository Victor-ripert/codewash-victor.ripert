# Issue 35: Improve performances

## 1. Context
- Branch: `35-improve-performences`
- Area: Game Startup, Main Menu Rendering, Animation performance, and UX
- Environment: Frontend (Vite, React, Electron)

## 2. Problem Summary
- The application suffers from a sluggish main menu and slow startup times. Users are left wondering if they successfully launched the application because there is no immediate visual feedback. Once loaded, the game lacks the snappy, highly responsive feel expected by the primary demographic (dopamine-craving youth).

## 3. Observations
1. Startup currently has a hanging phase where the application appears unresponsive, making users doubt their actions.
2. There is no loading screen providing percentage feedback to the user on startup progress.
3. The main menu feels "sluggish" upon interacting or navigating.
4. Current animations exist but their heavy execution limits the snappy, responsive feel of the user experience (UX).
5. There are no performance metrics currently configured to objectively measure UX improvements.

## 4. Impact
- User impact: High frustration leading to abandonment before the game even launches. Low engagement due to "laggy" menu interactions.
- Product impact: The game fails to meet the fast-paced, high-dopamine expectations of its target audience.
- Technical impact: Unoptimized asset loading and UI rendering are likely blocking the main browser thread.
- Risk level: High (core retention and usability issue).

## 5. Suspected Causes
1. **Unoptimized Asset Loading**: Loading large media files (sounds, images) synchronously or without a preloader blocks the initial paint.
2. **Main Thread Blocking**: Heavy React renders, recursive contexts, or inefficient hooks during the initial mount delay interactivity.
3. **Animation Implementation**: CSS/JS animations might be using CPU-bound paint properties (like `margin`, `width`, `height`) instead of hardware-accelerated GPU properties (`transform`, `opacity`), causing dropped frames.

## 6. Proposed Fixes
1. **Implement an Instant Loading Screen**:
   - Create a lightweight, immediate splash screen that mounts instantly (potentially native to Electron or a raw HTML template overlay) before the heavy JS bundles parse.
   - Implement an asset preloader that calculates loading percentage based on loaded assets versus total assets, updating the UI progressively.
2. **Optimize Main Menu Rendering**:
   - Use the React Profiler to identify and eliminate unnecessary re-renders. 
   - Memoize expensive components or defer rendering of off-screen elements (like background drawers or heavy un-toggled modals).
3. **Refactor Animations for Snappiness**:
   - Audit all current CSS/JS animations. 
   - Ensure all animations use GPU-accelerated properties to prevent layout trashing.
   - Tweak easing curves (e.g., using spring physics or sharp `ease-out`) to make transitions feel faster and "punchier".
4. **Instrument Performance Tracking**:
   - Integrate performance measuring logic (e.g., Web Vitals, custom FPS monitor) to track Time to Interactive (TTI), First Contentful Paint (FCP), and average Frame Rate.

## 7. Validation Plan
1. **Metrics Baseline**: Record current startup time, FCP, TTI, and Menu FPS before making any code changes.
2. **Visual Testing**: Ensure the loading screen appears instantly (< 100ms) after clicking the app icon, displaying a progressing percentage.
3. **UX Testing**: Verify menu animations feel significantly tighter and don't drop frames on mid-to-lower-range hardware.
4. **Metrics Comparison**: Compare post-implementation metrics against the original baseline to objectively prove the UX performance gains.

## 8. Decisions & Answers to Open Questions

**Q1: How should the "percentage" be calculated?**
- **Answer**: Loading progress will be simulated deterministically through a fast counter hook that increments from 0-100% within ~1 second, completing before heavy game nodes mount. This avoids the complexity of tracking actual byte-level file I/O while providing immediate visual feedback to the user.

**Q2: What are the exact target metrics the team considers "success"?**
- **Answer**: 
  - **Target Load Time**: ≤ 1 second from app launch to interactive main menu
  - **Frame Rate**: Solid 60 FPS on mid-range hardware during menu interactions and animations
  - **Loading Screen**: Must appear within milliseconds of app start

**Q3: Do we need an in-game developer overlay for monitoring FPS and load times continuously?**
- **Answer**: No. Instead, developers will rely on standalone performance auditing locally using React DevTools Profiler and browser DevTools metrics. This keeps the shipping build clean and avoids performance tax from monitoring code.

**Implementation Approach**:
1. Use `React.memo()` to memoize expensive menu components (MenuDrawer, SettingsDrawer, CosmeticsDrawer, BugReportModal)
2. Wrap UI handlers in `useCallback` to maintain reference equality between renders
3. Replace CPU-bound animations (margin, left/right positioning) with GPU-accelerated transforms
4. Accelerate transition timings for a "punchier" feel (e.g., `duration-300` → `duration-150`)
