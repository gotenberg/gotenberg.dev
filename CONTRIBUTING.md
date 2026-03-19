# Contributing to Gotenberg Documentation

Thank you for your interest in contributing to the Gotenberg documentation! This guide will help you get started.

## Before You Start

Please read the [AGENTS.md](AGENTS.md) file — it describes the core principles, project layout, and documentation standards that all contributions must follow. Even though it is written for AI agents, the same rules apply to human contributors. It also contains the Writer and Designer reference sections with page structure conventions, writing style, design system, and component usage.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install and Run

```bash
npm install   # Install dependencies
npm start     # Start the dev server (http://localhost:3000)
```

### Development Loop

```bash
# Write your content or code, then:
npm run format   # Format all files with Prettier
npm run build    # Verify the site builds without errors
npm run serve    # Preview the production build locally
```

## Submitting a Pull Request

Before opening a PR, verify:

1. Site builds without errors: `npm run build`
2. Files are formatted: `npm run format`
3. All links and imports resolve correctly
4. cURL examples are valid and copy-pasteable
5. Form field names, types, and defaults match the actual Gotenberg API

### Guidelines

- **Accuracy first.** Every endpoint path, form field name, and code sample must match the actual Gotenberg API. When in doubt, cross-reference with the [Gotenberg source](https://github.com/gotenberg/gotenberg).
- **One thing per PR.** Keep content changes, component changes, and style changes in separate PRs when possible.
- **Follow established patterns.** New API doc pages must use the `<ApiEndpoint>` component and follow the same structure as existing pages.
- **Use shared partials.** If a feature applies to multiple endpoints, document it as a reusable `_shared/` partial — never duplicate content across pages.
- **Don't break versioned docs.** Changes to `docs/` apply to the current version only. Do not modify `versioned_docs/` unless explicitly needed.
