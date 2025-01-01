# @bttin/eslint-parser-plain

Allow you to parse various types of files with ESLint, a fork of [Ray's](https://github.com/so1ve/eslint-parser-plain) ([@so1ve](https://github.com/so1ve)).

## Usages

### Install

```bash
npm install -D @bttin/eslint-parser-plain
```

```bash
yarn add -D @bttin/eslint-parser-plain
```

```bash
pnpm add -D @bttin/eslint-parser-plain
```

### Configure

We recommend using [ESLint's Flat Config format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

```typescript
import parserPlain from "@bttin/eslint-parser-plain"

export default [
  {
    files: ["*.md"],
    parser: parserPlain,
    rules: {
      "prettier/prettier": ["error", { parser: "markdown" }],
    },
  },
];
```

Or legacy config format:

```typescript
module.exports = {
  overrides: [
    {
      files: ["*.md"],
      parser: "eslint-parser-plain",
      rules: {
        "prettier/prettier": ["error", { parser: "markdown" }],
      },
    },
  ],
};
```

## Credits

- Ray ([@so1ve](https://github.com/so1ve))
- auvred ([@auvred](https://github.com/auvred))

## License

[MIT](./LICENSE) License

Copyright (c) 2022 Ray <https://github.com/so1ve>
<br />
Copyright (c) 2024-present Biscuit Tin <opensource@biscuitt.in>