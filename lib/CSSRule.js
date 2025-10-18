//.CommonJS
var CSSOM = {};
///CommonJS

/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-cssrule-interface
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSRule
 */
CSSOM.CSSRule = function CSSRule() {
  this.__parentRule = null;
  this.__parentStyleSheet = null;
};

Object.defineProperties(CSSOM.CSSRule.prototype, {

  constructor: { value: CSSOM.CSSRule },

  parentRule: {
    get: function() {
      return this.__parentRule
    }
  },

  parentStyleSheet: {
    get: function() {
      return this.__parentStyleSheet
    }
  },
  
  UNKNOWN_RULE: { value: 0, enumerable: true }, // obsolet
  STYLE_RULE: { value: 1, enumerable: true },
  CHARSET_RULE: { value: 2, enumerable: true }, // obsolet
  IMPORT_RULE: { value: 3, enumerable: true },
  MEDIA_RULE: { value: 4, enumerable: true },
  FONT_FACE_RULE: { value: 5, enumerable: true },
  PAGE_RULE: { value: 6, enumerable: true },
  KEYFRAMES_RULE: { value: 7, enumerable: true },
  KEYFRAME_RULE: { value: 8, enumerable: true },
  MARGIN_RULE: { value: 9, enumerable: true },
  NAMESPACE_RULE: { value: 10, enumerable: true },
  COUNTER_STYLE_RULE: { value: 11, enumerable: true },
  SUPPORTS_RULE: { value: 12, enumerable: true },
  DOCUMENT_RULE: { value: 13, enumerable: true },
  FONT_FEATURE_VALUES_RULE: { value: 14, enumerable: true },
  VIEWPORT_RULE: { value: 15, enumerable: true },
  REGION_STYLE_RULE: { value: 16, enumerable: true },
  CONTAINER_RULE: { value: 17, enumerable: true },
  LAYER_BLOCK_RULE: { value: 18, enumerable: true },
  STARTING_STYLE_RULE: { value: 1002, enumerable: true },
})

//.CommonJS
exports.CSSRule = CSSOM.CSSRule;
///CommonJS
