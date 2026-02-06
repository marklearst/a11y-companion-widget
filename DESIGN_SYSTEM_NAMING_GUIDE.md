# Design System Naming Guide

Date: 2026-02-06
Status: Draft (v2.0.0 migration)

## Purpose

This guide standardizes variable naming for the widget design system so imports stay readable, API intent is clear, and migration away from deprecated exports is predictable.

## Language Rule

- Use **Variables** terminology in code, docs, and PR notes.
- Avoid introducing new "token" names in runtime APIs.

## Layer Model

1. Base primitives
- Raw scales and constants in `widget-src/design-system/primitives/*`.
- Examples: `spacing[8]`, `fontSize.sm`, `borderWidth.base`.

2. Alias/theme variables
- Theme-level aliases in `widget-src/design-system/theme/*`.
- Examples: `lightTheme.progressFill`, `darkTheme.panelBg`.

3. Component variables
- Component-level variable collections and factories in `widget-src/design-system/components/*`.
- Examples: `componentPrimitives`, `createChecklistVariables`, `createOverlayVariables`.

## Canonical Naming Patterns

- Static variable groups: plural noun by domain.
  - `componentPrimitives`
- Variable factories: `create<Domain>Variables`.
  - `createChecklistVariables`
- Returned variable types: `<Domain>Variables`.
  - `ChecklistVariables`
- Theme overrides: `<Domain>ThemeVariables`.
  - `OverlayThemeVariables`

## Deprecated Alias Policy

- Keep deprecated aliases only to avoid hard breaks during migration.
- Mark aliases with `@deprecated` and point to canonical names.
- Remove aliases in v2.0.0 once usage is zero.

Current bridge aliases:
- `primitiveComponentVariables` -> `componentPrimitives`
- `primitiveComponentTokens` -> `componentPrimitives`

## Import Examples

Preferred:
- `import { componentPrimitives } from "design-system/components/primitives"`
- `import { createChecklistVariables } from "design-system"`

Temporary compatibility only:
- `import { primitiveComponentVariables } from "design-system/components/primitives"`
