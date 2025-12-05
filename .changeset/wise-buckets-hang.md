---
"@acemir/cssom": patch
---

fix: improve CSSStyleSheet MediaList and parser
- CSSStyleSheet replace and replaceSync mutates cssText instead of reasign
- CSSStyleSheet.removeRule index defaults to 0
- set MediaList.mediaText to null empties the the list
- MediaList.toString returns the same as MediaList.mediaText
- CSSOM.parse initializes styleSheet.media.mediaText with the content of ownerNode media attribute when available
