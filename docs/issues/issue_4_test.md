## Issue 4: Automated tests and CI/CD

### Problem
- No automated tests or CI pipeline; changes ship without safety nets.
- No test tooling configured in [package.json](package.json) for unit, component, or end-to-end coverage.
- Electron build path exists but is untested in automation.

### Goal
Introduce a containerized GitHub Actions pipeline that runs multiple suites (lint/unit/component/e2e) on every push/PR, using separate containers when helpful (e.g., Playwright base image for browser tests).

### Plan
1) **Add test tooling**
	- Unit/component: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@vitejs/plugin-react` already present.
	- E2E: `@playwright/test` (runs against built/preview server).
	- Scripts to add in [package.json](package.json):
	  - `test:lint`: `eslint .`
	  - `test:unit`: `vitest run`
	  - `test:component`: `vitest run --dir src --ui` (or group with unit under a `test` glob); use jsdom environment.
	  - `test:e2e`: `playwright test` (assumes `npm run build && npm run preview -- --host 0.0.0.0 --port 4173`).

2) **Author minimal tests**
	- `src/__tests__/app.test.jsx`: sanity render of `App` using Testing Library.
	- `src/components/__tests__/MenuDrawer.test.jsx`: checks headers/labels.
	- `e2e/basic.spec.ts`: Playwright opens preview server, asserts key UI text is present.

3) **GitHub Actions workflow** (`.github/workflows/ci.yml`)
	- Trigger on `pull_request` and `push` to `main`.
	- Use `strategy.matrix.suite: [lint, unit, component, e2e]`.
	- `lint/unit/component` jobs run in `container: node:20-bookworm` (or `node:20-alpine` if glibc not needed) with `actions/setup-node` cache `npm`.
	- `e2e` job uses `container: mcr.microsoft.com/playwright:v1.49.0-jammy` to get browsers; install deps, build, start `npm run preview -- --host 0.0.0.0 --port 4173 &`, then `npx playwright test --project=chromium` against `http://127.0.0.1:4173`.
	- Common steps: checkout, cache node_modules, `npm ci`, run matrix-specific script via `npm run test:${{ matrix.suite }}`.

4) **Artifacts and reporting**
	- Configure Vitest to emit JUnit/coverage if desired; upload reports via `actions/upload-artifact` for failed runs.
	- Playwright automatically captures traces/screenshots on failure; upload them from `playwright-report/`.

### Definition of done
- New test dependencies and scripts added; sample tests exist and pass locally via `npm run test:lint`, `npm run test:unit`, `npm run test:component`, `npm run test:e2e` (after `npm run build && npm run preview`).
- `.github/workflows/ci.yml` runs all suites in containers on push/PR; matrix isolates suite responsibilities.
- CI artifacts (Playwright traces, optional coverage/JUnit) upload on failure for debugging.
