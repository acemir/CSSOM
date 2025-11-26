//.CommonJS
var CSSOM = require('./CSSOM.js');
CSSOM.CSSRule = require("./CSSRule").CSSRule;
CSSOM.CSSStyleProperties = require('./CSSStyleProperties').CSSStyleProperties;
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframeRule
 */
CSSOM.CSSKeyframeRule = function CSSKeyframeRule() {
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
	this.keyText = '';
};

CSSOM.CSSKeyframeRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSKeyframeRule.prototype.constructor = CSSOM.CSSKeyframeRule;
CSSOM.CSSKeyframeRule.prototype.type = 8;
//FIXME
//CSSOM.CSSKeyframeRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSKeyframeRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "style", {
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

// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSKeyframeRule.cpp
Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "cssText", {
  get: function() {
    return this.keyText + " {" + (this.style.cssText ? " " + this.style.cssText : "") + " }";
  }
});


//.CommonJS
exports.CSSKeyframeRule = CSSOM.CSSKeyframeRule;
///CommonJS
