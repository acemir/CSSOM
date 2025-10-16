//.CommonJS
var CSSOM = {
	StyleSheet: require("./StyleSheet").StyleSheet,
	CSSStyleRule: require("./CSSStyleRule").CSSStyleRule
};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet
 */
CSSOM.CSSStyleSheet = function CSSStyleSheet() {
	CSSOM.StyleSheet.call(this);
	this.cssRules = [];
};


CSSOM.CSSStyleSheet.prototype = new CSSOM.StyleSheet();
CSSOM.CSSStyleSheet.prototype.constructor = CSSOM.CSSStyleSheet;


/**
 * Used to insert a new rule into the style sheet. The new rule now becomes part of the cascade.
 *
 *   sheet = new Sheet("body {margin: 0}")
 *   sheet.toString()
 *   -> "body{margin:0;}"
 *   sheet.insertRule("img {border: none}", 0)
 *   -> 0
 *   sheet.toString()
 *   -> "img{border:none;}body{margin:0;}"
 *
 * @param {string} rule
 * @param {number} [index=0]
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-insertRule
 * @return {number} The index within the style sheet's rule collection of the newly inserted rule.
 */
CSSOM.CSSStyleSheet.prototype.insertRule = function(rule, index) {
	if (rule === undefined && index === undefined) {
		throw new TypeError("Failed to execute 'insertRule' on 'CSSStyleSheet': 1 argument required, but only 0 present.")
	}
	if (index === void 0) {
		index = 0;
	}
	if (index < 0 || index > this.cssRules.length) {
		throw new RangeError("INDEX_SIZE_ERR");
	}
	var ruleToParse = String(rule);
	var parsedSheet = CSSOM.parse(ruleToParse);
	if (parsedSheet.cssRules.length !== 1) {
		var domExceptionName = DOMException.SYNTAX_ERR;
		if (ruleToParse.trimStart().startsWith('@namespace')) {
			domExceptionName = DOMException.INVALID_STATE_ERR;
		}
		throw new DOMException("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule '" + ruleToParse + "'.", domExceptionName);
	}
	var cssRule = parsedSheet.cssRules[0];
	cssRule.parentStyleSheet = this;
	this.cssRules.splice(index, 0, cssRule);
	return index;
};


/**
 * Used to delete a rule from the style sheet.
 *
 *   sheet = new Sheet("img{border:none} body{margin:0}")
 *   sheet.toString()
 *   -> "img{border:none;}body{margin:0;}"
 *   sheet.deleteRule(0)
 *   sheet.toString()
 *   -> "body{margin:0;}"
 *
 * @param {number} index within the style sheet's rule list of the rule to remove.
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-deleteRule
 */
CSSOM.CSSStyleSheet.prototype.deleteRule = function(index) {
	if (index === undefined) {
		throw new TypeError("Failed to execute 'deleteRule' on 'CSSStyleSheet': 1 argument required, but only 0 present.")
	}
	index = Number(index);
	if (index < 0) {
		index = 4294967296 + index;
	}
	if (index >= this.cssRules.length) {
		throw new DOMException("Failed to execute 'deleteRule' on 'CSSStyleSheet': The index provided (" + index + ") is larger than the maximum index (" + this.cssRules.length + ").", DOMException.INDEX_SIZE_ERR);
	}
	if (this.cssRules[index] && this.cssRules[index].constructor.name == "CSSNamespaceRule") {
		var shouldContinue = this.cssRules.every(function (rule) {
			return ['CSSImportRule','CSSLayerStatementRule','CSSNamespaceRule'].indexOf(rule.constructor.name) !== -1
		});
		if (!shouldContinue) {
			throw new DOMException("Failed to execute 'deleteRule' on 'CSSStyleSheet': Deleting a CSSNamespaceRule is not allowed when there is rules other than @import, @layer statement, or @namespace.", DOMException.INVALID_STATE_ERR);
		}
	}
	this.cssRules.splice(index, 1);
};


/**
 * NON-STANDARD
 * @return {string} serialize stylesheet
 */
CSSOM.CSSStyleSheet.prototype.toString = function() {
	var result = "";
	var rules = this.cssRules;
	for (var i=0; i<rules.length; i++) {
		result += rules[i].cssText + "\n";
	}
	return result;
};


//.CommonJS
exports.CSSStyleSheet = CSSOM.CSSStyleSheet;
CSSOM.parse = require('./parse').parse; // Cannot be included sooner due to the mutual dependency between parse.js and CSSStyleSheet.js
///CommonJS
