# Issue 29: Remove debug console.log statements from production code

## 1. Context
- Branch: `29-remove-debug-logs`
- Area: `src/App.jsx`, speech recognition and microphone toggle logic
- Environment: Web app (React), desktop and mobile

## 2. Problem Summary
- Fifteen `console.log` statements used during speech recognition development were left in production code. These debug logs clutter the browser console, leak internal implementation details to end users, and can degrade performance on low-end devices when speech recognition fires rapidly.

## 3. Observations
1. All 15 debug statements use `console.log` with descriptive prefixes such as `[Battle]`, `[Speech Recognition]`, and `[Mic Toggle]`.
2. The codebase also contains `console.warn` calls inside catch blocks and `console.error` calls for actual error reporting. These are intentional and must be preserved.
3. No conditional logic depends on the return value of `console.log`, so every removal is safe with no side effects.
4. The debug logs span the following functions in `src/App.jsx`:
   - `endBattle`
   - `stopVoiceRecognition`
   - `startVoiceListener`
   - `toggleMicListener`

## 4. Impact
- User impact: Console noise when using the speech recognition / reading challenge feature. No functional impact.
- Technical impact: Developers reviewing console output during debugging must filter through irrelevant noise.
- Risk level: Low (cosmetic cleanup, no behavioral change).

## 5. Suspected Causes
1. Debug logging was added during initial speech recognition implementation and never removed before merge.
   - Evidence for: all 15 statements follow a consistent `[Tag] message` pattern typical of development-time tracing.
   - Evidence against: none observed.

## 6. Proposed Fixes
1. Remove all 15 `console.log` debug statements (implemented).
   - Why it works: no code logic depends on these calls; they are pure side effects for developer observation.
   - Tradeoffs: developers lose runtime tracing, but can re-add temporarily or use browser breakpoints.
   - Implementation notes: in cases where `console.log` was the only statement inside an `if` branch (e.g., the `no-speech` error case), a comment was left to preserve the intent of the empty branch.

## 7. Lines Removed
| Function | Original Line | Statement |
|---|---|---|
| `endBattle` | 924 | `console.log('[Battle] Ending battle, cleaning up speech recognition')` |
| `stopVoiceRecognition` | 997 | `console.log('[Speech Recognition] Stopped')` |
| `startVoiceListener` | 1015 | `console.log('[Speech Recognition] Already initialized, skipping')` |
| `startVoiceListener` | 1019 | `console.log('[Speech Recognition] Initializing for skill:', targetId)` |
| `startVoiceListener` | 1025 | `console.log('[Speech Recognition] Started listening')` |
| `startVoiceListener` | 1031 | `console.log('[Speech Recognition] Ended')` |
| `startVoiceListener` | 1041 | `console.log('[Speech Recognition] Auto-restarting')` |
| `startVoiceListener` | 1054 | `console.log('[Speech Recognition] No speech detected, continuing...')` |
| `startVoiceListener` | 1066 | `console.log('[Speech Recognition] Recognized text:', t)` |
| `startVoiceListener` | 1072 | `console.log('[Speech Recognition] Correct answer!')` |
| `startVoiceListener` | 1076 | `console.log('[Speech Recognition] Wrong answer')` |
| `startVoiceListener` | 1084 | `console.log('[Speech Recognition] Start command issued')` |
| `toggleMicListener` | 1092 | `console.log('[Mic Toggle] isListening:', isListening)` |
| `toggleMicListener` | 1102 | `console.log('[Mic Toggle] Stopping recognition')` |
| `toggleMicListener` | 1106 | `console.log('[Mic Toggle] Starting recognition')` |

## 8. Lines Kept
- All `console.warn` in catch blocks (error stopping, API not available)
- All `console.error` lines (speech recognition errors, microphone permission denied, failed to start)

## 9. Validation Plan
1. Open the app and start a reading challenge battle.
2. Open the browser console and verify no `[Speech Recognition]`, `[Battle]`, or `[Mic Toggle]` log messages appear.
3. Verify that `console.error` messages still appear when microphone permission is denied or other errors occur.
4. Verify speech recognition still functions correctly (start, stop, auto-restart, correct/wrong answer detection).

## 10. Recommendation
- This is a straightforward cleanup with zero functional risk. For future development, consider adding a debug logging utility that can be toggled via an environment variable or build flag, so debug logs are automatically stripped from production builds.
