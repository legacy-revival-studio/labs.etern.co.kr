# AGENTS.md

## Context Awareness

- **Read README.md First**: Always read the `README.md` at the root to understand the overall project goal, organizational structure, and where other key documents are located.

---

## Stack

This repository uses **Astro**.

Use Astro conventions:

- `.astro` pages
- reusable components
- minimal client-side JavaScript
- static-first rendering

---

## Rules

Prefer:

- Astro components
- markdown content
- simple CSS
- no unnecessary React
- **I18n Consistency**: When adding a page in `/`, check if a corresponding page is needed in `/en`.
- **Optimized Images**: Use `src/assets/` and Astro's `<Image />` component for local images.
- **PascalCase**: Use PascalCase for `.astro` component filenames.
- **Protected Files**: Do NOT modify `CHANGELOG.md`. This file is managed by GitHub Actions.

Before finishing a task:

- Run `npm run build` to ensure static generation works without errors.

Avoid:

- dynamic backend
- unnecessary hydration
- large JS bundles

---

## Directory Strictness

- **Explicit Paths Only**: Do not guess file locations. Always verify against the existing `src/` structure.
- **Component Location**: All UI components MUST be in `src/components/`.
- **Style Location**: All CSS files MUST be in `src/styles/`.
- **Layout Location**: All layout components MUST be in `src/layouts/`.
- **Asset Location**: All images and local assets MUST be in `src/assets/` (per Astro convention).
- **Path Verification Protocol**: BEFORE providing any code or diff, the agent MUST explicitly list the file paths it intends to modify or create.
- **Zero Tolerance for Path Guessing**: If the agent is unsure of a directory, it MUST list the contents of `src` using `ls` before proceeding. Placing a `.astro` component in `src/styles/` is a critical failure.

---

## Routing

Primary pages:

- `/`
- `/products`
- `/about`
- `/contact`

Products are linked to separate GitHub Pages project sites:

- `https://etern.co.kr/claytube`

---

## Internationalization (I18n)

- Default language: Korean (root `/`).
- English prefix: `/en`.
- Always ensure links between KR and EN versions are correctly mapped in the navigation.

---

## Product Boundary

Do not implement ClayTube here.

ClayTube lives in its own repository.

This repo only links to it.

---

## Strict Principle: Clarification First

1. Do not guess or assume if the requirements are ambiguous, incomplete, or open to interpretation.
2. If any aspect of the feature, architecture, edge case, or tech stack is unclear, STOP immediately. Do not write a single line of code.
3. Instead, ask me clarification questions (maximum 3-4 bullet points) to fill in the missing information.
4. Only proceed with coding after I answer your questions and explicitly say "Proceed".

---

## Commit rules

On match [ "commit", "commit it", "commit this", "commit changes" ]:

1. Summary: Wrap up chat/work history shortly.
2. Prompt: Minimal reusable prompt for new sessions.
3. Msg: Structured conventional commit (feat, fix, refactor).

[Constraint] ALL outputs MUST be in concise English. No chat filler.

Format strictly:
SUMMARY:
<Short summary text>

PROMPT:
<Compact reusable prompt>

CHANGES:

- <Change 1, max 1 line>
- <Change 2, max 1 line>

COMMIT_TITLE:
<feat: Core title, under 50 chars>

COMMIT_BODY:

- <Concise reason/detail 1>
- <Concise reason/detail 2>

## Pull Request & Push rules

On match [ "push", "push it", "push this", "push branch", "pr", "pr it", "pr this" ]:

1. Check: Run "Commit rules" first if uncommitted.
2. Log: Fetch unmerged commits on current branch.
3. Summary: Merge history into a brief PR overview.
4. Action: Push and generate PR payload.

[Constraint] ALL outputs MUST be in concise English.

Format strictly:
PR_TITLE:
<feat/fix: PR title>

PR_BODY:

## Overview

<Concise overview of merged commits>

## Key Changes

- <Key change 1, single bullet>
- <Key change 2, single bullet>

## Notes (Optional)

- <Brief notes, omit section if empty>
