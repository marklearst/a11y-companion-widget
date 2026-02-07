# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - Unreleased

### Added

- Variable-first design-system tooling: architecture linting, variable gap reporting, and theme baseline snapshot checks.
- Contrast automation scripts for WCAG AA validation and nearest safe shade-step suggestions.
- Generated WCAG conformance level map (`A`, `AA`, `AAA`) and helper APIs for level-based criteria lookups.
- Root design-system planning docs:
  - `DESIGN_SYSTEM_MASTER_PLAN.md`
  - `DESIGN_SYSTEM_NAMING_GUIDE.md`
  - `DESIGN_SYSTEM_V2_TODO.md`
- Shared SVG builder utilities in `widget-src/ui/icons`.

### Changed

- Standardized package manager workflow on `pnpm` (`>=10`) with `pnpm-lock.yaml`.
- Updated watch workflows:
  - `watch` uses `pnpm run build --watch`
  - `watch:ds` includes variable checks and contrast suggestion output
  - `watch:ds:strict` adds failing AA contrast checks for hard-gate mode
- Improved naming clarity for component variable imports with canonical `componentPrimitives`.
- Markdown export now includes WCAG level coverage summary for `A`, `AA`, and `AAA`.

### Deprecated

- Legacy primitive variable aliases:
  - `primitiveComponentVariables`
  - `primitiveComponentTokens`
- Legacy top-level design-system exports remain soft-deprecated and are planned for v2 cleanup.

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
- Dark mode support with theme selection (`light`, `dark`, `system`).
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
