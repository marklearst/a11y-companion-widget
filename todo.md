# 📋 A11Y Companion Widget - Action Items & Roadmap

**Generated:** February 9, 2026  
**Status:** Prioritized action items based on comprehensive code analysis

---

## 🚀 High Priority (Do First)

### ✅ Maintenance & Housekeeping

- [x] **Update theme baseline snapshot** - Fixed theme baseline drift issue
  - Command: `pnpm run theme:baseline:write`
  - Status: ✅ Completed during analysis

- [ ] **Document theme baseline workflow in AGENTS.md**
  - Add section explaining when and why to update theme baseline
  - Include commands: `theme:baseline:write` and `theme:baseline:check`
  - Explain what triggers a baseline update (theme changes, new presets, variable updates)

- [ ] **Add SECURITY.md policy**
  - Create vulnerability reporting process
  - Add contact information for security issues
  - Include responsible disclosure guidelines
  - Reference: https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository

---

## 🎯 Medium Priority (Important)

### 🧪 Testing Infrastructure

- [ ] **Add unit testing framework (Vitest)**
  - Install Vitest + @vitest/ui for modern test runner
  - Configure `vitest.config.ts` with TypeScript support
  - Create initial test structure in `widget-src/__tests__/`
  - Write sample tests for critical utilities:
    - [ ] `shared/hexValidator.ts`
    - [ ] `logic/wcagUtilities.ts`
    - [ ] `logic/progressCalculator.ts`
    - [ ] `hooks/useChecklistProgress.ts`
  - Add coverage reporting with c8/Istanbul
  - Update package.json scripts: `test`, `test:ui`, `test:coverage`
  - Integrate tests into CI pipeline (`quality-gates.yml`)

- [ ] **Add component testing (optional)**
  - Consider @testing-library/react for component tests
  - Test critical UI components:
    - [ ] `ChecklistItem` interaction and state
    - [ ] `Checkbox` keyboard navigation
    - [ ] `WcagBadge` link behavior
    - [ ] Search/filter functionality

- [ ] **Track test coverage metrics**
  - Set baseline coverage target (e.g., 70% for utilities, 50% for components)
  - Add coverage badge to README
  - Generate coverage reports in CI
  - Block PRs below minimum coverage threshold (optional)

### 📦 Dependency Management

- [ ] **Add automated dependency updates**
  - Enable Dependabot OR add Renovate bot
  - Configure update schedule (weekly/monthly)
  - Set PR grouping rules (e.g., group dev dependencies)
  - Add auto-merge for patch updates (optional)

- [ ] **Pin dependency versions**
  - Replace `*` wildcards with specific versions in package.json
  - Use `^` for minor/patch updates, `~` for patch only
  - Document versioning strategy in AGENTS.md
  - Consider lockfile-only updates for CI stability

- [ ] **Add security scanning to CI**
  - Add `pnpm audit` step to quality-gates.yml
  - Consider GitHub Advanced Security (if available)
  - Add Snyk or Socket.dev for real-time vulnerability detection
  - Set up security issue notifications

### 📊 Performance & Monitoring

- [ ] **Add bundle size tracking**
  - Install `bundlesize` or `size-limit` package
  - Set maximum bundle size threshold (e.g., 300 KB)
  - Add bundle size check to CI pipeline
  - Track bundle size trends over time
  - Add bundle size badge to README (optional)

- [ ] **Optimize bundle size (if needed)**
  - Analyze bundle composition with esbuild metafile
  - Check for duplicate dependencies
  - Consider code splitting strategies (if applicable)
  - Review large dependencies for lighter alternatives

---

## 📝 Low Priority (Nice to Have)

### 📖 Documentation Enhancements

- [ ] **Add CONTRIBUTING.md**
  - Document contribution workflow (fork, clone, branch, PR)
  - Reference AGENTS.md for coding guidelines
  - Include local development setup instructions
  - Add code of conduct reference
  - Explain commit message conventions
  - Link to issue templates

- [ ] **Add GitHub issue templates**
  - Create `.github/ISSUE_TEMPLATE/bug_report.yml`
  - Create `.github/ISSUE_TEMPLATE/feature_request.yml`
  - Create `.github/ISSUE_TEMPLATE/question.yml`
  - Add config.yml for issue routing

- [ ] **Add GitHub PR template**
  - Create `.github/pull_request_template.md`
  - Include checklist: tests, docs, changelog, screenshots
  - Add related issue linking section
  - Include breaking change indicator

- [ ] **Document architecture decisions (ADRs)**
  - Create `docs/adr/` directory
  - Add ADR template (Michael Nygard format)
  - Document key decisions:
    - [ ] Why script-based validation vs. Jest/Vitest
    - [ ] Design system variable architecture
    - [ ] Theme structure and preset strategy
    - [ ] Widget state management approach
    - [ ] Localization strategy

- [ ] **Create design system visual documentation**
  - Consider Storybook or similar tool (if feasible for Figma Widget context)
  - Document color palette with swatches
  - Show typography scale examples
  - Display spacing/sizing tokens visually
  - Include component style guidelines
  - Alternative: Generate static HTML docs from design tokens

### 🔍 Code Quality Improvements

- [ ] **Add comprehensive error handling review**
  - Audit async operations for proper error handling
  - Review hooks for error boundary patterns
  - Add try-catch blocks where needed
  - Consider centralized error logging utility
  - Document error handling patterns in AGENTS.md

- [ ] **Add EditorConfig file**
  - Create `.editorconfig` for cross-editor consistency
  - Ensure alignment with Prettier settings
  - Include indent style, line endings, charset

- [ ] **Add VS Code workspace settings**
  - Create `.vscode/settings.json` (if not present)
  - Configure recommended extensions in `.vscode/extensions.json`
  - Add debug configurations in `.vscode/launch.json`
  - Include task definitions in `.vscode/tasks.json`

### 🎨 Feature Enhancements (from v2.0.0 roadmap)

- [ ] **Complete v2.0.0 features**
  - [ ] Finalize contrast inspector widget integration
  - [ ] Polish gradient-aware contrast support
  - [ ] Complete avatar facepile refinements
  - [ ] Test markdown export with task-list syntax
  - [ ] Validate WCAG level mapping completeness

- [ ] **Future feature ideas**
  - [ ] Add keyboard shortcut reference modal
  - [ ] Implement checklist templates customization
  - [ ] Add progress export to CSV/PDF formats
  - [ ] Integrate with project management tools (e.g., Jira, Linear)
  - [ ] Add collaborative comments on checklist items
  - [ ] Create public API for programmatic checklist management

---

## 🧹 Technical Debt

- [ ] **Clean up deprecated exports**
  - Remove soft-deprecated top-level design-system exports (planned for v2.0.0)
  - Remove legacy primitive variable aliases:
    - `primitiveComponentVariables`
    - `primitiveComponentTokens`
  - Migrate all imports to canonical `componentPrimitives`
  - Update documentation references

- [ ] **Review and update dependencies**
  - Check for outdated packages: `pnpm outdated`
  - Update TypeScript to latest stable (currently 5.8.3)
  - Review ESLint plugin updates
  - Test with latest Figma Widget typings

---

## 🎯 Quality Gates Checklist (Pre-PR)

Before submitting any PR, ensure:

- [ ] `pnpm run build` - ✅ Builds successfully
- [ ] `pnpm run tsc` - ✅ No TypeScript errors
- [ ] `pnpm run lint` - ✅ No ESLint errors
- [ ] `pnpm run test:hardening` - ✅ Hardening tests pass
- [ ] `pnpm run check:contrast` - ✅ WCAG AA compliance
- [ ] `pnpm run theme:baseline:check` - ✅ Theme baseline matches
- [ ] `pnpm run validate:wcag-map` - ✅ WCAG mappings valid
- [ ] Update CHANGELOG.md with changes
- [ ] Add screenshots for UI changes
- [ ] Test in Figma widget environment

---

## 📊 Success Metrics

Track these metrics over time:

### Code Quality
- [ ] Maintain 0 ESLint errors
- [ ] Maintain 0 TypeScript errors
- [ ] Keep bundle size under 300 KB
- [ ] Achieve 70%+ test coverage (once tests added)

### Design System
- [ ] Maintain 100% WCAG AA contrast compliance (588/588 pairs)
- [ ] Keep 0 raw color literals in components
- [ ] Maintain design system variable architecture integrity

### Maintenance
- [ ] Address security vulnerabilities within 7 days
- [ ] Keep dependencies updated monthly
- [ ] Respond to issues within 48 hours
- [ ] Review PRs within 24 hours

### Community
- [ ] Grow Figma Community installs
- [ ] Improve GitHub stars and forks
- [ ] Encourage community contributions
- [ ] Maintain active documentation

---

## 🎓 Learning Resources

For contributors working on specific areas:

### Testing
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Test Coverage Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Design Systems
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Contrast Checker Tools](https://webaim.org/resources/contrastchecker/)

### Figma Widget Development
- [Figma Widget API Reference](https://www.figma.com/widget-docs/)
- [Widget Examples](https://github.com/figma/widget-samples)

### Architecture
- [Architecture Decision Records](https://adr.github.io/)
- [The A11Y Project Checklist](https://www.a11yproject.com/checklist/)

---

## 🎉 Celebration Milestones

Acknowledge progress at these milestones:

- [ ] ✅ All quality gates passing (DONE!)
- [ ] 🧪 Test framework implemented with 50%+ coverage
- [ ] 📦 Automated dependency management active
- [ ] 📚 Contributing guide and templates published
- [ ] 🔒 Security scanning integrated
- [ ] 📊 Bundle size tracking active
- [ ] 🚀 v2.0.0 released
- [ ] ⭐ 100 GitHub stars reached
- [ ] 🌍 500+ Figma Community installs
- [ ] 🤝 First external contributor merged

---

**Note:** This todo list is a living document. Update priorities as the project evolves. Cross off items as completed and add new items as needs arise.

**Last Updated:** February 9, 2026
