//.CommonJS
var CSSOM = {
	CSSRule: require("./CSSRule").CSSRule,
  CSSRuleList: require("./CSSRuleList").CSSRuleList,
	CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule,
	CSSConditionRule: require("./CSSConditionRule").CSSConditionRule,
};
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/css-contain-3/
 * @see https://www.w3.org/TR/css-contain-3/
 */
CSSOM.CSSContainerRule = function CSSContainerRule() {
	CSSOM.CSSConditionRule.call(this);
};

CSSOM.CSSContainerRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSContainerRule.prototype.constructor = CSSOM.CSSContainerRule;
CSSOM.CSSContainerRule.prototype.type = 17;

Object.defineProperties(CSSOM.CSSContainerRule.prototype, {
  "cssText": {
    get: function() {
      var cssTexts = [];
      for (var i=0, length=this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
      }
      return "@container " + this.conditionText + " {" + (cssTexts.length ? "\n  " + cssTexts.join("\n  ") : "") + "\n}";
    },
    configurable: true,
    enumerable: true
  },
  "containerName": {
      get: function() {
        var parts = this.conditionText.trim().split(/\s+/);
        if (parts.length > 1 && parts[0] !== '(' && !parts[0].startsWith('(')) {
          return parts[0];
        }
        return "";
      }
    },
  "containerQuery": {
      get: function() {
        var parts = this.conditionText.trim().split(/\s+/);
        if (parts.length > 1 && parts[0] !== '(' && !parts[0].startsWith('(')) {
          return parts.slice(1).join(' ');
        }
        return this.conditionText;
      }
    },
});


//.CommonJS
exports.CSSContainerRule = CSSOM.CSSContainerRule;
///CommonJS
