# BiscuitTin ESLint Config - AI Coding Guide

## Project Architecture

This is a **pnpm monorepo** (`pnpm-workspace.yaml`) containing three publishable packages:

- **@biscuittin/eslint-config** - Composable ESLint flat configs with auto-detection (main package)
- **@biscuittin/eslint-parser-plain** - Simple parser for non-JS files (JSON, etc.)
- **eslint-plugin-format** - Formatter integration (dprint/prettier)

The main package uses a **factory pattern** ([factory.ts](../packages/eslint-config/src/factory.ts)) that auto-detects dependencies (`isPackageExists`) and conditionally enables configs (TypeScript, React, Next.js, Tailwind, etc.).

## Critical Workflows

### Building

```bash
pnpm build  # Builds all packages with tsdown (not tsc)
```

Individual packages use [tsdown](../packages/eslint-config/tsdown.config.ts) for bundling, NOT raw TypeScript compilation. Config includes attw (Are The Types Wrong), publint validation.

### Testing

```bash
pnpm test          # Vitest with custom project-based config
pnpm coverage      # Coverage via @vitest/coverage-v8
```

Tests use inline snapshots (`toMatchInlineSnapshot`) - see [index.spec.ts](../packages/eslint-parser-plain/tests/index.spec.ts). The [vitest.config.ts](../vitest.config.ts) dynamically discovers TypeScript project references to run tests.

### Type Generation

```bash
pnpm typegen  # Generates typegen.d.ts for all ESLint rules
```

Uses `eslint-typegen` to create strict types from all combined config rules. Run after adding/changing plugins.

### Linting & Formatting

- **ESLint**: `pnpm lint` (uses own config via [eslint.config.ts](../eslint.config.ts))
- **dprint**: Configured via [dprint.json](../dprint.json) with 6 plugins (TypeScript, JSON, Markdown, Malva CSS, Markup, YAML)
- **Pre-commit**: Husky + [lint-staged](../lint-staged.config.js) runs ESLint/dprint on staged files
- **Commits**: [commitlint.config.mjs](../commitlint.config.mjs) enforces conventional commits

## Key Conventions

### Plugin Memoization Pattern

**Always use `memo()` when importing ESLint plugins** - see [memoize-eslint-plugin.ts](../packages/eslint-config/src/utils/memoize-eslint-plugin.ts). Package managers don't dedupe same-version transitive deps, causing referential identity issues in ESLint.

```typescript
const pluginTypescript = memo(eslintPluginTypescript, '@typescript-eslint/eslint-plugin')
```

### Config Options Pattern

Configs use a **SharedOptions + ConfigOptions** pattern (see [factory.ts](../packages/eslint-config/src/factory.ts) lines 44-48):

- `SharedOptions<T>` = user-facing (omits `isInEditor`, `enable`)
- `ConfigOptions<T>` = internal (includes `isInEditor` from env detection)

The `enabled()` helper handles boolean/object/undefined and auto-detection fallbacks.

### Flat Config Composition

Uses `eslint-flat-config-utils` FlatConfigComposer for merging user configs with generated configs (see [factory.ts](../packages/eslint-config/src/factory.ts) lines 158-161).

### File Globs

All glob patterns centralized in [globs.ts](../packages/eslint-config/src/globs.ts) using `?([cm])` pattern for .js/.cjs/.mjs/.ts/.cts/.mts variants.

### TypeScript Projects

Uses **solution-style tsconfig** ([tsconfig.json](../tsconfig.json)) with project references to shared configs in [tsconfigs/](../tsconfigs/). No files in root, only references.

### Package Constraints

- **Node.js**: `>=v24.11.1 <25` (enforced in [package.json](../package.json))
- **Package manager**: pnpm only (bun/npm/yarn versions set to 999.0.0 to block usage)
- **Import maps**: Uses `#typegen` import for type definitions

## Integration Points

### Auto-Detection System

Configs enable automatically based on installed dependencies:

- `typescript` → checks for `typescript` package
- `react` → checks `react` or `@types/react`
- `nextjs` → checks `next`
- `node` → checks `@types/node`
- `format` → checks `dprint`

Users can override with explicit `enable: true/false` in config options.

### TypeScript Integration

Two parser modes (see [typescript.ts](../packages/eslint-config/src/configs/typescript.ts) lines 64-68):

1. **Project Service** (default): `allowDefaultProject` for non-tsconfig files
2. **Explicit tsconfig**: `project: ['./tsconfig.json']`

Import resolver uses `eslint-import-resolver-typescript` with PnP support (`.yarn` folder).

### Self-Hosted ESLint Config

The repo dogfoods its own config ([eslint.config.ts](../eslint.config.ts)) with special rules for internal files (allows `unicorn/prefer-module: off` in src/, disables `unicorn/no-null` in utils, etc.).

### Release Process

Uses `release-please-config.json` for automated versioning. Each package has independent CHANGELOG.md.

## Common Pitfalls

- **Don't** use raw TypeScript plugin imports - always wrap with `memo()`
- **Don't** run `tsc` directly - packages build with tsdown
- **Don't** forget to run `pnpm typegen` after adding plugins
- **Don't** use bun/npm/yarn - enforced to fail via package.json engines
- **Remember** vitest.config.ts uses TypeScript API to discover projects - structure matters
