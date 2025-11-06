//.CommonJS
var CSSOM = {
	CSSRule: require("./CSSRule").CSSRule,
  CSSRuleList: require("./CSSRuleList").CSSRuleList,
	CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule,
	CSSConditionRule: require("./CSSConditionRule").CSSConditionRule,
	MediaList: require("./MediaList").MediaList
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssmediarule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSMediaRule
 */
CSSOM.CSSMediaRule = function CSSMediaRule() {
	CSSOM.CSSConditionRule.call(this);
	this.__media = new CSSOM.MediaList();
};

CSSOM.CSSMediaRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSMediaRule.prototype.constructor = CSSOM.CSSMediaRule;
CSSOM.CSSMediaRule.prototype.type = 4;

// https://opensource.apple.com/source/WebCore/WebCore-7611.1.21.161.3/css/CSSMediaRule.cpp
Object.defineProperties(CSSOM.CSSMediaRule.prototype, {
  "media": {
    get: function() {
      return this.__media;
    },
    set: function(value) {
      if (typeof value === "string") {
        this.__media.mediaText = value;
      } else {
        this.__media = value;
      }
    },
    enumerable: true
  },
  "conditionText": {
    get: function() {
      return this.media.mediaText;
    }
  },
  "cssText": {
    get: function() {
      var cssTexts = [];
      for (var i=0, length=this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
      }
      return "@media " + this.media.mediaText + " {" + (cssTexts.length ? "\n  " + cssTexts.join("\n  ") : "") + "\n}";
    },
    configurable: true,
    enumerable: true
  }
});


//.CommonJS
exports.CSSMediaRule = CSSOM.CSSMediaRule;
///CommonJS
