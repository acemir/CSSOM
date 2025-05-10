//.CommonJS
var CSSOM = {
  CSSRule: require("./CSSRule").CSSRule,
};
///CommonJS

/**
 * @constructor
 * @see https://drafts.csswg.org/css-nesting-1/
 */
CSSOM.CSSNestedDeclarations = function CSSNestedDeclarations() {
  CSSOM.CSSRule.call(this);
  this.style = new CSSOM.CSSStyleDeclaration();
  this.style.parentRule = this;
};

CSSOM.CSSNestedDeclarations.prototype = new CSSOM.CSSRule();
CSSOM.CSSNestedDeclarations.prototype.constructor = CSSOM.CSSNestedDeclarations;
CSSOM.CSSNestedDeclarations.prototype.type = 0;

Object.defineProperty(CSSOM.CSSNestedDeclarations.prototype, "cssText", {
  get: function () {
    return this.style.cssText;
  },
  configurable: true,
  enumerable: true,
});

//.CommonJS
exports.CSSNestedDeclarations = CSSOM.CSSNestedDeclarations;
///CommonJS