//.CommonJS
var CSSOM = {
  CSSRule: require("./CSSRule").CSSRule,
  CSSRuleList: require("./CSSRuleList").CSSRuleList,
  CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule,
};
///CommonJS

/**
 * @constructor
 * @see https://drafts.csswg.org/css-cascade-5/#csslayerblockrule
 */
CSSOM.CSSLayerBlockRule = function CSSLayerBlockRule() {
  CSSOM.CSSGroupingRule.call(this);
  this.name = "";
};

CSSOM.CSSLayerBlockRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSLayerBlockRule.prototype.constructor = CSSOM.CSSLayerBlockRule;
CSSOM.CSSLayerBlockRule.prototype.type = 18;

Object.defineProperties(CSSOM.CSSLayerBlockRule.prototype, {
  cssText: {
    get: function () {
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
      return "@layer" + (this.name ? " " + this.name : "") + values;
    },
    configurable: true,
    enumerable: true,
  },
});

//.CommonJS
exports.CSSLayerBlockRule = CSSOM.CSSLayerBlockRule;
///CommonJS
