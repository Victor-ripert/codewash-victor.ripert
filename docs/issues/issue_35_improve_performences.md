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

## 8. Open Questions
1. How should the "percentage" be calculated? Should it trace actual network/disk file bytes loaded, or rely on a simulated/mock progress based on component mounting stages?
2. What are the exact target metrics the team considers "success" (e.g., < 1s Load Time, solid 60 FPS)?
3. Do we need an in-game developer overlay for monitoring FPS and load times continuously during this branch's implementation?
