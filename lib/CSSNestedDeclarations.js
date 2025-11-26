//.CommonJS
var CSSOM = require('./CSSOM.js');
CSSOM.CSSRule = require("./CSSRule").CSSRule;
CSSOM.CSSStyleProperties = require('./CSSStyleProperties').CSSStyleProperties;
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/css-nesting-1/
 */
CSSOM.CSSNestedDeclarations = function CSSNestedDeclarations() {
  CSSOM.CSSRule.call(this);
  let globalObject;
  if (this.parentStyleSheet && this.parentStyleSheet.__globalObject) {
    globalObject = this.parentStyleSheet.__globalObject;
  } else if (this.__parentStyleSheet && this.__parentStyleSheet.__globalObject) {
    globalObject = this.__parentStyleSheet.__globalObject;
  } else if (this.__globalObject) {
    globalObject = this.__globalObject;
  }
  this.__style = new CSSOM.CSSStyleProperties(globalObject, this);
  this.__list = [];
};

CSSOM.CSSNestedDeclarations.prototype = new CSSOM.CSSRule();
CSSOM.CSSNestedDeclarations.prototype.constructor = CSSOM.CSSNestedDeclarations;
CSSOM.CSSNestedDeclarations.prototype.type = 0;

Object.defineProperty(CSSOM.CSSNestedDeclarations.prototype, "style", {
  get: function() {
    for (let i = 0; i < this.__list.length; i++) {
      delete this.__style[i];
    }
    this.__list = [];
    for (let i = 0; i < this.__style.length; i++) {
      const property = this.__style.item(i);
      this.__list[i] = property;
      this.__style[i] = property;
    }
    return this.__style;
  },
  set: function(value) {
    if (typeof value === "string") {
      this.__style.cssText = value;
    }
  }
});

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