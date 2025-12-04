---
"@acemir/cssom": patch
---

feat: rules interfaces and parse improvements
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
