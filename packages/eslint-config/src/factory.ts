import type { Linter } from 'eslint'

import { FlatConfigComposer, type ResolvableFlatConfig } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'

import type {
  InternalOptionsFormat,
  OptionsExtraFiles,
  OptionsFormat,
  OptionsIsInEditor,
  OptionsJavaScript,
  OptionsJson,
  OptionsNodeJs,
  OptionsReact,
  OptionsTypeScript,
} from './options.js'
import type { Awaitable, ConfigNames, TypedFlatConfigItem } from './types.js'

import {
  comments,
  disables,
  formatters,
  ignores,
  imports,
  javascript,
  json,
  jsx,
  nextJs,
  nodeJs,
  react,
  regexp,
  tailwindcss,
  typescript,
  unicorn,
} from './configs/index.js'
import { isInEditorEnv } from './utils/index.js'

type UserConfig =
  | TypedFlatConfigItem
  | TypedFlatConfigItem[]
  | FlatConfigComposer<TypedFlatConfigItem, string>
  | Linter.Config
  | Linter.Config[]

// Copied from SukkaW/eslint-config-sukka
// Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3a04c31727e0b5bab98fda1a6440f9932fe42dd8/packages/eslint-config-sukka/src/factory.ts#L33
type SharedOptions<T = object> = Omit<T, 'isInEditor' | 'enable'> & {
  enable?: boolean
}

type ConfigOptions<T = object> = T & OptionsIsInEditor

interface ESLintConfigOptions {
  ignores?: string[]
  format?: SharedOptions<OptionsFormat> | boolean
  javascript?: SharedOptions<OptionsJavaScript> | boolean
  typescript?: SharedOptions<OptionsTypeScript> | boolean
  json?: SharedOptions<OptionsExtraFiles> | boolean
  react?: SharedOptions<OptionsReact> | boolean
  node?: SharedOptions<OptionsNodeJs> | boolean
}

function enabled(options: SharedOptions | boolean | undefined, defaults = false): boolean {
  if (typeof options === 'boolean') return options
  if (options === undefined) return defaults
  if (options.enable) return true
  return defaults
}

function configOptions<T extends SharedOptions>(
  options: SharedOptions<T> | undefined | boolean,
  defaultOptions?: SharedOptions<T>,
): ConfigOptions<T> {
  const isInEditor = isInEditorEnv()
  if (options === undefined) return { isInEditor } as ConfigOptions<T>
  if (typeof options === 'boolean') return { isInEditor } as ConfigOptions<T>
  return { ...defaultOptions, ...options, isInEditor } as ConfigOptions<T>
}

/**
 * Construct an array of ESLint flat config items.
 *
 * @param options
 *  The options for generating the ESLint configurations.
 * @param userConfigs
 *  The user configurations to be merged with the generated configurations.
 * @returns The merged ESLint configurations.
 */
export async function config(
  options?: ESLintConfigOptions,
  ...userConfigs: Awaitable<UserConfig>[]
) {
  const configs: Awaitable<TypedFlatConfigItem[]>[] = []

  const enableTypeScript = enabled(options?.typescript, isPackageExists('typescript'))
  const enableReact = enabled(options?.react, isPackageExists('react'))

  // Base configs
  const importsOption = enableTypeScript ? configOptions(options?.typescript) : {}
  configs.push(ignores(options?.ignores), comments(), imports(importsOption))

  // JavaScript configs
  if (enabled(options?.javascript, true)) {
    configs.push(javascript(configOptions(options?.javascript)))
  }

  // TypeScript configs
  if (enableTypeScript) {
    configs.push(
      typescript(configOptions(options?.typescript, { reactTypeCheck: enableReact })),
    )
  }

  // Json file configs
  if (enabled(options?.json, true)) {
    const formatOption = configOptions(options?.format, { indentWidth: 2 })
    configs.push(json(configOptions<OptionsJson>(options?.json, { stylistic: formatOption })))
  }

  // React configs
  if (enableReact) {
    configs.push(
      jsx(),
      react(
        configOptions(options?.react, {
          reactCompiler: isPackageExists('babel-plugin-react-compiler')
            || isPackageExists('react-compiler-webpack'),
        }),
      ),
    )
  }

  // Next.js configs
  if (enabled(options?.react, isPackageExists('next'))) {
    configs.push(nextJs())
  }

  // Node.js configs
  if (enabled(options?.node, isPackageExists('@types/node'))) {
    configs.push(nodeJs(configOptions(options?.node)))
  }

  // Tailwind CSS configs
  if (enabled(undefined, isPackageExists('tailwindcss'))) {
    configs.push(tailwindcss())
  }

  // Other configs and disable some rules for specific files
  configs.push(regexp(), unicorn(), disables())

  // Formatter configs
  if (enabled(options?.format, isPackageExists('dprint'))) {
    const jsonOptions = configOptions(options?.json)
    configs.push(
      formatters(
        configOptions<OptionsFormat & InternalOptionsFormat>(options?.format, {
          extraJsonFiles: jsonOptions.extraFiles,
        }),
      ),
    )
  }

  let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>(...configs)

  const _userConfigs = userConfigs as ResolvableFlatConfig<TypedFlatConfigItem>[]
  composer = composer.append(..._userConfigs)

  return composer
}
