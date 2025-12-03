---
"@acemir/cssom": patch
---

Fix TypeError when parsing @media after nested selectors inside @layer

When parsing CSS with nested selectors (&) followed by @media rules inside an @layer block, the parser would crash with "Cannot read properties of null (reading 'constructor')" because nestedSelectorRule.parentRule can be null when the parent context is a CSSLayerBlockRule rather than a CSSStyleRule.
