//.CommonJS
var CSSOM = {
	CSSStyleDeclaration: require("./CSSStyleDeclaration").CSSStyleDeclaration,
	CSSRule: require("./CSSRule").CSSRule,
	CSSRuleList: require("./CSSRuleList").CSSRuleList,
	CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule,
};
// Use cssstyle if available
try {
	CSSOM.CSSStyleDeclaration = require("cssstyle").CSSStyleDeclaration;
} catch (e) {
	// ignore
}
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/cssom/#the-csspagerule-interface
 */
CSSOM.CSSPageRule = function CSSPageRule() {
	CSSOM.CSSGroupingRule.call(this);
	this.__style = new CSSOM.CSSStyleDeclaration();
	this.__style.parentRule = this;
};

CSSOM.CSSPageRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSPageRule.prototype.constructor = CSSOM.CSSPageRule;

Object.defineProperty(CSSOM.CSSPageRule.prototype, "type", {
	value: 6,
	writable: false
});

Object.defineProperty(CSSOM.CSSPageRule.prototype, "selectorText", {
    get: function() {
        return this.__selectorText;	
    },
    set: function(value) {
        if (typeof value === "string") {
            var trimmedValue = value.trim();
            
            // Empty selector is valid for @page
            if (trimmedValue === '') {
                this.__selectorText = '';
                return;
            }
            
            // Parse @page selectorText for page name and pseudo-pages
            // Valid formats:
            // - (empty - no name, no pseudo-page)
            // - :left, :right, :first, :blank (pseudo-page only)
            // - named (named page only)
            // - named:first (named page with single pseudo-page)
            // - named:first:left (named page with multiple pseudo-pages)
			var atPageRuleSelectorRegExp = /^([^\s:]+)?((?::\w+)*)$/;
            var match = trimmedValue.match(atPageRuleSelectorRegExp);
            if (match) {
				var pageName = match[1] || '';
                var pseudoPages = match[2] || '';

				// Validate page name if present
				if (pageName) {
					var cssCustomIdentifierRegExp = /^(-?[_a-zA-Z]+(\.[_a-zA-Z]+)*[_a-zA-Z0-9-]*)$/; // Validates a css custom identifier
					// Page name can be an identifier or a string
					if (!cssCustomIdentifierRegExp.test(pageName)) {
						return;
					}
				}
                
                // Validate pseudo-pages if present
                if (pseudoPages) {
                    var pseudos = pseudoPages.split(':').filter(function(p) { return p; });
                    var validPseudos = ['left', 'right', 'first', 'blank'];
                    var allValid = true;
                    for (var j = 0; j < pseudos.length; j++) {
                        if (validPseudos.indexOf(pseudos[j].toLowerCase()) === -1) {
                            allValid = false;
                            break;
                        }
                    }
                    
                    if (!allValid) {
                        return; // Invalid pseudo-page, do nothing
                    }
                }
                
				this.__selectorText = pageName + pseudoPages.toLowerCase();
            }
        }
    }
});

Object.defineProperty(CSSOM.CSSPageRule.prototype, "style", {
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

Object.defineProperty(CSSOM.CSSPageRule.prototype, "cssText", {
	get: function() {
        var values = ""
        if (this.cssRules.length) {
            var valuesArr = [" {"];
            this.style.cssText && valuesArr.push(this.style.cssText);
            valuesArr.push(this.cssRules.map(function(rule){ return rule.cssText }).join("\n  "));
            values = valuesArr.join("\n  ") + "\n}"
        } else {
            values = " {" + (this.style.cssText ? " " + this.style.cssText : "") + " }";
        }
		return "@page" + (this.selectorText ? " " + this.selectorText : "") + values;
	},
	set: function(cssText) {
		if (typeof value === "string") {
			var rule = CSSOM.CSSPageRule.parse(cssText);
			this.__style = rule.style;
			this.selectorText = rule.selectorText;
		}
	}
});

/**
 * NON-STANDARD
 * lightweight version of parse.js.
 * @param {string} ruleText
 * @return CSSPageRule
 */
CSSOM.CSSPageRule.parse = function(ruleText) {
	var i = 0;
	var state = "selector";
	var index;
	var j = i;
	var buffer = "";

	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"value": true
	};

	var pageRule = new CSSOM.CSSPageRule();
	var name, priority="";

	for (var character; (character = ruleText.charAt(i)); i++) {

		switch (character) {

		case " ":
		case "\t":
		case "\r":
		case "\n":
		case "\f":
			if (SIGNIFICANT_WHITESPACE[state]) {
				// Squash 2 or more white-spaces in the row into 1
				switch (ruleText.charAt(i - 1)) {
					case " ":
					case "\t":
					case "\r":
					case "\n":
					case "\f":
						break;
					default:
						buffer += " ";
						break;
				}
			}
			break;

		// String
		case '"':
			j = i + 1;
			index = ruleText.indexOf('"', j) + 1;
			if (!index) {
				throw '" is missing';
			}
			buffer += ruleText.slice(i, index);
			i = index - 1;
			break;

		case "'":
			j = i + 1;
			index = ruleText.indexOf("'", j) + 1;
			if (!index) {
				throw "' is missing";
			}
			buffer += ruleText.slice(i, index);
			i = index - 1;
			break;

		// Comment
		case "/":
			if (ruleText.charAt(i + 1) === "*") {
				i += 2;
				index = ruleText.indexOf("*/", i);
				if (index === -1) {
					throw new SyntaxError("Missing */");
				} else {
					i = index + 1;
				}
			} else {
				buffer += character;
			}
			break;

		case "{":
			if (state === "selector") {
				pageRule.selectorText = buffer.trim();
				buffer = "";
				state = "name";
			}
			break;

		case ":":
			if (state === "name") {
				name = buffer.trim();
				buffer = "";
				state = "value";
			} else {
				buffer += character;
			}
			break;

		case "!":
			if (state === "value" && ruleText.indexOf("!important", i) === i) {
				priority = "important";
				i += "important".length;
			} else {
				buffer += character;
			}
			break;

		case ";":
			if (state === "value") {
				pageRule.style.setProperty(name, buffer.trim(), priority);
				priority = "";
				buffer = "";
				state = "name";
			} else {
				buffer += character;
			}
			break;

		case "}":
			if (state === "value") {
				pageRule.style.setProperty(name, buffer.trim(), priority);
				priority = "";
				buffer = "";
			} else if (state === "name") {
				break;
			} else {
				buffer += character;
			}
			state = "selector";
			break;

		default:
			buffer += character;
			break;

		}
	}

	return pageRule;

};

//.CommonJS
exports.CSSPageRule = CSSOM.CSSPageRule;
///CommonJS
