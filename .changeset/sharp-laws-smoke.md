---
"@acemir/cssom": patch
---

feat: improve parse options
- add opts to CSSOM.parse
- improve insertRule and deleteRule edge cases
- adjust `@font-face` cannot be nested 
- throw correct error on insertRule invalid index
- adjust `@import` canonical text and layer validation 
- adjust selectorText values formatting
