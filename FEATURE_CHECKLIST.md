# A11y Companion Widget v1.0.0+ — Feature Checklist

## Core Quality of Life Features

- [ ] **Component & File Naming Overhaul**

  - [ ] Rename files/components to ARIA/a11y-aligned terminology
  - [ ] Ensure naming reflects accessibility role

- [ ] **Localization (i18n) Foundation**

  - [ ] Add localization infrastructure (`widget.localize` or string map)
  - [ ] Provide English and Spanish translations
  - [ ] Document extension for more languages

- [ ] **Accessibility-First Refactor**

  - [ ] Audit for accessible names, roles, tooltips
  - [ ] Add ARIA attributes (`aria-checked`, `aria-label`)
  - [ ] Optimize color contrast
  - [ ] Review keyboard navigation

- [ ] **Property Menu Expansion**

  - [ ] Add theme selector (light/dark/system)
  - [ ] Add language selector
  - [ ] Add checklist type selector (WCAG/custom)
  - [ ] Toggle avatars/progress/tooltips

- [ ] **User Progress Persistence**

  - [ ] Persist progress to Figma file data

- [ ] **Checklist Customization**

  - [ ] UI for adding/removing/reordering items/sections

- [ ] **Checklist Data Separation**

  - [ ] Separate data, localization, and UI logic

- [ ] **Quick Add Templates**

  - [ ] Provide templates for WCAG, Section 508, custom

- [ ] **Responsive UI**

  - [ ] Optimize for all widget sizes and resizing

- [ ] **Visual Hierarchy & Animations**

  - [ ] Improve font, color, spacing
  - [ ] Add subtle animations

- [ ] **Bulk Actions**

  - [ ] Mark all items in section complete/incomplete

- [ ] **Collapsible/Expandable Sections**

  - [ ] Collapse/expand all sections at once

- [ ] **AvatarStack Improvements**

  - [ ] Tooltips on avatars
  - [ ] Show all collaborators

- [ ] **Progress Tracking Enhancements**

  - [ ] Add donut chart/progress ring

- [ ] **Export/Import**

  - [ ] Export progress as JSON/CSV
  - [ ] Import custom definitions

- [ ] **Error Handling & Feedback**

  - [ ] Accessible error messages

- [ ] **Keyboard Shortcuts**

  - [ ] Shortcuts for toggle section, complete item, etc.

- [ ] **Onboarding & Help**

  - [ ] Onboarding tooltip/help modal

- [ ] **Settings Panel**

  - [ ] Centralize configuration in settings panel

- [ ] **Codebase Quality & Testability**
  - [ ] Extract pure logic to utilities
  - [ ] Add unit tests
  - [ ] Manual test plan for UI flows
