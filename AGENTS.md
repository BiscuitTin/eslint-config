# Repository Guidelines

## Project Structure & Module Organization

This is a pnpm workspace with multiple packages in `packages/`. Core modules include:

- `packages/eslint-config/` for the shared ESLint config source and helpers.
- `packages/eslint-plugin-format/` for the `@biscuittin/eslint-plugin-format` custom formatting plugin and rules.
- `packages/eslint-parser-plain/` for the `@biscuittin/eslint-parser-plain` parser package.

Shared tooling lives in `scripts/` (e.g., type generation) and `tools/` (custom test helpers).
TypeScript config variants are in `tsconfigs/`.
Root-level configs like `eslint.config.ts`, `dprint.json`, and `cspell.config.yaml` define linting, formatting, and spelling rules.

## Build, Test, and Development Commands

Run commands from the repository root:

- `pnpm install` to install workspace dependencies.
- `pnpm run build` to build all packages via their package-level build scripts.
- `pnpm run test` to run Vitest once (`--run`) with heap logging.
- `pnpm run coverage` to collect Vitest coverage.
- `pnpm run lint` to lint the repo with ESLint.
- `pnpm run typegen` to regenerate types with `tsx scripts/typegen.ts`.

## Coding Style & Naming Conventions

Use TypeScript/ESM (`"type": "module"`). Indentation is 2 spaces. Prefer descriptive, package-scoped names (e.g., `packages/eslint-plugin-format/src/rules/prettier.ts`). Follow existing naming for tests (`*.spec.ts`) and configs (`tsconfig.*.json`). Formatting is enforced by `dprint.json`; linting by `eslint.config.ts`.

## Testing Guidelines

Tests use Vitest and live alongside packages under `packages/*/tests/`. Name tests `*.spec.ts` and keep fixtures close to the tested module when possible. Run `pnpm run test` for a quick check and `pnpm run coverage` before larger changes.

## Commit & Pull Request Guidelines

Commit messages follow Conventional Commits (`type(scope): subject`) as enforced by `commitlint.config.mjs`; keep body lines under 100 characters. PRs should include a concise description, link relevant issues, and note any behavior changes or new configuration options. Add test updates when changing rules or parser behavior.

## Configuration Notes

The workspace targets Node `>= v24.11.1 < 25`. Husky and lint-staged are used to keep commits clean; ensure local hooks are set up via `pnpm install`.
