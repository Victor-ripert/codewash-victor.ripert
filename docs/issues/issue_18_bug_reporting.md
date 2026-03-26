# Issue 18: Bug reporting

## 1. Context
- Branch: `18-bug-reporting`
- Area: in-app support flow, report transport, and operational monitoring
- Environment: game UI with existing bug-report button in main menu

## 2. Problem Summary
- A bug-report button exists but currently provides limited functionality. The feature must allow users to submit complete reports (description plus artifacts such as screenshots, game files, and logs), route them to a configurable contact, and provide a verifiable way to confirm receipt.

## 3. Observations
1. There is already a UI entry point for bug reporting, so discoverability exists, but the backend/report lifecycle is incomplete.
2. The requested report payload is larger than plain text because it can include binary attachments.
3. Contact routing must be configurable, which implies environment-driven or admin-configurable destination settings.
4. Delivery reliability matters as much as UI: users and support need confirmation that reports are received.
5. Testing must include both transport success/failure and end-to-end receipt verification.

## 4. Impact
- User impact: users cannot effectively report issues, slowing support and resolution.
- Product impact: bug triage quality is low without reproducible context (logs/files/screenshots).
- Technical impact: missing ingestion path increases ad hoc debugging and support overhead.
- Risk level: High (support workflow gap).

## 5. Suspected Causes
1. Initial bug-report implementation focused on button/modal UI and not on full ingestion architecture.
- Evidence for: existing button is present but feature is not complete.
- Evidence against: none provided.
2. No defined transport contract for mixed content (text + files).
- Evidence for: requirements ask explicitly how data should be sent and how receipt is validated.
- Evidence against: none provided.

## 6. Proposed Fixes
1. Implement a backend ticket-ingestion endpoint with multipart upload (recommended).
- Why it can work: supports text fields and attachments in one request, with strong validation and storage control.
- Tradeoffs: requires backend work (API, storage, auth/rate limiting).
- Implementation notes:
- Add endpoint like `POST /api/bug-reports` using `multipart/form-data`.
- Required fields: summary, reproduction steps, expected/actual result, app version, platform, timestamp.
- Optional attachments: screenshots, save/game files, log bundles with size/type limits.
- Store files in object storage (or secure server path) and metadata in DB.
- Return `reportId` and `receivedAt` on success.

2. Add configurable report destination and routing.
- Why it can work: keeps contacts changeable without code edits.
- Tradeoffs: requires config governance and secret management.
- Implementation notes:
- Configure destination via environment/config (`BUG_REPORT_EMAIL`, webhook URL, issue-tracker token).
- Route report to one primary sink:
- Option A: create issue in tracker (GitHub/Jira) with attachments/links.
- Option B: send structured email with links to stored attachments.
- Keep destination abstracted behind a `BugReportDispatcher` service.

3. Add receipt confirmation and observability.
- Why it can work: provides user confidence and operational traceability.
- Tradeoffs: introduces telemetry and status tracking requirements.
- Implementation notes:
- UI shows success toast with `reportId`.
- Persist server-side status states (`received`, `dispatched`, `failed_dispatch`).
- Add retry queue for dispatch failures and alerting for repeated failures.

## 7. Validation Plan
1. Unit tests:
- Validate payload schema, attachment constraints (size/type/count), and dispatcher behavior.
2. Integration tests:
- Submit multipart report with sample files and verify DB record + stored attachments + generated `reportId`.
3. End-to-end tests:
- Simulate user report flow from main menu button through confirmation message.
4. Receipt tests:
- Verify downstream destination gets the report (tracker item/email/webhook call) and correlate by `reportId`.
- Add automated check or mock sink in CI to assert dispatch acknowledgment.
5. Failure-path tests:
- Network/API failures, oversized files, invalid file type, and destination outage must show actionable user errors and preserve logs.

## 8. Open Questions
1. Resolved: primary destination is a locally hosted minimal Express backend constructed for this purpose since no backend previously existed. Bug reports are saved locally to `backend/reports.json` and attached files to `backend/uploads/`.
2. Resolved: limits are max 3 files, max 5 MB each.
3. Resolved: No strict configuration for TTL or redaction policy.
4. Resolved: Bug reporting is fully anonymous.

## 9. Recommendation
- Implementation: Custom minimal Express backend running on `http://localhost:3001/api/reports` with local file storage.
- Frontend matches file size and quantity logic implicitly via Javascript. 

## 10. Implementation Results
- Completed: Built `backend/server.js` accepting multipart form data via `multer`.
- Completed: Modifed `BugReportModal.jsx` into a fully functioning submittal component mapped to `src/utils/bugReportService.js`.
- Completed: Handled max limits of 5MB and 3 files max cleanly.
- Completed: Ensured localized translation tags dynamically cover error feedback to the user limit constraints across 4 locale matrices.

## 11. Notes
- The simple backend operates locally unless deployed. To run it locally alongside vite, a simple `npm run start:backend` handles runtime ingestion concurrently.
