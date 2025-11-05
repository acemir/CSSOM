//.CommonJS
var CSSOM = {
  CSSRule: require("./CSSRule").CSSRule,
  CSSRuleList: require("./CSSRuleList").CSSRuleList,
  CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule,
};
///CommonJS

/**
 * @constructor
 * @see https://drafts.csswg.org/css-cascade-6/#cssscoperule
 */
CSSOM.CSSScopeRule = function CSSScopeRule() {
  CSSOM.CSSGroupingRule.call(this);
  this.__start = null;
  this.__end = null;
};

CSSOM.CSSScopeRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSScopeRule.prototype.constructor = CSSOM.CSSScopeRule;


Object.defineProperties(CSSOM.CSSScopeRule.prototype, {
  type: {
    value: 0,
    writable: false,
  },
  cssText: {
    get: function () {
      var cssTexts = [];
      for (var i = 0, length = this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
      }
      return "@scope " + (this.start ? "(" + this.start + ") " : "") + (this.end ? "to (" + this.end + ") " : "") + "{" + (cssTexts.length ? "\n  " + cssTexts.join("\n  ") : "") + "\n}";
    },
    configurable: true,
    enumerable: true,
  },
  start: {
    get: function () {
      return this.__start;
    }
  },
  end: {
    get: function () {
      return this.__end;
    }
  }
});

//.CommonJS
exports.CSSScopeRule = CSSOM.CSSScopeRule;
///CommonJS
