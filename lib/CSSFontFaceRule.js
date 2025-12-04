//.CommonJS
var CSSOM = require('./CSSOM.js');
CSSOM.CSSStyleProperties = require("./CSSStyleProperties").CSSStyleProperties;
CSSOM.CSSRule = require("./CSSRule").CSSRule;
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#css-font-face-rule
 */
CSSOM.CSSFontFaceRule = function CSSFontFaceRule() {
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

CSSOM.CSSFontFaceRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSFontFaceRule.prototype.constructor = CSSOM.CSSFontFaceRule;
CSSOM.CSSFontFaceRule.prototype.type = 5;
//FIXME
//CSSOM.CSSFontFaceRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSFontFaceRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

Object.defineProperty(CSSOM.CSSFontFaceRule.prototype, "style", {
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

// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSFontFaceRule.cpp
Object.defineProperty(CSSOM.CSSFontFaceRule.prototype, "cssText", {
  get: function() {
    return "@font-face {" + (this.style.cssText ? " " + this.style.cssText : "") + " }";
  }
});


//.CommonJS
exports.CSSFontFaceRule = CSSOM.CSSFontFaceRule;
///CommonJS
