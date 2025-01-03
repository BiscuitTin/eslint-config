# @biscuittin/eslint-plugin-format

Format various languages with formatters in ESLint. Supports [Prettier](https://prettier.io/) and [dprint](https://dprint.dev/).

## Usages

### Install

```bash
npm i -D eslint-plugin-format
```

### Configure

We recommend using [ESLint's Flat Config format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

```ts
// eslint.config.js
import format from 'eslint-plugin-format'

export default [
  // ...other flat configs

  // use Prettier to format CSS
  {
    files: ['**/*.css'],
    languageOptions: {
      parser: format.parserPlain,
    },
    plugins: {
      format,
    },
    rules: {
      'format/prettier': ['error', { parser: 'css', tabWidth: 2 }],
    },
  },

  // use dprint to format TOML
  {
    files: ['**/*.toml'],
    languageOptions: {
      parser: format.parserPlain,
    },
    plugins: {
      format,
    },
    rules: {
      'format/dprint': ['error', { language: 'toml', languageOptions: { indentWidth: 2 } }],
    },
  },
]
```

## Rules

### `format/prettier`

Use Prettier to format files.

#### Options

- `parser` (required) - the language to format, [Supported languages](https://prettier.io/docs/en/options.html#parser)
- The rest options are passed as Prettier options

### `format/dprint`

Use dprint to format files.

#### Options

- `language` (required) - the language to format, or can be a filepath or URL to the WASM binary. [Supported languages](https://dprint.dev/plugins/)
- `languageOptions` - the options for the language
- The rest options are passed as dprint's general options

## Credits

Thanks to the existing works for references and inspiration.

- [eslint-plugin-format](https://github.com/antfu/eslint-plugin-format)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [eslint-plugin-dprint-integration](https://github.com/so1ve/eslint-plugin-dprint-integration)

## License

[MIT](./LICENSE) License

Copyright (c) 2022 Anthony Fu <https://github.com/antfu>
<br />
Copyright (c) 2024-present Biscuit Tin <opensource@biscuitt.in>
