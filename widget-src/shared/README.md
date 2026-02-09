# Shared Utilities

`shared/` contains pure, reusable helpers used across domains.

## Put code here when
- It has no Figma runtime coupling.
- It has no UI/component state assumptions.
- It is used by more than one module area (for example `hooks/` and `theme/`).

## Keep code out of `shared/` when
- It orchestrates checklist/domain behavior: use `logic/`.
- It depends on widget hooks (`useSyncedState`, `useEffect`): use `hooks/`.
- It is component presentation code: use `components/`.

## Current examples
- `hexColor.ts`: normalize and validate hex colors consistently.
- `avatarStack.ts`: stable avatar stack math and capping.

## Rules
- Functions must be pure and side-effect free.
- Prefer small, composable helpers with explicit input/output.
- Do not import from `hooks/` or `components/` inside `shared/`.
