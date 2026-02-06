# Design System V2 TODO

Date: 2026-02-06
Owner: a11y Companion Widget maintainers

## Phase 1 - Foundation (Shipped / Active)

- [x] Baseline drift protection (`theme:baseline:*`).
- [x] Variable architecture linting and import checks.
- [x] Contrast checking (`check:contrast`) and recommendation output (`check:contrast:suggest`).
- [x] WCAG level map generation (`generate:wcag-level-map`).
- [x] Canonical primitive component naming (`componentPrimitives`).

## Phase 2 - Contrast Hardening (Next)

- [ ] Define deterministic accent step policy for light and dark modes.
- [ ] Promote policy into runtime variable resolution for `progressFill`-linked states.
- [ ] Add CI gate for contrast check once policy is finalized.
- [ ] Add map validation script for malformed/missing WCAG metadata.

## Phase 3 - Deprecation Cleanup

- [ ] Block deprecated alias imports after migration window.
- [ ] Remove legacy top-level exports in `design-system/index.ts` for v2.0.0.
- [ ] Shrink duplicate compatibility code in components/hooks.

## Phase 4 - Widget UX Upgrades

- [ ] Add in-widget contrast inspector (property-menu toggle + on-canvas status row).
- [ ] Use Widget-safe controls and synced state only (`usePropertyMenu`, `useSyncedState`).
- [ ] Show selected foreground/background variables, ratio, and AA/AAA status.

## Phase 5 - Content & Checklist Quality

- [ ] Add a small set of high-quality, curated templates (not volume-first).
- [ ] Source template candidates from WCAG 2.2 and A11Y Project updates.
- [ ] Keep template additions reviewed for signal, clarity, and maintenance burden.

## Suggested Structure Refinements (Later)

- [ ] Add `widget-src/design-system/aliases/` for explicit non-component alias variables.
- [ ] Add `widget-src/design-system/contracts/` for typed variable contract boundaries.
- [ ] Keep `widget-src/ui/icons/` as the canonical SVG source path for Widget-friendly inline SVG builders.
