# @acemir/cssom

## 0.9.30

### Patch Changes

- [#85](https://github.com/acemir/CSSOM/pull/85) [`25f9726`](https://github.com/acemir/CSSOM/commit/25f9726de89c36203d98e9ea8214b933508f0ff9) Thanks [@acemir](https://github.com/acemir)! - feat: sync styleSheet.title with ownerNode.title
  - set selectorText, style and media configurable
  - improve docs and test utils

- [#81](https://github.com/acemir/CSSOM/pull/81) [`4e349c3`](https://github.com/acemir/CSSOM/commit/4e349c3ec9a7419019ba76760718131d9366b2c5) Thanks [@acemir](https://github.com/acemir)! - fix: preserve context for sibling nested selectors

- [#84](https://github.com/acemir/CSSOM/pull/84) [`84ac918`](https://github.com/acemir/CSSOM/commit/84ac91828561dd4b37e6bf685fc5caa9c809851b) Thanks [@acemir](https://github.com/acemir)! - feat: implement `CSSPropertyRule`

- [#83](https://github.com/acemir/CSSOM/pull/83) [`623e136`](https://github.com/acemir/CSSOM/commit/623e136c3abe400b360919fbb11bfd3608d429ef) Thanks [@acemir](https://github.com/acemir)! - feat: improve `CSSImportRule` implementation
  - set `CSSImportRule.styleSheet` to unconstructed
  - avoid insert `@import` rules into a constructed stylesheet

## 0.9.29

### Patch Changes

- [#77](https://github.com/acemir/CSSOM/pull/77) [`f1e78c0`](https://github.com/acemir/CSSOM/commit/f1e78c07ba68f32590795f5ffe330ddad3658d1c) Thanks [@acemir](https://github.com/acemir)! - fix: parsing of deeply nested at-rule combinations

## 0.9.28

### Patch Changes

- [`3c2b77f`](https://github.com/acemir/CSSOM/commit/3c2b77f1309fe8613db10150b69bee6d56d2794e) Thanks [@acemir](https://github.com/acemir)! - fix: importRule stylesheet assign from globalObject

## 0.9.27

### Patch Changes

- [#72](https://github.com/acemir/CSSOM/pull/72) [`f27c829`](https://github.com/acemir/CSSOM/commit/f27c829cecbf7096fdd5544b0fc4e07d52aedb46) Thanks [@acemir](https://github.com/acemir)! - feat: enhance CSSOM setup method to create instance with globalObject support

## 0.9.26

### Patch Changes

- [#70](https://github.com/acemir/CSSOM/pull/70) [`e597dfe`](https://github.com/acemir/CSSOM/commit/e597dfed00a1cad14ad938268f1e0627b2eb39d9) Thanks [@acemir](https://github.com/acemir)! - fix: improve CSSStyleSheet MediaList and parser
  - CSSStyleSheet replace and replaceSync mutates cssText instead of reasign
  - CSSStyleSheet.removeRule index defaults to 0
  - set MediaList.mediaText to null empties the the list
  - MediaList.toString returns the same as MediaList.mediaText
  - CSSOM.parse initializes styleSheet.media.mediaText with the content of ownerNode media attribute when available

## 0.9.25

### Patch Changes

- [#66](https://github.com/acemir/CSSOM/pull/66) [`e369d14`](https://github.com/acemir/CSSOM/commit/e369d14053b827fc19a7f1d3b5a1da39455e307d) Thanks [@Naycon](https://github.com/Naycon)! - Fix TypeError when parsing @media after nested selectors inside @layer

  When parsing CSS with nested selectors (&) followed by @media rules inside an @layer block, the parser would crash with "Cannot read properties of null (reading 'constructor')" because nestedSelectorRule.parentRule can be null when the parent context is a CSSLayerBlockRule rather than a CSSStyleRule.

- [#69](https://github.com/acemir/CSSOM/pull/69) [`52b93c7`](https://github.com/acemir/CSSOM/commit/52b93c7e9bb1d21ebe83c3c044dd4f08da69f131) Thanks [@acemir](https://github.com/acemir)! - fix: auto-closing statement rules

- [#68](https://github.com/acemir/CSSOM/pull/68) [`907a0c2`](https://github.com/acemir/CSSOM/commit/907a0c2d6c6fff0471dbcb751074fe52c6d6b88d) Thanks [@acemir](https://github.com/acemir)! - feat: rules interfaces and parse improvements
  - Expose CSSOM.setup method for globalObject configuration
  - Add StyleSheet missing interface properties
  - Add CSSStyleSheet constructor options and missing interface properties
  - Set cssRules readonly on CSSStylesheet and CSSGroupingRules
  - Fix CSSRule.cssText interface implementation
  - Improve pseudo-class with selectors list validations
  - Imrpove auto-close for all unclosed nested structures
  - Handle CSSLayerStatementRule inside CSSLayerBlockRule and other grouping rules
  - Handle CSSFontFaceRule, CSSKeyframeRule and CSSPageRule nesting edge cases
  - Imrpove code consistency on rules type and prototype assign

## 0.9.24

### Patch Changes

- [#60](https://github.com/acemir/CSSOM/pull/60) [`dc858f3`](https://github.com/acemir/CSSOM/commit/dc858f350f48ffc852ae00527ffd222e21db2ab8) Thanks [@acemir](https://github.com/acemir)! - fix: ending nested rules processing and unclosed sheet edge cases

- [#62](https://github.com/acemir/CSSOM/pull/62) [`e65434c`](https://github.com/acemir/CSSOM/commit/e65434caa3f44627020d0a35be42fefce6bf8c9b) Thanks [@acemir](https://github.com/acemir)! - fix: serialization with empty nested declarations

- [#63](https://github.com/acemir/CSSOM/pull/63) [`f334c70`](https://github.com/acemir/CSSOM/commit/f334c70b3f6ba825b8a4144e994dc43d671ccd9c) Thanks [@acemir](https://github.com/acemir)! - fix: parser improvements

  - Fix CSSScopeRule allows CSSNestedDeclarations
  - Fix mediaText setter with empty value
  - Improve performance and security on selectors validation
  - Handle escape sequences before processing special characters

- [#59](https://github.com/acemir/CSSOM/pull/59) [`fccf639`](https://github.com/acemir/CSSOM/commit/fccf6393be6cad177b499608a1783d1eac7cc11f) Thanks [@Xiphoseer](https://github.com/Xiphoseer)! - feat: implement `CSSStyleSheet`: `replaceSync`, `replace`

## 0.9.23

### Patch Changes

- [#56](https://github.com/acemir/CSSOM/pull/56) [`555f3cb`](https://github.com/acemir/CSSOM/commit/555f3cbcd5014af5d86c0bbd98ea305fae51f0a2) Thanks [@acemir](https://github.com/acemir)! - fix: prevent adding semicolon to token if it already ends with one

## 0.9.22

### Patch Changes

- [#54](https://github.com/acemir/CSSOM/pull/54) [`ddae783`](https://github.com/acemir/CSSOM/commit/ddae7839434edc3090f1667fb7b0e214eedf0adb) Thanks [@acemir](https://github.com/acemir)! - fix: added parseError isNested argument

## 0.9.21

### Patch Changes

- [#52](https://github.com/acemir/CSSOM/pull/52) [`e912362`](https://github.com/acemir/CSSOM/commit/e912362e57ba8718d5117c3e7e358decc333ae95) Thanks [@acemir](https://github.com/acemir)! - feat: support CSSPageRule and implementation improvements

## 0.9.20

### Patch Changes

- [#51](https://github.com/acemir/CSSOM/pull/51) [`94945d2`](https://github.com/acemir/CSSOM/commit/94945d2a4ff61099705af832f8b645007bbb9c8f) Thanks [@acemir](https://github.com/acemir)! - feat: support legacy CSSStyleSheet methods and improve nested selectors validation

- [#48](https://github.com/acemir/CSSOM/pull/48) [`2548929`](https://github.com/acemir/CSSOM/commit/25489294ef04eddbaf0eb0f4e8eeb6678a5dceeb) Thanks [@acemir](https://github.com/acemir)! - feat: support CSSScopeRule

- [#47](https://github.com/acemir/CSSOM/pull/47) [`e2aff4e`](https://github.com/acemir/CSSOM/commit/e2aff4eac17f8ef0e5fb28253c49933a28481224) Thanks [@acemir](https://github.com/acemir)! - fix: forward rule validation

- [#50](https://github.com/acemir/CSSOM/pull/50) [`7a127e7`](https://github.com/acemir/CSSOM/commit/7a127e79a440f7cb36c2a4ce1439029ac902f077) Thanks [@acemir](https://github.com/acemir)! - feat: support CSSRuleList and improve selectors validation

## 0.9.19

### Patch Changes

- [#45](https://github.com/acemir/CSSOM/pull/45) [`4092150`](https://github.com/acemir/CSSOM/commit/4092150118de5a94faaa06042281652faa0d56bf) Thanks [@acemir](https://github.com/acemir)! - fix: revert cssrule type constant as properties

## 0.9.18

### Patch Changes

- [#43](https://github.com/acemir/CSSOM/pull/43) [`374d9a5`](https://github.com/acemir/CSSOM/commit/374d9a542800af7bab64b542a938501ed3e26a10) Thanks [@acemir](https://github.com/acemir)! - feat: improve parse options
  - add opts to CSSOM.parse
  - improve insertRule and deleteRule edge cases
  - adjust `@font-face` cannot be nested
  - throw correct error on insertRule invalid index
  - adjust `@import` canonical text and layer validation
  - adjust selectorText values formatting

## 0.9.17

### Patch Changes

- [#41](https://github.com/acemir/CSSOM/pull/41) [`a48b41f`](https://github.com/acemir/CSSOM/commit/a48b41f586ac3b63bbdd5e35b140ca1e9c78f4d3) Thanks [@acemir](https://github.com/acemir)! - feat: sync common rules interfaces

  - CSSRule `parentRule` and `parentStyleSheet`, are now prototype getters to be readonly according to the CSSRule interface.
  - CSSStyleRule `selectorText` and `style` are now prototype getter and setter according to the CSSStyleRule interface.
  - Added a try catch to override local CSSStyleDeclaration with the one from cssstyle when needed
  - Implemented methods and indexed getters for CSSKeyframesRule
  - Implementd errorUtils for a more organized way to handle errors

## 0.9.16

### Patch Changes

- [#39](https://github.com/acemir/CSSOM/pull/39) [`c3c8d12`](https://github.com/acemir/CSSOM/commit/c3c8d12f50483b1ea3fcf9d2aace9e9984b25487) Thanks [@acemir](https://github.com/acemir)! - fix: workaround for jsdom exceptions

## 0.9.15

### Patch Changes

- [#37](https://github.com/acemir/CSSOM/pull/37) [`cb267e6`](https://github.com/acemir/CSSOM/commit/cb267e6ef2a08712e221ef1b155534923cb42ac7) Thanks [@acemir](https://github.com/acemir)! - fix: adjust DOMException errors names

## 0.9.14

### Patch Changes

- [#35](https://github.com/acemir/CSSOM/pull/35) [`e278d07`](https://github.com/acemir/CSSOM/commit/e278d076e6b62fdaab43f64a5b59ce46d11c84a5) Thanks [@acemir](https://github.com/acemir)! - fix: attribute selector support

## 0.9.13

### Patch Changes

- [`9703341`](https://github.com/acemir/CSSOM/commit/9703341d31b610b40128956707c4f0aa24b7d9eb) Thanks [@acemir](https://github.com/acemir)! - fix: standardizes the cssText getters

## 0.9.12

### Patch Changes

- [#31](https://github.com/acemir/CSSOM/pull/31) [`5a863c0`](https://github.com/acemir/CSSOM/commit/5a863c0300297048376c7254b037391e6bdb564e) Thanks [@acemir](https://github.com/acemir)! - fix: support namespace with filled unquoted url

## 0.9.11

### Patch Changes

- [#29](https://github.com/acemir/CSSOM/pull/29) [`be06274`](https://github.com/acemir/CSSOM/commit/be06274b169eb31bec78714a77126f9769e2dde2) Thanks [@acemir](https://github.com/acemir)! - fix: improve valid `@layer` name logic

- [#30](https://github.com/acemir/CSSOM/pull/30) [`cd35009`](https://github.com/acemir/CSSOM/commit/cd350095e52e04300a62e6f66a1dac35acb0ce22) Thanks [@acemir](https://github.com/acemir)! - feat: added support for CSSNamespaceRule

- [#27](https://github.com/acemir/CSSOM/pull/27) [`76a68b9`](https://github.com/acemir/CSSOM/commit/76a68b95efda99a9f62fe1d254e68b5a58f0732a) Thanks [@acemir](https://github.com/acemir)! - chore: improve stylesheet insert and delete rule

## 0.9.10

### Patch Changes

- [#25](https://github.com/acemir/CSSOM/pull/25) [`8ae26ad`](https://github.com/acemir/CSSOM/commit/8ae26adf4edc4a304d9bf12fd26b17c0cd5961c4) Thanks [@acemir](https://github.com/acemir)! - chore: better parseError messages

## 0.9.9

### Patch Changes

- [#23](https://github.com/acemir/CSSOM/pull/23) [`dd8f3c7`](https://github.com/acemir/CSSOM/commit/dd8f3c76e9408f9469d2cb3f0628589d5a56def8) Thanks [@acemir](https://github.com/acemir)! - fix: handle newlines in the middle of selectors

## 0.9.8

### Patch Changes

- [#21](https://github.com/acemir/CSSOM/pull/21) [`620ebfa`](https://github.com/acemir/CSSOM/commit/620ebfa74ed1124d79cd97f1cd91b2cc51f630ac) Thanks [@acemir](https://github.com/acemir)! - fix: improve CSSCounterStyleRule draft processing

## 0.9.7

### Patch Changes

- [#19](https://github.com/acemir/CSSOM/pull/19) [`ee897f0`](https://github.com/acemir/CSSOM/commit/ee897f0f459da7f482b2af7a3bf9cea56ab40eab) Thanks [@acemir](https://github.com/acemir)! - feat: draft support for CSSCounterStyleRule

## 0.9.6

### Patch Changes

- [#16](https://github.com/acemir/CSSOM/pull/16) [`cf9dc7d`](https://github.com/acemir/CSSOM/commit/cf9dc7db8adfeda6224ddb8ec02a2516d3b714d1) Thanks [@acemir](https://github.com/acemir)! - feat: improves complex selectors validation

## 0.9.5

### Patch Changes

- [#14](https://github.com/acemir/CSSOM/pull/14) [`2bde3f5`](https://github.com/acemir/CSSOM/commit/2bde3f5988aa4e16b7f9a41ae75dbe8e26bc0311) Thanks [@acemir](https://github.com/acemir)! - fix: injectable errorHandler

## 0.9.4

### Patch Changes

- [#12](https://github.com/acemir/CSSOM/pull/12) [`4f3abd2`](https://github.com/acemir/CSSOM/commit/4f3abd229e85707efb7eebc8eb98f92d899c5e10) Thanks [@acemir](https://github.com/acemir)! - feat: improve handling of complex selectors

## 0.9.3

### Patch Changes

- [`d2a81ae`](https://github.com/acemir/CSSOM/commit/d2a81ae9db8f5b98a4c911c8fdcec270b276561a) Thanks [@acemir](https://github.com/acemir)! - feat: support attribute selector case-insensitive flag

## 0.9.2

### Patch Changes

- [#8](https://github.com/acemir/CSSOM/pull/8) [`5ea9d4f`](https://github.com/acemir/CSSOM/commit/5ea9d4f2ac761079a6c94fce85e73d2efcff85c8) Thanks [@acemir](https://github.com/acemir)! - feat: parser improvements on selectors, declaration values and error handling

## 0.9.1

### Patch Changes

- [#7](https://github.com/acemir/CSSOM/pull/7) [`6d14f90`](https://github.com/acemir/CSSOM/commit/6d14f904a4a7038a622230460341a47676d6e045) Thanks [@acemir](https://github.com/acemir)! - feat: add layer() and supports() to @import rule

- [#6](https://github.com/acemir/CSSOM/pull/6) [`a6526ad`](https://github.com/acemir/CSSOM/commit/a6526adcca382a170e35cfeef979a710ac579ec2) Thanks [@acemir](https://github.com/acemir)! - feat: support CSSLayerStatementRule, adjust CSSLayerBlockRule and improves at-rule validation

- [#4](https://github.com/acemir/CSSOM/pull/4) [`46a61ee`](https://github.com/acemir/CSSOM/commit/46a61ee43242b69ace0cce9bf252737b12c2b56e) Thanks [@anntseng](https://github.com/anntseng)! - fix: check the priority value of the existing property

- [#3](https://github.com/acemir/CSSOM/pull/3) [`243e8cd`](https://github.com/acemir/CSSOM/commit/243e8cd38cdb5c3f46cb83a87815fbeeeac22994) Thanks [@DiogoDoreto](https://github.com/DiogoDoreto)! - `index` parameter of `CSSStyleSheet.insertRule` is now optional

## 0.9.0

### Changes

- [#2](https://github.com/acemir/CSSOM/pull/2) [`64e49ef`](https://github.com/acemir/CSSOM/commit/64e49eff75d84d26821c0f4ce69d4f6f398037c8) - feat: support for nested selectors, nested declarations and at-rule validations

## 0.8.0

### Minor Changes

- [#5](https://github.com/rrweb-io/CSSOM/pull/5) [`9f7e335`](https://github.com/rrweb-io/CSSOM/commit/9f7e335cfcbfa4c44b7088fd97d8e6677fe78c45) Thanks [@simpleman383](https://github.com/simpleman383)! - Added support for @layer CSS rule

## 0.7.1

### Patch Changes

- [#4](https://github.com/rrweb-io/CSSOM/pull/4) [`6e61048`](https://github.com/rrweb-io/CSSOM/commit/6e61048dfdcb09f67eefeaeff2ce0d9af4032a74) Thanks [@jantimon](https://github.com/jantimon)! - fix parsing errors for nested starting-style rules

## 0.7.0

### Minor Changes

- [#1](https://github.com/rrweb-io/CSSOM/pull/1) [`d90a5d3`](https://github.com/rrweb-io/CSSOM/commit/d90a5d343540b3aa05425534d9f208e1686a37f3) Thanks [@jantimon](https://github.com/jantimon)! - add support for @starting-style

- [#2](https://github.com/rrweb-io/CSSOM/pull/2) [`3095bf8`](https://github.com/rrweb-io/CSSOM/commit/3095bf85093589607bb246afd1d6d51605785f9e) Thanks [@jantimon](https://github.com/jantimon)! - add support for @container
