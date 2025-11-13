//.CommonJS
var CSSOM = require('./CSSOM.js');
CSSOM.CSSRule = require("./CSSRule").CSSRule;
CSSOM.CSSRuleList = require("./CSSRuleList").CSSRuleList;
CSSOM.CSSGroupingRule = require("./CSSGroupingRule").CSSGroupingRule;
CSSOM.CSSConditionRule = require("./CSSConditionRule").CSSConditionRule;
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/css-conditional-3/#the-csssupportsrule-interface
 */
CSSOM.CSSSupportsRule = function CSSSupportsRule() {
  CSSOM.CSSConditionRule.call(this);
};

CSSOM.CSSSupportsRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSSupportsRule.prototype.constructor = CSSOM.CSSSupportsRule;
CSSOM.CSSSupportsRule.prototype.type = 12;

Object.defineProperty(CSSOM.CSSSupportsRule.prototype, "cssText", {
  get: function() {
    var cssTexts = [];

    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText);
    }

    return "@supports " + this.conditionText + " {" + (cssTexts.length ? "\n  " + cssTexts.join("\n  ") : "") + "\n}";
  }
});

//.CommonJS
exports.CSSSupportsRule = CSSOM.CSSSupportsRule;
///CommonJS
