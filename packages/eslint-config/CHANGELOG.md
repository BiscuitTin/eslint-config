# Changelog

## [0.1.0](https://github.com/BiscuitTin/eslint-config/compare/eslint-config-v0.0.7...eslint-config-v0.1.0) (2025-08-06)


### ⚠ BREAKING CHANGES

* replace eslint-plugin-tailwindcss with eslint-plugin-better-tailwindcss ([#159](https://github.com/BiscuitTin/eslint-config/issues/159))
* remove jsonc recommended rules, only use eslint/json rules by default ([#155](https://github.com/BiscuitTin/eslint-config/issues/155))
* import plugins in separate files ([#154](https://github.com/BiscuitTin/eslint-config/issues/154))

### Features

* eslint plugin stylistic and next-js rules migrate ([#153](https://github.com/BiscuitTin/eslint-config/issues/153)) ([dbc30c2](https://github.com/BiscuitTin/eslint-config/commit/dbc30c2e041dcd48c3a294a3e24d811521cff397))
* import plugins in separate files ([#154](https://github.com/BiscuitTin/eslint-config/issues/154)) ([948d9f7](https://github.com/BiscuitTin/eslint-config/commit/948d9f7b661f8e679ad14ae28ce8b3f4427b3862))
* remove jsonc recommended rules, only use eslint/json rules by default ([#155](https://github.com/BiscuitTin/eslint-config/issues/155)) ([0763ad2](https://github.com/BiscuitTin/eslint-config/commit/0763ad212390da7aecb5238b3845badec0909f4b))
* replace eslint-plugin-tailwindcss with eslint-plugin-better-tailwindcss ([#159](https://github.com/BiscuitTin/eslint-config/issues/159)) ([b3ac9c6](https://github.com/BiscuitTin/eslint-config/commit/b3ac9c6b615b6bf1618bcd42a53f61f97efe316c))
* update eslint packages ([#151](https://github.com/BiscuitTin/eslint-config/issues/151)) ([37bdf1b](https://github.com/BiscuitTin/eslint-config/commit/37bdf1bda21e2b31906a579ff59d32bc947b9102))

## [0.0.7](https://github.com/BiscuitTin/eslint-config/compare/eslint-config-v0.0.6...eslint-config-v0.0.7) (2025-07-28)


### Features

* replace jiek with tsdown ([#147](https://github.com/BiscuitTin/eslint-config/issues/147)) ([2e19f9c](https://github.com/BiscuitTin/eslint-config/commit/2e19f9c5712c7c3ef19a9d319156c07ff6657050))

## [0.0.6](https://github.com/BiscuitTin/eslint-config/compare/eslint-config-v0.0.5...eslint-config-v0.0.6) (2025-03-24)


### Bug Fixes

* try fix import x lint errors when use yarn pnp ([#90](https://github.com/BiscuitTin/eslint-config/issues/90)) ([6e80053](https://github.com/BiscuitTin/eslint-config/commit/6e800539076a559d067dc48064f3d5ee8920b864))

## [0.0.5](https://github.com/BiscuitTin/eslint-config/compare/eslint-config-v0.0.4...eslint-config-v0.0.5) (2025-03-23)


### Features

* add no-leaked-event-listener and no-unnecessary-use-callback rules ([#28](https://github.com/BiscuitTin/eslint-config/issues/28)) ([3bce3c0](https://github.com/BiscuitTin/eslint-config/commit/3bce3c0871b6dc922d7a8e43390f6fb3004fbcf2))
* bootstrap release please ([#13](https://github.com/BiscuitTin/eslint-config/issues/13)) ([db0dc10](https://github.com/BiscuitTin/eslint-config/commit/db0dc109cf86e8215c1a39ee3a2ee493dceda3ea))
* generate provenance statements for publish ([#17](https://github.com/BiscuitTin/eslint-config/issues/17)) ([8b4454c](https://github.com/BiscuitTin/eslint-config/commit/8b4454c1e3cc453b080d1a855a384dc5557e3268))
* migrate the entire project ([#1](https://github.com/BiscuitTin/eslint-config/issues/1)) ([54224df](https://github.com/BiscuitTin/eslint-config/commit/54224dfc369f2ba76362bb93b46fb4962a923810))
* remove eslint-plugin-react-prefer-function-component and update dependencies ([#83](https://github.com/BiscuitTin/eslint-config/issues/83)) ([8b8431e](https://github.com/BiscuitTin/eslint-config/commit/8b8431eb4cfabec2067ec1f0eca6dad3e3e2a371))
* set '@eslint-react/no-duplicate-key' to error and update plugin settings ([#74](https://github.com/BiscuitTin/eslint-config/issues/74)) ([f0c7ae8](https://github.com/BiscuitTin/eslint-config/commit/f0c7ae8c2ee9bb117150a8f37cf2351f41f30f8c))
* strict limitations on the scope of files to which the rules apply ([#20](https://github.com/BiscuitTin/eslint-config/issues/20)) ([b5a7df3](https://github.com/BiscuitTin/eslint-config/commit/b5a7df3703221e63024b5bafda7a776f6d6977b2))
* update typegen import ([#21](https://github.com/BiscuitTin/eslint-config/issues/21)) ([3d12e69](https://github.com/BiscuitTin/eslint-config/commit/3d12e698b48eee1d490841b3c94505056d0b7d0c))


### Bug Fixes

* add ts-api-utils as peer dependencies ([#45](https://github.com/BiscuitTin/eslint-config/issues/45)) ([81a26c9](https://github.com/BiscuitTin/eslint-config/commit/81a26c9b515a29cc44231b429515fbea1ca22e6e))
* correct language options for node js config ([#42](https://github.com/BiscuitTin/eslint-config/issues/42)) ([0be30bb](https://github.com/BiscuitTin/eslint-config/commit/0be30bb62ce8d00fd5e894c903366b3413dcdfa6))
* peer dependencies issue ([#44](https://github.com/BiscuitTin/eslint-config/issues/44)) ([d7aab89](https://github.com/BiscuitTin/eslint-config/commit/d7aab89f97b04c3bc23edfc352880f4fc4639e4e))
* rename rules in eslint-react ([#26](https://github.com/BiscuitTin/eslint-config/issues/26)) ([c94c567](https://github.com/BiscuitTin/eslint-config/commit/c94c56733abe214524b04f51c10653cf0563c4a8))
* rule type error after eslint 9.20.0 ([#58](https://github.com/BiscuitTin/eslint-config/issues/58)) ([e9e1dfb](https://github.com/BiscuitTin/eslint-config/commit/e9e1dfb08e44240b4817cee98d29bea6957a4406))

## [0.0.3](https://github.com/BiscuitTin/eslint-config/compare/eslint-config-v0.0.2...eslint-config-v0.0.3) (2025-01-25)


### Features

* add no-leaked-event-listener and no-unnecessary-use-callback rules ([#28](https://github.com/BiscuitTin/eslint-config/issues/28)) ([3bce3c0](https://github.com/BiscuitTin/eslint-config/commit/3bce3c0871b6dc922d7a8e43390f6fb3004fbcf2))
* update typegen import ([#21](https://github.com/BiscuitTin/eslint-config/issues/21)) ([3d12e69](https://github.com/BiscuitTin/eslint-config/commit/3d12e698b48eee1d490841b3c94505056d0b7d0c))

## [0.0.2](https://github.com/BiscuitTin/eslint-config/compare/eslint-config-v0.0.1...eslint-config-v0.0.2) (2025-01-10)


### Features

* bootstrap release please ([#13](https://github.com/BiscuitTin/eslint-config/issues/13)) ([db0dc10](https://github.com/BiscuitTin/eslint-config/commit/db0dc109cf86e8215c1a39ee3a2ee493dceda3ea))
* generate provenance statements for publish ([#17](https://github.com/BiscuitTin/eslint-config/issues/17)) ([8b4454c](https://github.com/BiscuitTin/eslint-config/commit/8b4454c1e3cc453b080d1a855a384dc5557e3268))
* migrate the entire project ([#1](https://github.com/BiscuitTin/eslint-config/issues/1)) ([54224df](https://github.com/BiscuitTin/eslint-config/commit/54224dfc369f2ba76362bb93b46fb4962a923810))
* strict limitations on the scope of files to which the rules apply ([#20](https://github.com/BiscuitTin/eslint-config/issues/20)) ([b5a7df3](https://github.com/BiscuitTin/eslint-config/commit/b5a7df3703221e63024b5bafda7a776f6d6977b2))


### Bug Fixes

* rename rules in eslint-react ([#26](https://github.com/BiscuitTin/eslint-config/issues/26)) ([c94c567](https://github.com/BiscuitTin/eslint-config/commit/c94c56733abe214524b04f51c10653cf0563c4a8))
