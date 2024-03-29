## [4.0.3](https://github.com/amclin/videojs-scene7/compare/v4.0.2...v4.0.3) (2023-02-10)


### Bug Fixes

* **deps:** bump @xmldom/xmldom from 0.7.6 to 0.7.9 ([a03fff7](https://github.com/amclin/videojs-scene7/commit/a03fff7bc1db4a0f2c53b89c208a7ff242332568))
* **deps:** bump minimist from 1.2.5 to 1.2.6 ([b81a6c5](https://github.com/amclin/videojs-scene7/commit/b81a6c57166b03ae7ce5104e6ddb1a6b9be6a53e))
* **deps:** bump ua-parser-js from 0.7.31 to 0.7.33 ([56c1a55](https://github.com/amclin/videojs-scene7/commit/56c1a55b243df70d6b05853c980b1c6e58a52699))

## [4.0.2](https://github.com/amclin/videojs-scene7/compare/v4.0.1...v4.0.2) (2023-02-10)


### Bug Fixes

* rename config files to support Rollup 3 ([cc61f86](https://github.com/amclin/videojs-scene7/commit/cc61f86380479eb07dbac1785af10cb07279c706))

## [4.0.1](https://github.com/amclin/videojs-scene7/compare/v4.0.0...v4.0.1) (2023-02-10)


### Bug Fixes

* **deps:** bump minimist from 1.2.5 to 1.2.6 ([e1d3b45](https://github.com/amclin/videojs-scene7/commit/e1d3b453fbb6f3bd0b15fbcaf8905430c29f88d0))

# [4.0.0](https://github.com/amclin/videojs-scene7/compare/v3.0.0...v4.0.0) (2023-02-10)


### Features

* **security:** switch all HTTP to HTTPS ([5a89645](https://github.com/amclin/videojs-scene7/commit/5a896456b2c887f08c79257ae513a62020933070)), closes [#1034](https://github.com/amclin/videojs-scene7/issues/1034)


### BREAKING CHANGES

* **security:** defaults are now https instead of http

Connections to Adobe-provided scripts are now done
using HTTPS instead of HTTP. Should not be an issue

# [3.0.0](https://github.com/amclin/videojs-scene7/compare/v2.2.11...v3.0.0) (2023-02-10)


### Bug Fixes

* **deps:** bump http-cache-semantics from 4.1.0 to 4.1.1 ([9bb2687](https://github.com/amclin/videojs-scene7/commit/9bb2687079eaacb51a54f52885d2e32dd5735b4c))
* **deps:** bump ua-parser-js from 0.7.31 to 0.7.33 ([f2f9791](https://github.com/amclin/videojs-scene7/commit/f2f9791ff6b7a71254984890f891a443a31719b1))


### Continuous Integration

* start testing Node 18 future-proofed using `lts` keyword ([ddbda81](https://github.com/amclin/videojs-scene7/commit/ddbda810fff3ca3c26f3c6fba25dbb9f71138664))


### Features

* support Node 18 and future LTS releases ([3ed1008](https://github.com/amclin/videojs-scene7/commit/3ed10084ad4d0aa7203d1c3ba7b906b31006839c))


### BREAKING CHANGES

* no longer supports Node 12

Various libraries are starting to drop support for Node 12.
While this only affects the dev dependencies of this project
it's only a matter of time before something critical drops
support. So to keep maintenance easy, we're dropping
v12 now as it is past EOL already and moving to 14, 16,
and 18 LTS versions.

Recommended action: upgrade your project from Node 12
to a later LTS release (14, 16, 18)
* no longer supports Node 12

Various libraries are starting to drop support for Node 12.
While this only affects the dev dependencies of this project
it's only a matter of time before something critical drops
support. So to keep maintenance easy, we're dropping
v12 now as it is past EOL already and moving to 14, 16,
and 18 LTS versions.

Recommended action: upgrade your project from Node 12
to a later LTS release (14, 16, 18)

## [2.2.11](https://github.com/amclin/videojs-scene7/compare/v2.2.10...v2.2.11) (2023-01-04)


### Bug Fixes

* **deps:** bump @xmldom/xmldom from 0.7.6 to 0.7.9 ([5744616](https://github.com/amclin/videojs-scene7/commit/5744616095e7e4558bc7c4d68ca91bb0c707f3db))

## [2.2.10](https://github.com/amclin/videojs-scene7/compare/v2.2.9...v2.2.10) (2022-11-22)


### Bug Fixes

* **deps:** bump engine.io from 6.2.0 to 6.2.1 ([2229ef7](https://github.com/amclin/videojs-scene7/commit/2229ef756a949b2643e1bcf1d57a49ab0337737a))

## [2.2.9](https://github.com/amclin/videojs-scene7/compare/v2.2.8...v2.2.9) (2022-11-15)


### Bug Fixes

* **deps:** bump minimatch from 3.0.4 to 3.1.2 ([8f5cccd](https://github.com/amclin/videojs-scene7/commit/8f5cccdbd303c8feb2c789d0f0cef84d6aa64efb))

## [2.2.8](https://github.com/amclin/videojs-scene7/compare/v2.2.7...v2.2.8) (2022-10-25)


### Bug Fixes

* **deps:** bump @xmldom/xmldom from 0.7.5 to 0.7.6 ([3454d85](https://github.com/amclin/videojs-scene7/commit/3454d85003c4994acc43eea488b6c56882ff32da))

## [2.2.7](https://github.com/amclin/videojs-scene7/compare/v2.2.6...v2.2.7) (2022-06-22)


### Bug Fixes

* **deps:** bump shell-quote from 1.6.1 to 1.7.3 ([bc2f905](https://github.com/amclin/videojs-scene7/commit/bc2f90537d6fe3978ad462eadfcea43fce2bd85d))

## [2.2.6](https://github.com/amclin/videojs-scene7/compare/v2.2.5...v2.2.6) (2022-06-06)


### Bug Fixes

* **deps:** bump ansi-regex from 5.0.0 to 5.0.1 ([83b1fff](https://github.com/amclin/videojs-scene7/commit/83b1fff6071de3d444a89d656e9d4ec4a4e3782e))

## [2.2.5](https://github.com/amclin/videojs-scene7/compare/v2.2.4...v2.2.5) (2022-06-02)


### Bug Fixes

* **deps:** bump npm from 8.9.0 to 8.11.0 ([f4146b2](https://github.com/amclin/videojs-scene7/commit/f4146b225bb6fa5d1c53f34c25b9833d1e173ae0))

## [2.2.4](https://github.com/amclin/videojs-scene7/compare/v2.2.3...v2.2.4) (2022-05-10)


### Bug Fixes

* **deps:** bump follow-redirects from 1.14.5 to 1.15.0 ([5cf5380](https://github.com/amclin/videojs-scene7/commit/5cf5380847d8943dd4e1ac25b8534d5aab87fce6))
* **deps:** bump log4js from 6.3.0 to 6.4.6 ([8d8c7d6](https://github.com/amclin/videojs-scene7/commit/8d8c7d6d2700a73c47a3d7ce394bf4578a6d2640))

## [2.2.3](https://github.com/amclin/videojs-scene7/compare/v2.2.2...v2.2.3) (2022-05-09)


### Bug Fixes

* **deps:** bump node-fetch from 2.6.6 to 2.6.7 ([d047e51](https://github.com/amclin/videojs-scene7/commit/d047e511fd8560969ab18d792314129550a98232))

## [2.2.2](https://github.com/amclin/videojs-scene7/compare/v2.2.1...v2.2.2) (2022-05-06)


### Bug Fixes

* **deps:** bump ajv from 6.10.0 to 6.12.6 ([48df671](https://github.com/amclin/videojs-scene7/commit/48df671817397f3a39d822d70a03ef588e05eabb))

## [2.2.1](https://github.com/amclin/videojs-scene7/compare/v2.2.0...v2.2.1) (2022-05-06)


### Bug Fixes

* **deps:** bump engine.io from 6.1.0 to 6.1.1 ([adebcc3](https://github.com/amclin/videojs-scene7/commit/adebcc3efa820b4630a5645470c1fbde0b84aef5))

# [2.2.0](https://github.com/amclin/videojs-scene7/compare/v2.1.14...v2.2.0) (2021-10-14)


### Features

* **deps-dev:** [security] update to latest rollup v2.58 and all plugins ([f201599](https://github.com/amclin/videojs-scene7/commit/f2015993421ee1d17dc6101fc00b450f042476da))

## [2.1.14](https://github.com/amclin/videojs-scene7/compare/v2.1.13...v2.1.14) (2021-10-14)


### Bug Fixes

* **deps:** bump path-parse from 1.0.6 to 1.0.7 ([9c73316](https://github.com/amclin/videojs-scene7/commit/9c73316f51561bfe91f6fe8a3291b69494a407d7))

## [2.1.13](https://github.com/amclin/videojs-scene7/compare/v2.1.12...v2.1.13) (2021-06-22)


### Bug Fixes

* **deps:** [security] bump normalize-url from 6.0.0 to 6.1.0 ([6c9882f](https://github.com/amclin/videojs-scene7/commit/6c9882f6f467517cc488f216ca06361ee0c21c8a))

## [2.1.12](https://github.com/amclin/videojs-scene7/compare/v2.1.11...v2.1.12) (2021-06-08)


### Bug Fixes

* **deps:** [security] bump glob-parent from 5.1.0 to 5.1.2 ([d3af588](https://github.com/amclin/videojs-scene7/commit/d3af58853e85224ab865345a1e0c471b760ad1c6))
* **deps:** [security] bump trim-newlines from 3.0.0 to 3.0.1 ([6a93914](https://github.com/amclin/videojs-scene7/commit/6a9391428397599fdfb9d9779373902d23fe1d25))

## [2.1.11](https://github.com/amclin/videojs-scene7/compare/v2.1.10...v2.1.11) (2021-05-07)


### Bug Fixes

* **deps:** [security] bump hosted-git-info from 2.7.1 to 2.8.9 ([14b80ca](https://github.com/amclin/videojs-scene7/commit/14b80cae81ab3d22e03602eec5d7253668def683))

## [2.1.10](https://github.com/amclin/videojs-scene7/compare/v2.1.9...v2.1.10) (2021-05-06)


### Bug Fixes

* **deps:** [security] bump lodash from 4.17.19 to 4.17.21 ([27fddcd](https://github.com/amclin/videojs-scene7/commit/27fddcd7b1aeae8e2c0b82bb5be2f9b2e29cfdaa))

## [2.1.9](https://github.com/amclin/videojs-scene7/compare/v2.1.8...v2.1.9) (2021-03-29)


### Bug Fixes

* **deps:** [security] bump y18n from 4.0.0 to 4.0.1 ([1882d23](https://github.com/amclin/videojs-scene7/commit/1882d2330d1a160cf4aafd92c4d70c5b9d0e6141))

## [2.1.8](https://github.com/amclin/videojs-scene7/compare/v2.1.7...v2.1.8) (2021-03-09)


### Bug Fixes

* **deps:** [security] bump socket.io from 2.3.0 to 2.4.1 ([cc9620e](https://github.com/amclin/videojs-scene7/commit/cc9620e80c3b03d55913eee951cf0b17758726c7))

## [2.1.7](https://github.com/amclin/videojs-scene7/compare/v2.1.6...v2.1.7) (2020-12-10)


### Bug Fixes

* **deps:** [security] bump ini from 1.3.5 to 1.3.7 ([5e3922d](https://github.com/amclin/videojs-scene7/commit/5e3922d833da7d77340f98e9047d1b309a05b30e))

## [2.1.6](https://github.com/amclin/videojs-scene7/compare/v2.1.5...v2.1.6) (2020-11-18)


### Bug Fixes

* **deps:** [security] bump npm-user-validate from 1.0.0 to 1.0.1 ([2955026](https://github.com/amclin/videojs-scene7/commit/295502653f69ce6f2bcb22ced2faef6883f0c4d8))

## [2.1.5](https://github.com/amclin/videojs-scene7/compare/v2.1.4...v2.1.5) (2020-10-17)


### Bug Fixes

* **deps:** [security] bump npm-user-validate from 1.0.0 to 1.0.1 ([494c01f](https://github.com/amclin/videojs-scene7/commit/494c01f0ac1f39eb98efadfe0e4b7f52bb10df94))

## [2.1.4](https://github.com/amclin/videojs-scene7/compare/v2.1.3...v2.1.4) (2020-07-16)


### Bug Fixes

* **deps:** [security] bump lodash from 4.17.14 to 4.17.19 ([9188441](https://github.com/amclin/videojs-scene7/commit/91884418b99183b2f27d035337d97bed22db091f))

## [2.1.3](https://github.com/amclin/videojs-scene7/compare/v2.1.2...v2.1.3) (2020-07-07)


### Bug Fixes

* **deps:** [security] bump npm-registry-fetch from 4.0.3 to 4.0.5 ([8852c4f](https://github.com/amclin/videojs-scene7/commit/8852c4f579aebf81e000b5107d6091939fc001c8))

## [2.1.2](https://github.com/amclin/videojs-scene7/compare/v2.1.1...v2.1.2) (2020-04-02)


### Bug Fixes

* **deps:** [security] bump kind-of from 6.0.0 to 6.0.3 ([0c3b00e](https://github.com/amclin/videojs-scene7/commit/0c3b00e0746068e14957f4925b35d50a9e970024))

## [2.1.1](https://github.com/amclin/videojs-scene7/compare/v2.1.0...v2.1.1) (2020-03-13)


### Bug Fixes

* **deps:** [security] bump acorn from 6.3.0 to 6.4.1 ([1ecd686](https://github.com/amclin/videojs-scene7/commit/1ecd686541ab1bb6feac0575c4ce8796d292cca2))

# [2.1.0](https://github.com/amclin/videojs-scene7/compare/v2.0.0...v2.1.0) (2019-07-24)


### Features

* **playback:** support replay button shown when video completes ([c26f4a4](https://github.com/amclin/videojs-scene7/commit/c26f4a4)), closes [#3](https://github.com/amclin/videojs-scene7/issues/3)



# [2.0.0](https://github.com/amclin/videojs-scene7/compare/v1.1.0...v2.0.0) (2019-07-09)


### Bug Fixes

* update babel dependencies to latest versions ([0ddd098](https://github.com/amclin/videojs-scene7/commit/0ddd098))


### BREAKING CHANGES

* Babel and ES2015 profiles have been updated
to more modern versions.

No functionality is broken by this update, but there is a possibility
this may cause backwards compatibility issues with integrations due
to the switch to more modern version of Babel and ES2015 profiles.
External bundlers or loaders should be tested to ensure they still work
as there may be subtle differences in the module closures.



# [1.1.0](https://github.com/amclin/videojs-scene7/compare/v1.0.0...v1.1.0) (2019-05-04)


### Features

* loops videos enabled with loop attribute ([8630a84](https://github.com/amclin/videojs-scene7/commit/8630a84)), closes [#7](https://github.com/amclin/videojs-scene7/issues/7)



# [1.0.0](https://github.com/amclin/videojs-scene7/compare/v0.7.4...v1.0.0) (2019-05-04)


### Code Refactoring

* move videoJS to a peer dependency ([ed4a976](https://github.com/amclin/videojs-scene7/commit/ed4a976))


### Features

* support VideoJS 7 ([59ed779](https://github.com/amclin/videojs-scene7/commit/59ed779))


### BREAKING CHANGES

* VideoJS is no longer included as a dependency. Now it must be installed separately as a peer dependency.



## [0.7.4](https://github.com/amclin/videojs-scene7/compare/v0.7.3...v0.7.4) (2019-03-24)


### Bug Fixes

* rollback to VideoJS 5 in local testing ([f2a16dc](https://github.com/amclin/videojs-scene7/commit/f2a16dc))
* update to latest VideoJS v5 for demo page ([da6974e](https://github.com/amclin/videojs-scene7/commit/da6974e))



## [0.7.3](https://github.com/amclin/videojs-scene7/compare/v0.7.2...v0.7.3) (2019-03-24)


### Bug Fixes

* resolve plugin warnings during install ([7f31489](https://github.com/amclin/videojs-scene7/commit/7f31489))
* update rollup dependency for module packaging ([1848bb7](https://github.com/amclin/videojs-scene7/commit/1848bb7))
* update rollup dependency to 0.56.5 ([de71524](https://github.com/amclin/videojs-scene7/commit/de71524))
* update rollup dependency to 1.0 branch ([85a7795](https://github.com/amclin/videojs-scene7/commit/85a7795))



## [0.7.2](https://github.com/amclin/videojs-scene7/compare/v0.7.1...v0.7.2) (2019-03-23)


### Bug Fixes

* update bannerize dependency to latest for security update ([cbd1a19](https://github.com/amclin/videojs-scene7/commit/cbd1a19)), closes [misteroneill/bannerize/#10](https://github.com/misteroneill/bannerize//issues/10)



<a name="0.7.1"></a>
## 0.7.1 (2019-03-18)

### Bugfixes
* #10 Scene7 Player is not supporting multiple videos on single page

### Chores

* enable semantic release ([a486d7a](https://github.com/amclin/videojs-scene7/commit/a486d7a))

### Tests

* supports unit tests in Safari on Mojave ([99fab81](https://github.com/amclin/videojs-scene7/commit/99fab81))

<a name="0.7.0"></a>
# [0.7.0](https://github.com/amclin/videojs-scene7/compare/v0.6.0...v0.7.0) (2017-10-26)

<a name="0.6.0"></a>
# [0.6.0](https://github.com/amclin/videojs-scene7/compare/v0.5.2...v0.6.0) (2017-10-26)

<a name="0.5.2"></a>
## [0.5.2](https://github.com/amclin/videojs-scene7/compare/v0.5.1...v0.5.2) (2017-10-25)

<a name="0.5.1"></a>
## [0.5.1](https://github.com/amclin/videojs-scene7/compare/v0.5.0...v0.5.1) (2017-10-24)

<a name="0.5.0"></a>
# [0.5.0](https://github.com/amclin/videojs-scene7/compare/v0.4.0...v0.5.0) (2017-10-24)

<a name="0.4.0"></a>
# [0.4.0](https://github.com/amclin/videojs-scene7/compare/v0.3.2...v0.4.0) (2017-10-23)

<a name="0.3.2"></a>
## [0.3.2](https://github.com/amclin/videojs-scene7/compare/v0.3.1...v0.3.2) (2017-10-21)

<a name="0.3.1"></a>
## [0.3.1](https://github.com/amclin/videojs-scene7/compare/v0.3.0...v0.3.1) (2017-10-20)

<a name="0.3.0"></a>
# [0.3.0](https://github.com/amclin/videojs-scene7/compare/v0.2.0...v0.3.0) (2017-10-20)

<a name="0.2.0"></a>
# [0.2.0](https://github.com/amclin/videojs-scene7/compare/v0.1.1...v0.2.0) (2017-10-20)

<a name="0.1.1"></a>
## [0.1.1](https://github.com/amclin/videojs-scene7/compare/v0.1.0...v0.1.1) (2017-10-19)

<a name="0.1.0"></a>
# 0.1.0 (2017-10-19)
