//.CommonJS
var CSSOM = {
	CSSRule: require("./CSSRule").CSSRule,
	CSSStyleSheet: require("./CSSStyleSheet").CSSStyleSheet
};
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/cssom/#the-cssnamespacerule-interface
 */
CSSOM.CSSNamespaceRule = function CSSNamespaceRule() {
	CSSOM.CSSRule.call(this);
	this.prefix = "";
	this.namespaceURI = "";
	this.styleSheet = new CSSOM.CSSStyleSheet();
};

CSSOM.CSSNamespaceRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSNamespaceRule.prototype.constructor = CSSOM.CSSNamespaceRule;
CSSOM.CSSNamespaceRule.prototype.type = 10;

Object.defineProperty(CSSOM.CSSNamespaceRule.prototype, "cssText", {
  get: function() {
    return "@namespace" + (this.prefix && " " + this.prefix) + " url(" + this.namespaceURI + ");";
  },
  set: function(cssText) {
    // Reset prefix and namespaceURI
    this.prefix = "";
    this.namespaceURI = "";

    // Remove @namespace and trim
    var text = cssText.trim();
    if (text.indexOf('@namespace') === 0) {
      text = text.slice('@namespace'.length).trim();
    }

    // Remove trailing semicolon if present
    if (text.charAt(text.length - 1) === ';') {
      text = text.slice(0, -1).trim();
    }

    // Regex to match: [optional prefix] url("...") or [optional prefix] "..."
    var re = /^(?:(\w+)\s+)?(?:url\(\s*(['"]?)(.*?)\2\s*\)|(['"])(.*?)\4)$/;
    var match = text.match(re);

    if (match) {
      // If prefix is present
      if (match[1]) {
        this.prefix = match[1];
      }
      // If url(...) form
      if (typeof match[3] !== "undefined" && match[3] !== "") {
        this.namespaceURI = match[3];
      }
      // If quoted string form
      else if (typeof match[5] !== "undefined" && match[5] !== "") {
        this.namespaceURI = match[5];
      }
    }
  }
});


//.CommonJS
exports.CSSNamespaceRule = CSSOM.CSSNamespaceRule;
///CommonJS
