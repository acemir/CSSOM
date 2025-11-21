//.CommonJS
var CSSOM = {
	CSSRule: require("./CSSRule").CSSRule,
	CSSRuleList: require("./CSSRuleList").CSSRuleList,
	CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule
};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/shadow-dom/#host-at-rule
 */
CSSOM.CSSStartingStyleRule = function CSSStartingStyleRule() {
	CSSOM.CSSGroupingRule.call(this);
};

CSSOM.CSSStartingStyleRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSStartingStyleRule.prototype.constructor = CSSOM.CSSStartingStyleRule;
CSSOM.CSSStartingStyleRule.prototype.type = 1002;
//FIXME
//CSSOM.CSSStartingStyleRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSStartingStyleRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

Object.defineProperty(CSSOM.CSSStartingStyleRule.prototype, "cssText", {
	get: function() {
		var values = "";
		var valuesArr = [" {"];
		if (this.cssRules.length) {
			valuesArr.push(this.cssRules.reduce(function(acc, rule){ 
			if (rule.cssText !== "") {
				acc.push(rule.cssText);
			}
			return acc;
			}, []).join("\n  "));
		}
		values = valuesArr.join("\n  ") + "\n}";
		return "@starting-style" + values;
	}
});


//.CommonJS
exports.CSSStartingStyleRule = CSSOM.CSSStartingStyleRule;
///CommonJS
