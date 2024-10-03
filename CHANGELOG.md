# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!-- insertion marker -->
## [4.0.0](https://github.com/yaph/d3-geomap/releases/tag/4.0.0) - 2024-10-03

<small>[Compare with 3.3.0](https://github.com/yaph/d3-geomap/compare/3.3.0...4.0.0)</small>

### Added

- Add CHANGELOG and make task to create it. ([6a1dd19](https://github.com/yaph/d3-geomap/commit/6a1dd19886bb34685a89422b012081e1390312b8) by Ramiro Gómez).
- Add CHANGELOG.md. Add make task to create CHANGELOG.md ([fed2f2f](https://github.com/yaph/d3-geomap/commit/fed2f2f791517402759d806e0f3530ca7233c2f5) by Ramiro Gómez).
- Add and update example maps. ([499bcae](https://github.com/yaph/d3-geomap/commit/499bcae20ed35e9255e1cf0612de057e03edc9a0) by Ramiro Gómez).
- Add github funding info ([f759820](https://github.com/yaph/d3-geomap/commit/f7598208cba92408b80d2df0ef193bcf5dfac57c) by Ramiro Gómez).

### Removed

- Remove geo property from Geomap object (breaking change). ([051a491](https://github.com/yaph/d3-geomap/commit/051a491a984d2e35bf7b99729797ff1b0c1b92bb) by Ramiro Gómez).

## [3.3.0](https://github.com/yaph/d3-geomap/releases/tag/3.3.0) - 2019-12-11

<small>[Compare with 3.2.0](https://github.com/yaph/d3-geomap/compare/3.2.0...3.3.0)</small>

### Added

- Add missing unitid example map and data. ([9cfa6a1](https://github.com/yaph/d3-geomap/commit/9cfa6a1688e82f825047938a7cb799f2558e85e0) by Ramiro Gómez).
- Add unitName function which tests that the desired value is defined, before manipulating it and returning it. ([4b4e8d4](https://github.com/yaph/d3-geomap/commit/4b4e8d43785858b7bf23ae23349fb5b315efac01) by Ramiro Gómez).

## [3.2.0](https://github.com/yaph/d3-geomap/releases/tag/3.2.0) - 2019-10-23

<small>[Compare with 3.1.0](https://github.com/yaph/d3-geomap/compare/3.1.0...3.2.0)</small>

### Removed

- remove white spaces from unit names to fix issue https://github.com/yaph/d3-geomap/issues/55 ([f8c53c3](https://github.com/yaph/d3-geomap/commit/f8c53c320bc20aa97578fd215c557d368f94cca6) by geraldo).

## [3.1.0](https://github.com/yaph/d3-geomap/releases/tag/3.1.0) - 2019-09-24

<small>[Compare with 3.0.0](https://github.com/yaph/d3-geomap/compare/3.0.0...3.1.0)</small>

### Added

- Add example for using geoData property. ([2857e77](https://github.com/yaph/d3-geomap/commit/2857e77c283c913c8af77b1ebbdee9e3d261ad85) by Ramiro Gómez).
- Add keywords and update rollup ([5ca0ed6](https://github.com/yaph/d3-geomap/commit/5ca0ed695ddb35b0e3684dd84c43642f111d954b) by Ramiro Gómez).

### Removed

- Remove package-json.lock ([4710b76](https://github.com/yaph/d3-geomap/commit/4710b76d057a515f992cae89ab72d8825e7911f2) by Ramiro Gómez).

## [3.0.0](https://github.com/yaph/d3-geomap/releases/tag/3.0.0) - 2019-06-11

<small>[Compare with 2.0.0](https://github.com/yaph/d3-geomap/compare/2.0.0...3.0.0)</small>

### Added

- Add Country Index to examples ([2a1017c](https://github.com/yaph/d3-geomap/commit/2a1017cf545f37d75cd3f7348d22539ce7c36def) by Ramiro Gómez).
- Add required import and export statements for base Geomap. Use babel-loader for compiling JS. ([80b4db1](https://github.com/yaph/d3-geomap/commit/80b4db18b17c87870d226f09f03bb2915b63fd4d) by Ramiro Gómez).

### Fixed

- fix default scheme name ([c05672f](https://github.com/yaph/d3-geomap/commit/c05672fa55f17631f001f87ece95a21d7f138e21) by Dylan Praul).

### Removed

- Remove obsolete fix_us_ids.py script, source data is correct now. Fix topojson paths in example files. ([9ea3a92](https://github.com/yaph/d3-geomap/commit/9ea3a9256e482692a3bdef460646c27cae21b851) by Ramiro Gómez).
- Remove vendor files from `dist` Remove topojson files from `src` and version control Remove files in `data` from version control ([81b01d8](https://github.com/yaph/d3-geomap/commit/81b01d890bb1e2e4fa483bd625f51e9c3a327ff2) by Ramiro Gómez).
- Remove non working github item ([95dfb46](https://github.com/yaph/d3-geomap/commit/95dfb46d86cf6a8be704a06b4089e1e43c813464) by Ramiro Gómez).
- Remove import statements for externals ([519b614](https://github.com/yaph/d3-geomap/commit/519b614e15a5394dd3d4c4ec59adbb81ddd3f209) by Ramiro Gómez).

## [2.0.0](https://github.com/yaph/d3-geomap/releases/tag/2.0.0) - 2018-10-19

<small>[Compare with 1.0.2](https://github.com/yaph/d3-geomap/compare/1.0.2...2.0.0)</small>

### Added

- Add more details about issue being fixed ([2ed812d](https://github.com/yaph/d3-geomap/commit/2ed812ddc50bd262aadd74e01f24c8346d7ec8f7) by Ramiro Gómez).

### Fixed

- Fix issue #46: Call toString before trim for cases when data is not loaded from CSV Make this version 2.0.0 ([4c22cba](https://github.com/yaph/d3-geomap/commit/4c22cba48e685f7c582d3072815717942a627638) by Ramiro Gómez).
- Fix issue #41:     - Call map draw with selection as only argument     - Remove draw method from choropleth class     - Assign map.data in geomap.js to selection.datum() Use uncompressed sources in example files. ([bf1050c](https://github.com/yaph/d3-geomap/commit/bf1050c9343c538575d4368fc1fdd5829949af85) by Ramiro Gómez).
- Fix unitId issues Generate country topojson files from previously generated states provinces topojson ([0d68e61](https://github.com/yaph/d3-geomap/commit/0d68e6132abe335155ada2199b4922b071afcc36) by Ramiro Gómez).
- Fixed issue #39: change to correct directory name in README ([e3865de](https://github.com/yaph/d3-geomap/commit/e3865dee10b9a4fa2f8e7021a566830b21c59825) by Ramiro Gómez).

### Removed

- Remove uglify ([db70893](https://github.com/yaph/d3-geomap/commit/db708939da93b31da3927468813c53c79bb9e1c9) by Ramiro Gómez).

## [1.0.2](https://github.com/yaph/d3-geomap/releases/tag/1.0.2) - 2016-06-15

<small>[Compare with 1.0.1](https://github.com/yaph/d3-geomap/compare/1.0.1...1.0.2)</small>

### Fixed

- fixed issue #38: make sure values are definied before coloring countries and changing the title ignore eslint yoda rule ([b816ee8](https://github.com/yaph/d3-geomap/commit/b816ee82e66ae3f1decbb36de6bc772d9dc68df3) by Ramiro Gómez).

### Removed

- Removed old CoffeeScript source files. ([aebadd8](https://github.com/yaph/d3-geomap/commit/aebadd8323cef5f33fd49029e30a7be6808f7e4d) by Ramiro Gómez).

## [1.0.1](https://github.com/yaph/d3-geomap/releases/tag/1.0.1) - 2015-06-16

<small>[Compare with 1.0.0](https://github.com/yaph/d3-geomap/compare/1.0.0...1.0.1)</small>

### Added

- added sample map to readme ([1af38b2](https://github.com/yaph/d3-geomap/commit/1af38b29fe2ce894f7ea5a69d74d17b8d110bb4d) by Ramiro Gómez).

## [1.0.0](https://github.com/yaph/d3-geomap/releases/tag/1.0.0) - 2015-06-16

<small>[Compare with 0.1.0](https://github.com/yaph/d3-geomap/compare/0.1.0...1.0.0)</small>

### Added

- Added unitPrefix accessor, since unitId may not work as an identifier. ([8d0b67b](https://github.com/yaph/d3-geomap/commit/8d0b67baf820c859dd9fe98879f74a154bfb9619) by Ramiro Gómez).
- Added suport for transition animation. ([8177e55](https://github.com/yaph/d3-geomap/commit/8177e55ddc5052a3d35e292cf0703b50bea82ffe) by Ramiro Gómez).
- Added eslint. ([c2b8a79](https://github.com/yaph/d3-geomap/commit/c2b8a79f3c1fb9867f9e2a6ae77be1ebf46149e4) by Ramiro Gómez).
- Added scale and extent attributes. ([df37935](https://github.com/yaph/d3-geomap/commit/df37935abac71295d0ced19fbdef31e55b38b631) by Ramiro Gómez).
- add unitid as path id ([c35de6a](https://github.com/yaph/d3-geomap/commit/c35de6a5cc71c756c83f13eb7ab6a6e2cbd0df65) by Ramiro Gómez).
- added npm badges to readme ([cd288b4](https://github.com/yaph/d3-geomap/commit/cd288b4d43a0d9c478614b0413a694c7a38930f6) by Ramiro Gómez).

### Fixed

- Fix #34 map is now responsive by default. Removed unused margin accessor. Updated example. ([e1721ed](https://github.com/yaph/d3-geomap/commit/e1721ed34125dfefc1e4d22d3628c6bc1cfe92b3) by Ramiro Gómez).
- Fixed zooming out when no unit was clicked. ([b0f0225](https://github.com/yaph/d3-geomap/commit/b0f02256d1575c1d658b5ccc207da9d6670bbbed) by Ramiro Gómez).
- Fixed #31: added missing closing bracket to translate ([a3fd00e](https://github.com/yaph/d3-geomap/commit/a3fd00e42868ea50e4c499119dae005b52afbe44) by Ramiro Gómez).

### Removed

- removed unused deps ([b6d0329](https://github.com/yaph/d3-geomap/commit/b6d03293adb9e403c5af8efb6f3cba8d7971f772) by Ramiro Gómez).
- Remove possibly existing annotation, when map is updated. ([cf6bf20](https://github.com/yaph/d3-geomap/commit/cf6bf206443bd02835bc92890681454156e794e9) by Ramiro Gómez).
- removed useless transform attribute ([3f7c6e3](https://github.com/yaph/d3-geomap/commit/3f7c6e3b0a28544bf0aafac86551a536d84ce0cb) by Ramiro Gómez).

## [0.1.0](https://github.com/yaph/d3-geomap/releases/tag/0.1.0) - 2015-02-06

<small>[Compare with first commit](https://github.com/yaph/d3-geomap/compare/5d2671410f715917e20f08e261181553bb271cfa...0.1.0)</small>

### Added

- added topo-clean make task added clean and bundle gulp tasks dependency updates ([6f246a0](https://github.com/yaph/d3-geomap/commit/6f246a02326b825c61aa35f3e4153125fa6ce803) by Ramiro Gómez).
- added full stop ([d90169c](https://github.com/yaph/d3-geomap/commit/d90169ca19fb5def0152bf3bc38e2998ee29f8c0) by Ramiro Gómez).
- added support for map rotation ([587729d](https://github.com/yaph/d3-geomap/commit/587729dbb11ec0a8619e5c586b5d13f2541cff2f) by Ramiro Gómez).
- added support for setting a maximum zoom via zoomMax ([c95c905](https://github.com/yaph/d3-geomap/commit/c95c90581dbe9c808f6d4e3aedad141c97680306) by Ramiro Gómez).
- added optional callback to draw in choropleth ([b90c6cb](https://github.com/yaph/d3-geomap/commit/b90c6cb8d626cc12f3733cd9082db3fff6633bf8) by Ramiro Gómez).
- added topojson for "all" countries admin regions ([7bcf198](https://github.com/yaph/d3-geomap/commit/7bcf198e684381b4e1fb1d7400f881b5e714fd7c) by Ramiro Gómez).
- added indonesia and spain ([3967fb3](https://github.com/yaph/d3-geomap/commit/3967fb340ef0a38d5251b2405f1930ebaf537b2b) by Ramiro Gómez).
- added example US states choropleth fix bug with zero values, check for null so 0.00 gets a color ([cd26f10](https://github.com/yaph/d3-geomap/commit/cd26f105b1069c386e6974b59f4dc72046168c40) by Ramiro Gómez).
- added plain US states example enable setting topojson units identifier via accessor ([0d69a04](https://github.com/yaph/d3-geomap/commit/0d69a0457b7176135c89b5039a61db00472d82bc) by Ramiro Gómez).
- added todo ([6dc8c28](https://github.com/yaph/d3-geomap/commit/6dc8c2877b590d793e1b1a852deb2f8dd55d9fcc) by Ramiro Gómez).
- added reference ([16efbc3](https://github.com/yaph/d3-geomap/commit/16efbc3e13c7cb592aab60705c1b0d6316ba4c3f) by Ramiro Gómez).
- added plain example to readme and installation from source instructions ([030c582](https://github.com/yaph/d3-geomap/commit/030c582e7462dadeb8b2fa3b42b4cc4d9f5be3e5) by Ramiro Gómez).
- added vendor task ([9183a70](https://github.com/yaph/d3-geomap/commit/9183a703f14fd72d7050ad3793bc9d8916196320) by Ramiro Gómez).
- added colors accessor and more color options ([09a9498](https://github.com/yaph/d3-geomap/commit/09a949850b20338152f078a89decb98d5a3bf950) by Ramiro Gómez).
- added utils.coffee ([fc10c19](https://github.com/yaph/d3-geomap/commit/fc10c19d5df5124e5488b4271e8151bee5ae94f8) by Ramiro Gómez).
- added heading and data source ([fa22f48](https://github.com/yaph/d3-geomap/commit/fa22f488931fed1c9c712c820b288f09d992b754) by Ramiro Gómez).
- added columns function that returns a sorted list of culumn headings except empty and iso3 ([c72527e](https://github.com/yaph/d3-geomap/commit/c72527e2b883ada24cf4512cac9de18f437fb4b3) by Ramiro Gómez).

### Fixed

- fix #21 by using shapefiles without lakes ([3c53aaf](https://github.com/yaph/d3-geomap/commit/3c53aaf72185fc61e966a46f5945bf5a758b5d63) by Ramiro Gómez).
- fix issue with projections not supporting rotation use d3.scale.threshold if domain array has more than 2 items ([e80d1d8](https://github.com/yaph/d3-geomap/commit/e80d1d849a105599fd9dc3d21a9bb84b68dff4fa) by Ramiro Gómez).
- fix #18: zoom all g.zoom elements within map svg, updated vendor packages ([f91724f](https://github.com/yaph/d3-geomap/commit/f91724f998c654f9b3b35018feaec9254297c06a) by Ramiro Gómez).
- fix #13: instead of callback for draw added postUpdate hook for executing code at the end pf update ([e0ee75b](https://github.com/yaph/d3-geomap/commit/e0ee75bb034a0dc1ef61fe4790a8019b87fa3f4b) by Ramiro Gómez).
- fix #12: replace naturalearthdata su_a3 ids with corresponding iso3 ids ([0b9df80](https://github.com/yaph/d3-geomap/commit/0b9df8051d238d9fe481e02221663cc92d9219bd) by Ramiro Gómez).
- Fix #9: added support for setting domain ([26e33d6](https://github.com/yaph/d3-geomap/commit/26e33d6d8d9334535b5bc522d2337c0778c47fbb) by Ramiro Gómez).
- fix #7: add thousands separator to default format, some legend adjustments ([9a86928](https://github.com/yaph/d3-geomap/commit/9a86928d59d0ab975d05fe3c794015dc2118748a) by Ramiro Gómez).
- fix #11: bigger legend with white translucent background, no more magic variables in drawLegend method ([18d3b1d](https://github.com/yaph/d3-geomap/commit/18d3b1d2e8e732b922b28997608d6234d6893310) by Ramiro Gómez).
- fix issue #10: set min or max to val if they are still null ([32be121](https://github.com/yaph/d3-geomap/commit/32be121ec86b8fb34db86f1fd1e038a04f832338) by Ramiro Gómez).
- fix doc section ([031611f](https://github.com/yaph/d3-geomap/commit/031611f62e092accc5d43a7272031f35ea15ec51) by Ramiro Gómez).
- fixed reference and make scale actually scale ([3de1435](https://github.com/yaph/d3-geomap/commit/3de14359a84c80e7d2cbe3b40da30756a9ed4603) by Ramiro Gómez).
- fix #2: use more generic units instead of countries ([f0be171](https://github.com/yaph/d3-geomap/commit/f0be171e5a1a8c9ad5c6fffa092b91bc444fc99e) by Ramiro Gómez).
- fix #4 moved legend to lower left corner of map ([e00c9ca](https://github.com/yaph/d3-geomap/commit/e00c9ca044c8cbe0c73ac4be12c1b81811369d5c) by Ramiro Gómez).

### Removed

- removed log ([eabf3ac](https://github.com/yaph/d3-geomap/commit/eabf3acf0928c99be2b6255f91255d3ceed92cb2) by Ramiro Gómez).
- removed npmignore so gitignore is used ([5fa44c5](https://github.com/yaph/d3-geomap/commit/5fa44c5a674c6ef9da609042c84ae27bfe6e940f) by Ramiro Gómez).
- removed dist dir ([03c71f6](https://github.com/yaph/d3-geomap/commit/03c71f641bceda09f71a6ad58d9735b27d733c0e) by Ramiro Gómez).
- removed boundary path and unused styles ([eadb7df](https://github.com/yaph/d3-geomap/commit/eadb7dfa0c6a37b5b6c20a9caecc31ec62d36ca6) by Ramiro Gómez).
- removed white from colors ([a659ecb](https://github.com/yaph/d3-geomap/commit/a659ecb3f1234c2f16e47e8bd6d3ab8f7fa09bb8) by Ramiro Gómez).

