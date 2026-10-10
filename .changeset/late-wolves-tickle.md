---
"@acemir/cssom": minor
---

Add an explicit CSSStyleDeclaration integration API.

New APIs:
- `setup({ CSSStyleDeclaration })`
- `setCSSStyleDeclaration(CSSStyleDeclaration)`
- `getCSSStyleDeclaration()`
- `resetCSSStyleDeclaration()`

Rule style declarations created during parsing/cloning now use the configured constructor consistently, avoiding module load-order issues when integrating with custom CSSStyleDeclaration implementations.
