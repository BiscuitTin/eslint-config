import type { Linter } from 'eslint'

export interface OptionsEnvironment {
  env?: {
    /**
     * Enable browser global variables.
     *
     * @default true
     */
    browser?: boolean

    /**
     * Custom global variables.
     *
     * @default undefined
     * @see [Configuring global variables](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-global-variables)
     */
    customGlobals?: Record<string, Linter.GlobalConf> | undefined
  }
}

export interface OptionsIsInEditor {
  /**
   * Set to `true` if the code is running in an editor.
   *
   * @default false
   */
  isInEditor?: boolean
}

export interface OptionsExtraFiles {
  /**
   * Extend the `files` option to provide custom globs.
   *
   * @default [] (none)
   */
  extraFiles?: string[]
}

export interface StylisticConfig {
  /**
   * The maximum line length.
   *
   * @default 120
   */
  printWidth?: number

  /**
   * The number of spaces to use for indentation.
   *
   * @default 2
   */
  indentWidth?: number

  /**
   * Use tabs instead of spaces.
   *
   * @default false
   */
  useTabs?: boolean

  /**
   * How semi-colons should be used.
   * - `true`: Always uses semi-colons where applicable.
   * - `false`: Uses automatic semi-colon insertion.
   *
   * @default false
   */
  semi?: boolean

  /**
   * The quote style to use.
   * - `'single'`: Prefers using double quotes except in scenarios where the
   *  string contains more double quotes than single quotes.
   * - `'double'`: Prefers using single quotes except in scenarios where the
   *  string contains more single quotes than double quotes.
   *
   * @default 'single'
   */
  quotes?: 'single' | 'double'

  /**
   * The quote style to use for JSX attributes.
   * - `'single'`: Prefers using double quotes except in scenarios where the
   *  string contains more double quotes than single quotes.
   * - `'double'`: Prefers using single quotes except in scenarios where the
   *  string contains more single quotes than double quotes.
   *
   * @default 'double'
   */
  jsxQuotes?: 'single' | 'double'

  /**
   * How trailing commas should be used.
   * - `'none'`: Trailing commas should not be used.
   * - `'all'`: Trailing commas should always be used.
   * - `'multiline'`: Trailing commas should only be used in multi-line scenarios.
   *
   * @default 'multiline'
   */
  trailingComma?: 'none' | 'all' | 'multiline'

  /**
   * The end of line character to use.
   * - `'auto'`: For each file, uses the last newline kind found in the file.
   * - `'lf'`: Uses the line feed character.
   * - `'crlf'`: Uses the carriage return and line feed characters.
   * - `'system'`: Uses the system standard (ex. crlf on Windows).
   *
   * @default 'lf'
   */
  endOfLine?: 'auto' | 'lf' | 'crlf' | 'system'
}

export interface OptionsStylistic {
  /**
   * Enable stylistic rules.
   *
   * @default {
   *   printWidth: 120,
   *   indentWidth: 2,
   *   useTabs: false,
   *   semi: false,
   *   quotes: 'single',
   *   jsxQuotes: 'double',
   *   trailingCommas: 'multiline'
   * }
   */
  stylistic?: boolean | StylisticConfig
}

export interface OptionsJavaScript extends OptionsEnvironment {
  /**
   * Set JavaScript source type to module.
   *
   * @default true
   */
  module?: boolean
}

export interface OptionsTypeScript extends OptionsIsInEditor {
  /**
   * A path to your project's TSConfig.
   * This setting or [projectService](https://typescript-eslint.io/packages/parser/#projectservice)
   * are required to use [rules which require type information](https://typescript-eslint.io/getting-started/typed-linting).
   * Setting this option to `true` will using [projectService](https://typescript-eslint.io/packages/parser/#projectservice).
   *
   * @default true
   * @see [@typescript-eslint/parser#project](https://typescript-eslint.io/packages/parser/#project)
   */
  tsconfigPath?: string | string[] | true

  /**
   * This option allows you to provide the root directory for relative
   * TSConfig paths specified in the project option above. Doing so ensures
   * running ESLint from a directory other than the root will still be able
   * to find your TSConfig.
   *
   * @default process.cwd()
   * @see [@typescript-eslint/parser#tsconfigRootDir](https://typescript-eslint.io/packages/parser/#tsconfigrootdir)
   */
  tsconfigRootDir?: string

  /**
   * Globs of files to allow running with the default project compiler options
   * despite not being matched by the project service. It takes in an array of
   * string paths that will be resolved relative to the [tsconfigRootDir](https://typescript-eslint.io/packages/parser/#tsconfigrootdir).
   *
   * @default [] (none)
   * @see [@typescript-eslint/parser#allowDefaultProject](https://typescript-eslint.io/packages/parser/#allowdefaultproject)
   */
  allowDefaultProject?: string[]

  /**
   * This option allows you to provide one or more additional file extensions
   * which should be considered in the TypeScript Program compilation. The
   * default extensions are `['.js', '.mjs', '.cjs', '.jsx', '.ts', '.mts', '.cts', '.tsx']`.
   * Add extensions starting with `.`, followed by the file extension. E.g.
   * for a `.vue` file use `"extraFileExtensions": [".vue"]`.
   *
   * @default [] (none)
   * @see [@typescript-eslint/parser#extraFileExtensions](https://typescript-eslint.io/packages/parser/#extrafileextensions)
   */
  extraFileExtensions?: string[]

  /**
   * Enable [@eslint-react/eslint-plugin](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin) type-checking rules.
   *
   * @default `true` when `react` is enabled, otherwise `false`
   */
  reactTypeCheck?: boolean
}

export type OptionsJson = OptionsExtraFiles & OptionsStylistic

export interface OptionsReact {
  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean

  /**
   * Enable React Compiler rules.
   *
   * @default false
   */
  reactCompiler?: boolean
}

export interface OptionsNodeJs extends OptionsExtraFiles {
  /**
   * Set JavaScript source type to module.
   *
   * @default Auto detect by package.json `type` field
   */
  module?: boolean
}

export interface InternalOptionsFormat {
  extraJsonFiles?: string[]
}

export interface OptionsFormat extends StylisticConfig {
  /**
   * Path to the configuration file for `dprint`.
   *
   * @default 'dprint.json'
   */
  dprintConfigPath?: string
}
