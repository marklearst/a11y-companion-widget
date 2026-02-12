# Architecture

## High level components

- Checklist data
- UI rendering by section
- Search and filtering
- State persistence
- Export generation
- Contrast Inspector

## Data flow

- Checklist data drives section rendering
- User actions update state
- State updates drive progress and export output

## Contrast Inspector notes

The Contrast Inspector should be a careful and conservative approach.

If a fill type is ambiguous or unsupported, report that clearly instead of guessing.

## Theming

Themes should be resolved via a small set of tokens.

Avoid scattering literal colors and spacing values across the UI.
