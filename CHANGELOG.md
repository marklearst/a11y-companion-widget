# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-06-24

### Changed

- **Removed collaborative avatars (facepile) for team check-offs** for a simpler interface and less UI noise, based on overwhelming user feedback. Avatars could be easily reset by resetting widget state. This feature may return in the future with a toggle to enable or disable it.
- **Refactored codebase to be more modular**: Split large type definitions into domain-specific modules and improved overall organization. This prepares the codebase for easier addition of new features, including FEATURE_CHECKLIST.md and user requests.

---

## [1.0.0] - 2025-05-37

### Added

- First public release of **A11Y Companion**: Accessibility Checklist Widget for Figma.
- Full [A11Y Project Checklist](https://www.a11yproject.com/checklist/) integration, organized by section.
- Each checklist item includes WCAG reference and detailed explanation.
- Collapsible sections for easy navigation.
- Progress tracking per section and overall.
- Collaborative avatars (facepile) for team check-offs.
- Accessible custom checkboxes.
- Tooltips with WCAG and long descriptions.
- Property menu toggle to enable/disable tooltips.
- Modern, accessible UI with dark mode support.

---

**This is the initial release. Make accessibility a first-class part of your design and development process!**
