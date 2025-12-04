//.CommonJS
var CSSOM = {
	CSSRule: require("./CSSRule").CSSRule
};
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/css-counter-styles/#the-csscounterstylerule-interface
 */
CSSOM.CSSCounterStyleRule = function CSSCounterStyleRule() {
	CSSOM.CSSRule.call(this);
    this.name = "";
};

CSSOM.CSSCounterStyleRule.prototype = Object.create(CSSOM.CSSRule.prototype);
CSSOM.CSSCounterStyleRule.prototype.constructor = CSSOM.CSSCounterStyleRule;

Object.setPrototypeOf(CSSOM.CSSCounterStyleRule, CSSOM.CSSRule);

Object.defineProperty(CSSOM.CSSCounterStyleRule.prototype, "type", {
	value: 11,
	writable: false
});

//.CommonJS
exports.CSSCounterStyleRule = CSSOM.CSSCounterStyleRule;
///CommonJS
