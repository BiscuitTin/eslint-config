# Testing Guidelines

Tests use Vitest and live alongside packages under `packages/*/tests/`.
Name tests `*.spec.ts` and keep fixtures close to the tested module when possible.
Run `pnpm run test` for a quick check and `pnpm run coverage` before larger changes.
