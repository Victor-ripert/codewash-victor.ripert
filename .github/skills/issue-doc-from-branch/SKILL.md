---
name: issue-doc-from-branch
description: 'Create issue documentation files in docs/issues using branch-driven naming. Use when documenting a bug or feature branch, writing observations, and proposing possible fixes in a structured point-by-point report.'
argument-hint: 'Provide branch name (optional), issue summary, observations, and proposed fixes.'
user-invocable: true
---

# Issue Doc From Branch

## What This Skill Produces
This skill creates a new markdown file in `docs/issues/` named:

`issue_[number_of_the_branch]_[name_or_purpose_of_the_branch].md`

The file contains detailed, point-by-point issue documentation with:
- Context and scope
- Observable behavior and impact
- Possible root causes
- Proposed fixes
- Validation checklist

## When To Use
Use this skill when:
- You are working on a branch tied to an issue and need a durable write-up.
- You want consistent issue docs in `docs/issues/`.
- You need to capture both observations and actionable fix proposals.

Trigger phrases:
- "create issue doc"
- "document this issue"
- "write docs/issues markdown from branch"
- "issue_[number]_[name]"

## Procedure
1. Determine the branch source.
- Prefer the current git branch.
- If not available, ask the user for the branch name.

2. Extract issue number from branch name.
- Use the first numeric token found in the branch name.
- If no number exists, ask the user which number to use.

3. Derive the issue purpose slug.
- Use branch text after removing ticket prefix and separators.
- You may rewrite the purpose text for clarity while preserving intent.
- Normalize to lowercase snake_case using only `[a-z0-9_]`.
- Keep it short and descriptive.

4. Build the target file path.
- `docs/issues/issue_[number]_[slug].md`
- If file already exists, either:
- create a suffix variant such as `issue_[number]_[slug]_v2.md`, or
- append a new section in the existing file when the new content is directly pertinent.

5. Gather content inputs.
- Problem summary.
- Reproduction/observation points.
- User-visible impact.
- Suspected causes.
- Candidate fixes and tradeoffs.
- Verification steps.

6. Write a detailed point-by-point document.
- Follow the template in [issue template](./assets/issue-template.md).
- Keep findings concrete and testable.

7. Validate quality before finishing.
- Filename matches required pattern.
- Each observation maps to at least one proposed fix.
- Open questions and assumptions are explicit.
- Includes a clear test/validation checklist.

## Decision Points
- Branch has multiple numbers: use the first one unless user specifies otherwise.
- Branch has no meaningful suffix: ask user for purpose text.
- Existing file collision: prefer `_v2` for distinct incidents; append a section for closely related follow-up findings.
- Proposed fix is uncertain: list as hypothesis and define validation needed.

## Completion Checks
- File created in `docs/issues/`.
- Name follows `issue_[number]_[purpose].md`.
- Document includes all required sections.
- Proposed fixes are actionable and linked to observations.
