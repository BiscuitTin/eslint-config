# Project Structure & Module Organization

This is a pnpm workspace with multiple packages in `packages/`. Core modules include:

- `packages/eslint-config/` for the shared ESLint config source and helpers.
- `packages/eslint-plugin-format/` for the `@biscuittin/eslint-plugin-format` custom formatting plugin and rules.
- `packages/eslint-parser-plain/` for the `@biscuittin/eslint-parser-plain` parser package.

Shared tooling lives in `scripts/` (e.g., type generation) and `tools/` (custom test helpers).
TypeScript config variants are in `tsconfigs/`.
Root-level configs like `eslint.config.ts`, `dprint.json`, and `cspell.config.yaml` define linting, formatting, and spelling rules.
