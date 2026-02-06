# Design System Master Plan

Date: 2026-02-06
Status: Active
Owner: a11y Companion Widget maintainers

## Summary

This plan hardens the design system and then uses that stability to drive broader code cleanup. The work is intentionally design-system first: lock current visual output, remove variable drift, migrate deprecated import usage, and only then expand into general refactors.

## Goals

- Preserve existing visual behavior while refactoring internals.
- Establish one source of truth for component styling values.
- Eliminate deprecated design-system consumption from component and hook code.
- Enforce variable hygiene with automated lint and baseline checks.
- Guarantee WCAG AA contrast for text in light and dark themes, including accent-driven UI states.
- Produce a prioritized cleanup backlog that can be executed after variable stabilization.

## Non-Goals

- No UI redesigns or visual refresh in this track.
- No feature work unrelated to design-system cleanup.
- No immediate removal of compatibility exports before migration reaches zero usage.

## Current State Snapshot

- Theme core exists in `widget-src/design-system/theme/*` with presets in `widget-src/design-system/theme/presets/*`.
- Component-level variables exist in:
  - `widget-src/design-system/components/checklist.ts`
  - `widget-src/design-system/components/overlays.ts`
  - `widget-src/design-system/components/primitives.ts`
- Design-system linting exists in `scripts/check-design-system.mjs` and currently blocks raw hex/font literals in components.
- Legacy usage still exists in component/hook imports, primarily through deprecated named exports from `design-system`.
- WCAG conformance-level map now exists in:
  - `widget-src/data/wcagLevelMap.ts` (generated)
  - `scripts/generate-wcag-level-map.mjs` (source generator)

## Target Architecture

1. Primitives
- Raw scales only (`primitives/*`): spacing, typography, borders, sizing, etc.
- No component should consume raw primitives for one-off values unless adding new semantic/component variables.

2. Theme
- `defaultTheme` and `createTheme(overrides)` remain the canonical theme API.
- Presets only override brand/semantic base inputs, not ad-hoc component values.

3. Component Variables
- Component-specific values live in `design-system/components/*`.
- Off-scale values must be named and documented at component-variable level.

4. Components/Hooks
- Consume `createChecklistVariables`, `createOverlayVariables`, theme outputs, and approved primitives.
- No deprecated variables from legacy design-system exports.

5. Naming And Language
- Use `Variables` terminology across docs, code comments, and API labels.
- Prefer concise canonical names for component variable groups (for example `componentPrimitives`).
- Keep deprecation aliases only as migration bridges with explicit removal phase targets.

## Dark Mode Contrast Policy (Planned)

- Any text rendered over accent or semantic backgrounds must pass WCAG AA (4.5:1 for normal text).
- Use the same accent value in dark mode first; if contrast fails, derive a contrast-safe variant by stepping the palette (for example, `+100`/`+200`) until AA is met.
- Maintain explicit foreground/background variable pairs for dark mode rather than reusing light mode assumptions.
- Validate contrast through scriptable checks, not manual visual review only.

## Public Interfaces And Deprecation Policy

Canonical imports for application code:
- `design-system`:
  - `createChecklistVariables`, `createOverlayVariables`, `defaultTheme`, `themePresets`, `createTheme`
- `design-system/primitives/*`:
  - primitive scales/types only when needed
- `design-system/theme/default`:
  - shared helpers (`withOpacity`) and base palettes where appropriate

Soft-deprecated (warn/block in lint first, remove later):
- `sizes`, `radius`, `padding`, `gap`, `typography`, `neutral`, `brand`, `semantic`, `lightTheme`, `darkTheme`, `designSystem`, `legacySpacing` from `design-system`.

## Execution Phases

### Phase 0: Baseline Lock

Deliverables:
- Theme baseline generator/checker script.
- Snapshot file committed under `widget-src/design-system/baselines/`.

Exit Criteria:
- Baseline generation is deterministic.
- Check mode fails when any theme variable changes unexpectedly.

### Phase 1: Variable Gap Inventory

Deliverables:
- Automated variable-gap report script.
- Generated markdown report for current component files.

Exit Criteria:
- Report includes deprecated imports, raw colors, and raw numeric style literals.

### Phase 2: Enforcement Hardening

Deliverables:
- Expanded `scripts/check-design-system.mjs` checks:
  - deprecated import detection
  - non-variable style numeric literal detection (with explicit zero allowlist)

Exit Criteria:
- CI/local lint catches new violations immediately.

### Phase 2.5: Accessibility Contrast Hardening

Deliverables:
- Define dark-mode accent fallback rules (shade stepping policy and stop conditions).
- Add contrast verification script target (`check:contrast`) using existing design-system contrast utilities.
- Add a small, explicit set of critical text/background pairs to enforce (header text, badge text, progress text, action text).

Exit Criteria:
- Failing contrast pairs break validation locally/CI.
- Accent customization in dark mode resolves to contrast-safe values.

### Phase 3: Component/Hook Migration

Deliverables:
- Remove current deprecated import usage from primitives/checklist/hook files.
- Convert known raw default numbers into variables where appropriate.

Exit Criteria:
- `lint:design-system` passes with stricter rules.

### Phase 4: Documentation And Migration Path

Deliverables:
- This root file as temporary master plan.
- Canonical copy in `markdown/` later.
- Root pointer stub retained after migration.

Exit Criteria:
- No ambiguity about canonical location.

### Phase 5: Post-Stabilization Cleanup Backlog

Deliverables:
- Prioritized refactor queue based on migration findings.

Exit Criteria:
- Backlog is ordered by impact and risk.

### Phase 6: In-Widget Contrast Inspector (Later Phase)

Deliverables:
- Add a compact contrast inspector flow in the widget using Figma Widget-supported primitives only (`AutoLayout`, `Text`, `Input`, `SVG`, `usePropertyMenu`).
- Support selecting foreground/background variables and showing WCAG status (AA/AAA pass-fail + ratio).
- Add an optional action near the progress area to run/check the selected pair and surface recommendation text.

Exit Criteria:
- Inspector works without web-only UI assumptions.
- Selection state is persisted via Widget API synced state.
- Contrast output uses the same contrast utility logic as script checks.

## Detailed TODO Matrix

### A. Baseline And Drift Protection

- [x] Add `scripts/theme-baseline.mjs` with modes:
  - `--write` to update snapshot
  - `--check` to compare against snapshot
- [x] Add snapshot file:
  - `widget-src/design-system/baselines/theme-baseline.snapshot.json`
- [x] Add npm scripts:
  - `theme:baseline:write`
  - `theme:baseline:check`

### B. Variable Gap Reporting

- [x] Add `scripts/generate-variable-gap-report.mjs`.
- [x] Generate `DESIGN_SYSTEM_VARIABLE_GAP.md` at repo root as working report.
- [x] Include report sections:
  - Summary counts
  - Deprecated imports by file/line
  - Raw style literals by file/line
  - Migration recommendations

### C. Lint Enforcement

- [x] Extend `scripts/check-design-system.mjs` to fail on deprecated `design-system` imports.
- [x] Extend `scripts/check-design-system.mjs` to fail on raw style numeric literals except explicit `0`.
- [x] Keep existing checks for hex and raw `fontSize` literals.

### D. Immediate Migration Targets

- [x] Migrate `widget-src/components/primitives/Checkbox.tsx` off deprecated imports and raw fallback literals.
- [x] Migrate `widget-src/components/primitives/ProgressBar.tsx` off deprecated imports.
- [x] Migrate `widget-src/components/primitives/ProgressTracker.tsx` off deprecated imports and raw fallback literals.
- [x] Migrate `widget-src/components/checklist/WcagBadge.tsx` fallback values to variable/primitives usage.
- [x] Migrate deprecated helper imports in:
  - `widget-src/hooks/useAvatarProfiles.ts`
  - `widget-src/hooks/useChecklistSectionState.ts`
- [x] Replace deprecated palette import in:
  - `widget-src/components/checklist/ChecklistPanel.tsx`

### E. Verification

- [x] Run `pnpm run lint:design-system`.
- [x] Run `pnpm run lint`.
- [x] Run `pnpm run tsc`.
- [x] Run `pnpm run theme:baseline:check`.

### F. Documentation Migration (Next Step)

- [ ] Copy this file to `markdown/DESIGN_SYSTEM_MASTER_PLAN.md`.
- [ ] Replace root file content with a pointer stub.
- [ ] Update internal docs/references to point at markdown canonical path.

### G. Dark Mode Contrast Guardrails (Planned Next Work)

- [ ] Define dark-mode accent adjustment policy for contrast failures (preferred shade stepping order and fallback stop).
- [x] Add `scripts/check-contrast-aa.mjs` that validates required text/background variable pairs across default + presets.
- [x] Add `pnpm` command `check:contrast`.
- [x] Add `scripts/suggest-contrast-shade-steps.mjs` to propose nearest safe shade steps for failing accent scenarios without applying changes.
- [x] Add `pnpm` command `check:contrast:suggest`.
- [ ] Include `check:contrast` in `watch:ds` after failure policy is finalized.
- [ ] Include `check:contrast:suggest` in `watch:ds` after policy is finalized.
- [ ] Add acceptance thresholds:
  - normal text >= 4.5:1
  - large text >= 3.0:1
- [ ] Add explicit failure reporting that points to variable pair names and affected theme/preset.

### H. In-Widget Contrast Inspector (Later Phase)

- [ ] Define inspector UX within Widget API constraints:
  - property menu action to open/toggle inspector mode
  - compact row UI near progress area for selected pair and current ratio
- [ ] Define selector model for variable pairs:
  - foreground variable key
  - background variable key
  - preview mode (light/dark/current)
- [ ] Add synced state keys (`useSyncedState`) for selected pair and inspector visibility.
- [ ] Implement contrast status rendering (ratio + AA/AAA badges) using existing design-system variables.
- [ ] Add optional recommendation button that runs nearest safe shade-step logic for current pair and logs/displays the proposed step.
- [ ] Add tests/checklist scenarios for inspector interactions and state persistence across sessions.

### I. WCAG Level Mapping (In Progress)

- [x] Add `scripts/generate-wcag-level-map.mjs` to generate typed A/AA/AAA maps from checklist data.
- [x] Add generated runtime map:
  - `widget-src/data/wcagLevelMap.ts`
- [x] Add `pnpm` command `generate:wcag-level-map`.
- [x] Extend `sync:a11y-checklist` to refresh the generated map after upstream fetch.
- [x] Add shared WCAG types:
  - `widget-src/types/wcag.ts`
- [ ] Add map-level validation script (duplicates, malformed criteria, missing levels) before CI enforcement.

### J. Naming And Deprecation Roadmap

- [x] Introduce `componentPrimitives` as canonical naming for primitive component variables.
- [x] Keep compatibility aliases (`primitiveComponentVariables`, `primitiveComponentTokens`) marked deprecated.
- [ ] Add lint guard for deprecated alias imports after migration window.
- [ ] Define v2.0.0 removal checklist for deprecated design-system exports.
- [ ] Publish canonical naming guide (`DESIGN_SYSTEM_NAMING_GUIDE.md`) and enforce in code review checklist.

## Test And Validation Scenarios

1. Baseline Integrity
- `theme:baseline:check` passes on unchanged theme definitions.
- Intentional theme change produces baseline mismatch and fails check.

2. Deprecated Import Enforcement
- Any new import of deprecated symbols from `design-system` fails `lint:design-system`.

3. Raw Literal Enforcement
- Non-zero numeric style literals in component JSX fail lint.
- Explicit `0` literals remain allowed for resets.

4. Type Safety
- `pnpm run tsc` passes after migration.

5. Runtime Safety
- Light/dark/system theme paths still resolve correctly in `resolveTheme` consumers.
- Brand accent and preset selection remain functional.

6. Contrast Safety (Planned)
- All required text/background pairs pass WCAG AA in light and dark modes.
- Accent customization in dark mode either passes directly or auto-resolves to a contrast-safe variant.

## Risks And Mitigations

- Risk: false-positive lint rules for legitimate numeric usage.
- Mitigation: keep checks scoped to style-like JSX attributes/keys and allow explicit zero.

- Risk: snapshot churn from non-deterministic serialization.
- Mitigation: stable key sorting and deterministic output.

- Risk: migration drift between root and markdown docs.
- Mitigation: short transition window and root pointer stub strategy.

- Risk: accent customization may produce unreadable text in dark mode.
- Mitigation: enforce scripted contrast checks and palette-step fallback rules before rendering.

## Acceptance Criteria

- New baseline tooling exists and passes check mode.
- Variable-gap report generation is automated and reproducible.
- Stricter design-system lint passes on current source after migration updates.
- Deprecated import usage addressed in planned target files.
- Root master plan exists and is ready for later canonical move to `markdown/`.

## Post-Stabilization Cleanup Backlog

1. Simplify duplicated variable fallback logic in overlay/checklist components.
2. Normalize typography defaults across all primitives and overlays.
3. Reduce prop-level styling overrides where component variables should own defaults.
4. Consolidate repeated layout math helpers where patterns recur.
5. Audit and remove dead/unused compatibility exports after deprecation window closes.
