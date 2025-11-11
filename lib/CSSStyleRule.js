//.CommonJS
var CSSOM = {
	CSSStyleProperties: require("./CSSStyleProperties").CSSStyleProperties,
	CSSRule: require("./CSSRule").CSSRule,
	CSSRuleList: require("./CSSRuleList").CSSRuleList,
	CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule,
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssstylerule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleRule
 */
CSSOM.CSSStyleRule = function CSSStyleRule() {
	CSSOM.CSSGroupingRule.call(this);
	let globalObject;
	if (this.parentStyleSheet && this.parentStyleSheet.__globalObject) {
		globalObject = this.parentStyleSheet.__globalObject;
	} else if (this.__parentStyleSheet && this.__parentStyleSheet.__globalObject) {
		globalObject = this.__parentStyleSheet.__globalObject;
	} else if (this.__globalObject) {
		globalObject = this.__globalObject;
	}
	this.__style = new CSSOM.CSSStyleProperties(globalObject, this);
	this.__list = [];
	this.__selectorText = "";
};

CSSOM.CSSStyleRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSStyleRule.prototype.constructor = CSSOM.CSSStyleRule;

Object.defineProperty(CSSOM.CSSStyleRule.prototype, "type", {
	value: 1,
	writable: false
});

Object.defineProperty(CSSOM.CSSStyleRule.prototype, "selectorText", {
	get: function() {
		return this.__selectorText;	
	},
	set: function(value) {
		if (typeof value === "string") {
			var trimmedValue = value.trim();

			if (trimmedValue === '') {
				return;
			}

			// TODO: Setting invalid selectorText should be ignored
			// There are some validations already on lib/parse.js
			// but the same validations should be applied here.
			// Check if we can move these validation logic to a shared function.

			this.__selectorText = trimmedValue;
		}
	}
});

Object.defineProperty(CSSOM.CSSStyleRule.prototype, "style", {
	get: function() {
		for (let i = 0; i < this.__list.length; i++) {
			delete this.__style[i];
		}
		this.__list = [];
		for (let i = 0; i < this.__style.length; i++) {
			const property = this.__style.item(i);
			this.__list[i] = property;
			this.__style[i] = property;
		}
		return this.__style;
	},
	set: function(value) {
		if (typeof value === "string") {
			this.__style.cssText = value;
		}
	}
});

Object.defineProperty(CSSOM.CSSStyleRule.prototype, "cssText", {
	get: function() {
		var text;
		if (this.selectorText) {
			var values = "";
			if (this.cssRules.length) {
				var valuesArr = [" {"];
				this.style.cssText && valuesArr.push(this.style.cssText);
				valuesArr.push(this.cssRules.reduce(function(acc, rule){ 
					if (rule.cssText !== "") {
						acc.push(rule.cssText);
					}
					return acc;
				}, []).join("\n  "));
				values = valuesArr.join("\n  ") + "\n}";
			} else {
				values = " {" + (this.style.cssText ? " " + this.style.cssText : "") + " }";
			}
			text = this.selectorText + values;
		} else {
			text = "";
		}
		return text;
	},
	set: function(cssText) {
		if (typeof cssText === "string") {
			var rule = CSSOM.CSSStyleRule.parse(cssText);
			this.__style.cssText = rule.style.cssText;
			this.selectorText = rule.selectorText;
		}
	}
});


/**
 * NON-STANDARD
 * lightweight version of parse.js.
 * @param {string} ruleText
 * @return CSSStyleRule
 */
CSSOM.CSSStyleRule.parse = function(ruleText) {
	var i = 0;
	var state = "selector";
	var index;
	var j = i;
	var buffer = "";

	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"value": true
	};

	var styleRule = new CSSOM.CSSStyleRule();
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
				styleRule.selectorText = buffer.trim();
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
				styleRule.style.setProperty(name, buffer.trim(), priority);
				priority = "";
				buffer = "";
				state = "name";
			} else {
				buffer += character;
			}
			break;

		case "}":
			if (state === "value") {
				styleRule.style.setProperty(name, buffer.trim(), priority);
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

	return styleRule;

};


//.CommonJS
exports.CSSStyleRule = CSSOM.CSSStyleRule;
///CommonJS
