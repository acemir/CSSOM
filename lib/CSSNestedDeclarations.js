//.CommonJS
var CSSOM = {
  CSSRule: require("./CSSRule").CSSRule,
  CSSStyleProperties: require('./CSSStyleProperties').CSSStyleProperties
};
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/css-nesting-1/
 */
CSSOM.CSSNestedDeclarations = function CSSNestedDeclarations() {
  CSSOM.CSSRule.call(this);
  const globalObject = this.__parentStyleSheet?.__globalObject;
  this.__style = new CSSOM.CSSStyleProperties(globalObject, this);
};

CSSOM.CSSNestedDeclarations.prototype = new CSSOM.CSSRule();
CSSOM.CSSNestedDeclarations.prototype.constructor = CSSOM.CSSNestedDeclarations;
CSSOM.CSSNestedDeclarations.prototype.type = 0;

Object.defineProperty(CSSOM.CSSNestedDeclarations.prototype, "style", {
	get: function() {
		return this.__style;	
	},
	set: function(value) {
		if (typeof value === "string") {
			this.__style.cssText = value;
		} else {
			this.__style = value;
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