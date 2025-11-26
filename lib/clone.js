//.CommonJS
var CSSOM = require('./CSSOM.js');
CSSOM.CSSStyleSheet = require("./CSSStyleSheet").CSSStyleSheet;
CSSOM.CSSRule = require("./CSSRule").CSSRule;
CSSOM.CSSNestedDeclarations = require("./CSSNestedDeclarations").CSSNestedDeclarations;
CSSOM.CSSStyleRule = require("./CSSStyleRule").CSSStyleRule;
CSSOM.CSSGroupingRule = require("./CSSGroupingRule").CSSGroupingRule;
CSSOM.CSSConditionRule = require("./CSSConditionRule").CSSConditionRule;
CSSOM.CSSMediaRule = require("./CSSMediaRule").CSSMediaRule;
CSSOM.CSSContainerRule = require("./CSSContainerRule").CSSContainerRule;
CSSOM.CSSSupportsRule = require("./CSSSupportsRule").CSSSupportsRule;
CSSOM.CSSStyleProperties = require("./CSSStyleProperties").CSSStyleProperties;
CSSOM.CSSKeyframeRule = require('./CSSKeyframeRule').CSSKeyframeRule;
CSSOM.CSSKeyframesRule = require('./CSSKeyframesRule').CSSKeyframesRule;
CSSOM.CSSScopeRule = require('./CSSScopeRule').CSSScopeRule;
CSSOM.CSSLayerBlockRule = require('./CSSLayerBlockRule').CSSLayerBlockRule;
CSSOM.CSSLayerStatementRule = require('./CSSLayerStatementRule').CSSLayerStatementRule;
///CommonJS


/**
 * Produces a deep copy of stylesheet — the instance variables of stylesheet are copied recursively.
 * @param {CSSStyleSheet|CSSOM.CSSStyleSheet} stylesheet
 * @nosideeffects
 * @return {CSSOM.CSSStyleSheet}
 */
CSSOM.clone = function clone(stylesheet) {

	var cloned = new CSSOM.CSSStyleSheet();

	var rules = stylesheet.cssRules;
	if (!rules) {
		return cloned;
	}

	for (var i = 0, rulesLength = rules.length; i < rulesLength; i++) {
		var rule = rules[i];
		var ruleClone = cloned.cssRules[i] = new rule.constructor();

		var style = rule.style;
		if (style) {
			var globalObject = stylesheet?.ownerDocument?.defaultView;
			var styleClone = ruleClone.style = new CSSOM.CSSStyleProperties(globalObject, rule);
			for (var j = 0, styleLength = style.length; j < styleLength; j++) {
				var name = styleClone[j] = style[j];
				styleClone[name] = style[name];
				styleClone._importants[name] = style.getPropertyPriority(name);
			}
			styleClone.length = style.length;
		}

		if (rule.hasOwnProperty('keyText')) {
			ruleClone.keyText = rule.keyText;
		}

		if (rule.hasOwnProperty('selectorText')) {
			ruleClone.selectorText = rule.selectorText;
		}

		if (rule.hasOwnProperty('mediaText')) {
			ruleClone.mediaText = rule.mediaText;
		}

		if (rule.hasOwnProperty('supportsText')) {
			ruleClone.supports = rule.supports;
		}

		if (rule.hasOwnProperty('conditionText')) {
			ruleClone.conditionText = rule.conditionText;
		}

		if (rule.hasOwnProperty('layerName')) {
			ruleClone.layerName = rule.layerName;
		}

		if (rule.hasOwnProperty('href')) {
			ruleClone.href = rule.href;
		}

		if (rule.hasOwnProperty('name')) {
			ruleClone.name = rule.name;
		}

		if (rule.hasOwnProperty('nameList')) {
			ruleClone.nameList = rule.nameList;
		}

		if (rule.hasOwnProperty('cssRules')) {
			ruleClone.cssRules = clone(rule).cssRules;
		}
	}

	return cloned;

};

//.CommonJS
exports.clone = CSSOM.clone;
///CommonJS
