---
"@acemir/cssom": patch
---

feat: improve `CSSImportRule` implementation
- set `CSSImportRule.styleSheet` to unconstructed
-  avoid insert `@import` rules into a constructed stylesheet
