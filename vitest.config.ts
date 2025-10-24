/* eslint-disable @typescript-eslint/no-unsafe-assignment -- We trust the typescript API */
/* eslint-disable @typescript-eslint/only-throw-error -- Ignore this rule */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { type CompilerOptions, findConfigFile, parseJsonConfigFileContent, readConfigFile, sys } from 'typescript'
import { defineProject, type TestProjectConfiguration } from 'vitest/config'

const isTestFileGlobExpr = (expr: string) => expr.includes('.spec.')

const tsconfigPath = findConfigFile(process.cwd(), fs.existsSync)
if (!tsconfigPath) throw new Error('tsconfig.json not found')

const { config: tsconfig, error } = readConfigFile(
  tsconfigPath,
  (p) => fs.readFileSync(p, 'utf8'),
)
if (error) throw error

const { projectReferences } = parseJsonConfigFileContent(
  tsconfig,
  sys,
  path.dirname(tsconfigPath),
  {},
  tsconfigPath,
)

const projects: {
  files: string[]
  options: CompilerOptions
}[] = []
if (projectReferences) {
  for (const { path: p } of projectReferences) {
    const { config: tsconfig, error } = readConfigFile(p, (p) => fs.readFileSync(p, 'utf8'))
    if (error) throw error
    const { options, fileNames, errors } = parseJsonConfigFileContent(
      tsconfig,
      sys,
      path.dirname(p),
      {},
      p,
    )
    if (errors.length > 0) {
      for (const error of errors) {
        console.warn(
          `[vitest] ${
            typeof error.messageText === 'string'
              ? error.messageText
              : error.messageText.messageText
          }`,
        )
      }
    }
    if (fileNames.some((name) => isTestFileGlobExpr(name))) {
      projects.push({ files: fileNames, options })
    }
  }
}

export default defineProject({
  test: {
    projects: projects.map<TestProjectConfiguration>(({ files, options }) => ({
      test: {
        coverage: {
          provider: 'v8',
          include: ['packages/**/src/**/*.ts', 'packages/**/src/**/*.tsx'],
          exclude: ['packages/eslint-config/**'],
        },
        name: options.customConditions?.includes('browser') ? 'browser' : 'node',
        include: files,
        environment: options.customConditions?.includes('browser') ? 'happy-dom' : 'node',
      },
      ssr: {
        target: options.customConditions?.includes('browser') ? 'webworker' : 'node',
      },
      plugins: [
        {
          name: 'anonymous:overrideConditions',
          config: (config) => {
            config.resolve ??= {}
            config.resolve.conditions = options.customConditions ?? ['default']
          },
        },
      ],
    })),
  },
})
