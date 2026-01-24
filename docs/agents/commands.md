# Build, Test, and Development Commands

Run commands from the repository root:

- `pnpm install` to install workspace dependencies.
- `pnpm run build` to build all packages via their package-level build scripts.
- `pnpm run test` to run Vitest once (`--run`) with heap logging.
- `pnpm run coverage` to collect Vitest coverage.
- `pnpm run lint` to lint the repo with ESLint.
- `pnpm run typegen` to regenerate types with `tsx scripts/typegen.ts`.
