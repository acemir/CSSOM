---
"@acemir/cssom": patch
---

feat: sync common rules interfaces

- CSSRule `parentRule` and `parentStyleSheet`, are now prototype getters to be readonly according to the CSSRule interface.
- CSSStyleRule `selectorText` and `style` are now prototype getter and setter according to the CSSStyleRule interface.
- Added a try catch to override local CSSStyleDeclaration with the one from cssstyle when needed
- Implemented methods and indexed getters for CSSKeyframesRule
- Implementd errorUtils for a more organized way to handle errors
