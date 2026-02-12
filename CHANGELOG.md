# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-12

### Added

- **Phase 1 - Foundation**
  - Variable-first design-system tooling: architecture linting, variable gap reporting, and theme baseline snapshot checks.
  - Contrast automation scripts for WCAG AA validation and nearest safe shade-step suggestions.
  - Generated WCAG conformance level map (`A`, `AA`, `AAA`, `Failed`) and helper APIs for level-based criteria lookups.
- **Phase 2 - Contrast Hardening**
  - Runtime accent-step policy for contrast-safe theme resolution in light/dark modes.
  - Expanded hardening checks for contrast policy, preset matching, and shared utility behavior.
- **Phase 3 - Deprecation Cleanup**
  - Canonical variable imports were standardized across runtime modules.
  - Legacy primitive variable aliases and deprecated theme options were removed (see **Removed** for details).
- **Phase 4 - Widget UX Upgrades**
  - Widget contrast inspector with on-canvas preview and property-menu toggle.
  - Unsupported-selection diagnostics for:
    - image fills
    - mixed fills
    - multiple fills
    - dual-gradient pairs
    - stale selection changes
  - Gradient-aware contrast support with sampled-min measurement, stop metadata, and tooltip details.
  - AvatarStack activity tracking from real checklist interactions (item toggle and section bulk action).

### Changed

- Standardized package manager workflow on `pnpm` (`>=10`) with `pnpm-lock.yaml`.
- Updated watch workflows:
  - `watch` uses `pnpm run build --watch`
  - `watch:ds` includes variable checks and contrast suggestion output
  - `watch:ds:strict` adds failing AA contrast checks for hard-gate mode
- Improved naming clarity for component variable imports with canonical `componentPrimitives`.
- Markdown export now uses real task-list syntax (`- [ ]` / `- [x]`) and wrapped continuation lines for long descriptions.
- Widget preference storage now uses shared widget-instance namespace keys (`prefs:user:shared:widget:<widgetId>`).
- Property menu was reorganized into clearer sections:
  - Scope & Context
  - Visual Configuration
  - Specialized Checks & Export
- Theme selection is explicit `light` / `dark`.
- Avatar facepile updated for cleaner stacking and overflow readability:
  - maximum visible avatars reduced to 4
  - `+N` overflow chip with comma-delimited hidden-name tooltip
  - stronger initial/overflow typography
  - outline and spacing alignment updates
- Contrast inspector UI refined for production use:
  - fixed-size preview area
  - clear Check / Swap / Clear actions
  - stable `Contrast: N/A` fallback state
  - metadata rows for foreground/background values
  - light/dark-specific readability adjustments
- Added i18n message coverage for contrast inspector interactions and labels.

### Removed

- Legacy primitive variable aliases:
  - `primitiveComponentVariables`
  - `primitiveComponentTokens`
- Runtime `system` theme option from widget preferences and property-menu theme controls.

## [1.2.1] - 2025-12-12

### Fixed

- Fixed WCAG badge visibility by removing styling that hid label text.
- Fixed WCAG badge rendering/click behavior so links open correctly.
- Updated `CopyDisplay` and `WcagBadge` styling for consistency and readability.

### Changed

- Removed `ProgressRing` usage due to unstable behavior and improved related UI consistency.
- Improved search and export format layout behavior.

## [1.2.0] - 2025-12-12

### Added

- Search and filter support for checklist text and WCAG codes.
- Bulk section actions and collapse/expand all controls.
- Export progress improvements and quick-copy support.
- Dark mode support with theme selection (`light`, `dark`).
- Language selector with English/Spanish localization.
- Brand theme presets and broader design-system theming integration.
- Property-menu toggle to hide completed checklist items.

### Changed

- Expanded checklist panel, item, and primitive component theming.
- Refactored effects into modular drop shadow utilities.
- Updated checklist and template data inputs used by the widget.
- Improved code organization and readability across core widget modules.

## [1.1.0] - 2025-06-24

### Changed

- Removed collaborative avatars (facepile) for team check-offs for a simpler interface and less UI noise.
- Refactored codebase for more modular structure and easier future feature work.

## [1.0.0] - Initial release

### Added

- First public release of **A11Y Companion**: Accessibility Checklist Widget for Figma.
- Full [A11Y Project Checklist](https://www.a11yproject.com/checklist/) integration, organized by section.
- WCAG references, detailed explanations, collapsible sections, progress tracking, and accessible custom checkbox flows.
