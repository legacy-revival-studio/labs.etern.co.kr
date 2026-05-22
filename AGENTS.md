# AGENTS.md

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

Avoid:

- dynamic backend
- unnecessary hydration
- large JS bundles

---

## Routing

Primary pages:

- `/`
- `/products`
- `/about`
- `/contact`

Products are linked to separate GitHub Pages project sites:

- `/claytube`

---

## Product Boundary

Do not implement ClayTube here.

ClayTube lives in its own repository.

This repo only links to it.

---

## Commit rules

When the user requests a git commit (e.g., "커밋해줘"):

1. **Summarize the work**: Review the entire conversation history up to this point and summarize the changes made.
2. **Reconstruct a reusable prompt**: Create a prompt that could replicate this work in a new session.
3. **Generate commit message**: Formulate a structured commit message following conventional commits (e.g., feat, fix, refactor).

**Language Rule:**

- All outputs (SUMMARY, PROMPT, CHANGES, COMMIT_TITLE, COMMIT_BODY) MUST be written in **Korean**.
- Exception: Git commit types (e.g., feat:, fix:, refactor:) should remain in English.

Output format MUST strictly follow this structure:

SUMMARY:
<지금까지의 대화와 작업 내용을 요약한 한글 텍스트>

PROMPT:
<이 작업을 처음부터 다시 실행할 수 있는 한글 프롬프트>

CHANGES:

- <변경 사항 1 (한글)>
- <변경 사항 2 (한글)>

COMMIT_TITLE:
<feat: 한글로 작성한 50자 이내의 핵심 제목>

COMMIT_BODY:

- <한글로 작성한 변경 이유 및 구체적 내용 1>
- <한글로 작성한 변경 이유 및 구체적 내용 2>
