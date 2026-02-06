# Repository Guidelines

## Project Structure & Module Organization
- `widget-src/code.tsx` is the widget entrypoint.
- UI components live in `widget-src/components/`:
  - `checklist/` for feature UI
  - `primitives/` for reusable building blocks
- Business logic and hooks live in `widget-src/logic/` and `widget-src/hooks/`.
- Design system code lives in `widget-src/design-system/` with layers for `primitives/`, `theme/`, `components/`, and `utils/`.
- Shared SVG builders live in `widget-src/ui/icons/`.
- Automation and quality scripts live in `scripts/`.
- Reference docs and planning notes live in `markdown/` and root `DESIGN_SYSTEM_*.md` files.

## Build, Test, and Development Commands
Use `pnpm` (required: `>=10`).

- `pnpm run build` bundles widget code to `dist/code.js`.
- `pnpm run watch` rebuilds on changes.
- `pnpm run lint` runs ESLint plus design-system checks.
- `pnpm run lint:design-system` validates variable architecture and style literal rules.
- `pnpm run tsc` runs TypeScript type checks (`--noEmit`).
- `pnpm run check:contrast` validates WCAG AA contrast pairs.
- `pnpm run check:contrast:suggest` prints nearest safe shade-step proposals.
- `pnpm run theme:baseline:check` verifies theme output against the baseline snapshot.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`), 2-space indentation, semicolons enabled.
- Follow ESLint and Prettier (`prettierrc.json`) before opening PRs.
- Prefer descriptive PascalCase for components (`ChecklistPanel.tsx`), camelCase for hooks/utilities (`useDarkMode.ts`).
- Design system rule: use **variables**, not raw literals, in component styles.
- Prefer canonical imports from `design-system` modules over deprecated top-level exports.

## Testing Guidelines
- This repo currently uses script-based validation rather than a unit test framework.
- Required pre-PR checks:
  - `pnpm run lint`
  - `pnpm run tsc`
  - `pnpm run check:contrast`
  - `pnpm run theme:baseline:check`
- If you change theme or variable behavior, also run `pnpm run check:contrast:suggest` and include notable output in PR notes.

## Commit & Pull Request Guidelines
- Follow Conventional Commit style used in history, e.g.:
  - `feat(ui): refresh checklist panels`
  - `chore(tooling): add contrast scripts`
- Keep commits scoped and atomic.
- PRs should include:
  - clear summary and rationale
  - linked issue (if available)
  - screenshots/GIFs for UI changes
  - commands run and results
  - migration notes for design-system or variable changes

## Figma Widget Notes
- This project runs in the Figma Widget API environment; avoid browser-only assumptions.
- Prefer Widget-supported primitives and synced state patterns for UI/state changes.
