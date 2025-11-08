//.CommonJS
var CSSOM = {
	CSSRule: require("./CSSRule").CSSRule,
	CSSStyleProperties: require('./CSSStyleProperties').CSSStyleProperties
};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframeRule
 */
CSSOM.CSSKeyframeRule = function CSSKeyframeRule() {
	CSSOM.CSSRule.call(this);
	const globalObject = this.__parentStyleSheet?.__globalObject;
	this.keyText = '';
	this.__style = new CSSOM.CSSStyleProperties(globalObject, this);
};

CSSOM.CSSKeyframeRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSKeyframeRule.prototype.constructor = CSSOM.CSSKeyframeRule;
CSSOM.CSSKeyframeRule.prototype.type = 8;
//FIXME
//CSSOM.CSSKeyframeRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSKeyframeRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "style", {
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

// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSKeyframeRule.cpp
Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "cssText", {
  get: function() {
    return this.keyText + " {" + (this.style.cssText ? " " + this.style.cssText : "") + " }";
  }
});


//.CommonJS
exports.CSSKeyframeRule = CSSOM.CSSKeyframeRule;
///CommonJS
