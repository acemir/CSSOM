//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @param {string} token
 */
CSSOM.parse = function parse(token) {

	var i = 0;

	/**
		"before-selector" or
		"selector" or
		"atRule" or
		"atBlock" or
		"conditionBlock" or
		"before-name" or
		"name" or
		"before-value" or
		"value"
	*/
	var state = "before-selector";

	var index;
	var buffer = "";
	var valueParenthesisDepth = 0;

	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"value": true,
		"value-parenthesis": true,
		"atRule": true,
		"importRule-begin": true,
		"importRule": true,
		"atBlock": true,
		"containerBlock": true,
		"conditionBlock": true,
		'documentRule-begin': true,
		"layerBlock": true
	};

	var styleSheet = new CSSOM.CSSStyleSheet();

	// @type CSSStyleSheet|CSSMediaRule|CSSContainerRule|CSSSupportsRule|CSSFontFaceRule|CSSKeyframesRule|CSSDocumentRule
	var currentScope = styleSheet;

	// @type CSSMediaRule|CSSContainerRule|CSSSupportsRule|CSSKeyframesRule|CSSDocumentRule
	var parentRule;

	var ancestorRules = [];
	var hasAncestors = false;
	var prevScope;

	var name, priority="", styleRule, mediaRule, containerRule, supportsRule, importRule, fontFaceRule, keyframesRule, documentRule, hostRule, startingStyleRule, layerBlockRule, layerStatementRule, nestedSelectorRule;

	var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g; // Match @keyframes and vendor-prefixed @keyframes
	var atRulesStatemenRegExp = /(?<!{.*)[;}]\s*/; // Match a statement by verifying it finds a semicolon or closing brace not followed by another semicolon or closing brace
	var beforeRulePortionRegExp = /{(?!.*{)|}(?!.*})|;(?!.*;)|\*\/(?!.*\*\/)/g; // Match the closest allowed character (a opening or closing brace, a semicolon or a comment ending) before the rule
	var beforeRuleValidationRegExp = /^[\s{};]*(\*\/\s*)?$/; // Match that the portion before the rule is empty or contains only whitespace, semicolons, opening/closing braces, and optionally a comment ending (*/) followed by whitespace
	var forwardRuleValidationRegExp = /(?:\(|\s|\/\*)/; // Match that the rule is followed by any whitespace, a opening comment or a condition opening parenthesis
	var forwardRuleClosingBraceRegExp = /{[^{}]*}|}/; // Finds the next closing brace of a rule block
	var forwardRuleSemicolonAndOpeningBraceRegExp = /^.*?({|;)/; // Finds the next semicolon or opening brace after the at-rule	
	var layerRuleNameRegExp = /^(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)$/; // Validates a single @layer name

	/**
	 * Finds the first balanced block (including nested braces) in the string, starting from fromIndex.
	 * Returns an object similar to RegExp.prototype.match output.
	 * @param {string} str - The string to search.
	 * @param {number} [fromIndex=0] - The index to start searching from.
	 * @returns {object|null} - { 0: matchedString, index: startIndex, input: str } or null if not found.
	 */
	function matchBalancedBlock(str, fromIndex = 0) {
		const openIndex = str.indexOf('{', fromIndex);
		if (openIndex === -1) return null;
		let depth = 0;
		for (let i = openIndex; i < str.length; i++) {
			if (str[i] === '{') {
				depth++;
			} else if (str[i] === '}') {
				depth--;
				if (depth === 0) {
					const matchedString = str.slice(openIndex, i + 1);
					return {
						0: matchedString,
						index: openIndex,
						input: str
					};
				}
			}
		}
		return null;
	}

	var parseError = function(message) {
		var lines = token.substring(0, i).split('\n');
		var lineCount = lines.length;
		var charCount = lines.pop().length + 1;
		var error = new Error(message + ' (line ' + lineCount + ', char ' + charCount + ')');
		error.line = lineCount;
		/* jshint sub : true */
		error['char'] = charCount;
		error.styleSheet = styleSheet;
		throw error;
	};

	var validateAtRule = function(atRuleKey, validCallback, cannotBeNested) {
		var isValid = false;
		var ruleRegExp = new RegExp(atRuleKey + forwardRuleValidationRegExp.source, forwardRuleValidationRegExp.flags);
		var ruleSlice = token.slice(i);
		// Not all rules can be nested, if the rule cannot be nested and is in the root scope, do not perform the check
		var shouldPerformCheck = cannotBeNested && currentScope !== styleSheet ? false : true;
		// First, check if there is no invalid characters just after the at-rule
		if (shouldPerformCheck && ruleSlice.search(ruleRegExp) === 0) {
			// Find the closest allowed character before the at-rule (a opening or closing brace, a semicolon or a comment ending)
			var beforeSlice = token.slice(0, i);
			var regexBefore = new RegExp(beforeRulePortionRegExp.source, beforeRulePortionRegExp.flags);
			var matches = beforeSlice.match(regexBefore);
			var lastI = matches ? beforeSlice.lastIndexOf(matches[matches.length - 1]) : 0;
			var toCheckSlice = token.slice(lastI, i);
			// Check if we don't have any invalid in the portion before the `at-rule` and the closest allowed character
			var checkedSlice = toCheckSlice.search(beforeRuleValidationRegExp);
			if (checkedSlice === 0) {
				isValid = true;
			}
		}
		if (!isValid) {
			// If it's invalid the browser will simply ignore the entire invalid block
			// Use regex to find the closing brace of the invalid rule
			
			var ruleStatementMatch = ruleSlice.match(atRulesStatemenRegExp);

			// If it's a statement inside a nested rule, ignore only the statement
			if (ruleStatementMatch && currentScope !== styleSheet) {
				var ignoreEnd = ruleStatementMatch[0].indexOf(";");
				i += ruleStatementMatch.index + ignoreEnd;
				return;
			}

			// Check if there's a semicolon before the invalid at-rule and the first opening brace
			if (atRuleKey === "@layer") {
				var ruleSemicolonAndOpeningBraceMatch = ruleSlice.match(forwardRuleSemicolonAndOpeningBraceRegExp);
				if (ruleSemicolonAndOpeningBraceMatch && ruleSemicolonAndOpeningBraceMatch[1] === ";" ) {
					// Ignore the rule block until the semicolon
					i += ruleSemicolonAndOpeningBraceMatch.index + ruleSemicolonAndOpeningBraceMatch[0].length;
					state = "before-selector";
					return;
				}
			}

			// Ignore the entire rule block (if it's a statement it should ignore the statement plus the next block)
			var ruleClosingMatch = matchBalancedBlock(ruleSlice);
			if (ruleClosingMatch) {
				const ignoreRange = ruleClosingMatch.index + ruleClosingMatch[0].length;
				i+= ignoreRange;
				if (token.charAt(i) === '}') {
					i -= 1;
				}
			} else {
				i += ruleSlice.length;
			}
			state = "before-selector";
		} else {
			validCallback.call(this);
		}
	}

	var endingIndex = token.length - 1;

	for (var character; (character = token.charAt(i)); i++) {
		if (i === endingIndex) {
			switch (state) {
				case "importRule":
				case "layerBlock":
					token += ";"
			}
		}
		
		switch (character) {

		case " ":
		case "\t":
		case "\r":
		case "\n":
		case "\f":
			if (SIGNIFICANT_WHITESPACE[state]) {
				buffer += character;
			}
			break;

		// String
		case '"':
			index = i + 1;
			do {
				index = token.indexOf('"', index) + 1;
				if (!index) {
					parseError('Unmatched "');
				}
			} while (token[index - 2] === '\\');
			buffer += token.slice(i, index);
			i = index - 1;
			switch (state) {
				case 'before-value':
					state = 'value';
					break;
				case 'importRule-begin':
					state = 'importRule';
					if (i === endingIndex) {
						token += ';'
					}
					break;
			}
			break;

		case "'":
			index = i + 1;
			do {
				index = token.indexOf("'", index) + 1;
				if (!index) {
					parseError("Unmatched '");
				}
			} while (token[index - 2] === '\\');
			buffer += token.slice(i, index);
			i = index - 1;
			switch (state) {
				case 'before-value':
					state = 'value';
					break;
				case 'importRule-begin':
					state = 'importRule';
					break;
			}
			break;

		// Comment
		case "/":
			if (token.charAt(i + 1) === "*") {
				i += 2;
				index = token.indexOf("*/", i);
				if (index === -1) {
					parseError("Missing */");
				} else {
					i = index + 1;
				}
			} else {
				buffer += character;
			}
			if (state === "importRule-begin") {
				buffer += " ";
				state = "importRule";
			}
			break;

		// At-rule
		case "@":
			if (token.indexOf("@-moz-document", i) === i) {
				validateAtRule("@-moz-document", function(){
					state = "documentRule-begin";
					documentRule = new CSSOM.CSSDocumentRule();
					documentRule.__starts = i;
					i += "-moz-document".length;
				});
				buffer = "";
				break;
			} else if (token.indexOf("@media", i) === i) {
				validateAtRule("@media", function(){
					state = "atBlock";
					mediaRule = new CSSOM.CSSMediaRule();
					mediaRule.__starts = i;
					i += "media".length;
				});
				buffer = "";
				break;
			} else if (token.indexOf("@container", i) === i) {
				validateAtRule("@container", function(){
					state = "containerBlock";
					containerRule = new CSSOM.CSSContainerRule();
					containerRule.__starts = i;
					i += "container".length;
				});
				buffer = "";
				break;
			} else if (token.indexOf("@layer", i) === i) {
				validateAtRule("@layer", function(){
					state = "layerBlock"
					layerBlockRule = new CSSOM.CSSLayerBlockRule();
					layerBlockRule.__starts = i;
					i += "layer".length;
				});
				buffer = "";
				break;
			}  else if (token.indexOf("@supports", i) === i) {
				validateAtRule("@supports", function(){
					state = "conditionBlock";
					supportsRule = new CSSOM.CSSSupportsRule();
					supportsRule.__starts = i;
					i += "supports".length;
				});
				buffer = "";
				break;
			} else if (token.indexOf("@host", i) === i) {
				validateAtRule("@host", function(){
					state = "hostRule-begin";
					i += "host".length;
					hostRule = new CSSOM.CSSHostRule();
					hostRule.__starts = i;
				});
				buffer = "";
				break;
			} else if (token.indexOf("@starting-style", i) === i) {
				validateAtRule("@starting-style", function(){
					state = "startingStyleRule-begin";
					i += "starting-style".length;
					startingStyleRule = new CSSOM.CSSStartingStyleRule();
					startingStyleRule.__starts = i;
				});
				buffer = "";
				break;
			} else if (token.indexOf("@import", i) === i) {
				buffer = "";
				validateAtRule("@import", function(){
					state = "importRule-begin";
					i += "import".length;
					buffer += "@import";
				}, true);
				break;
			} else if (token.indexOf("@font-face", i) === i) {
				buffer = "";
				validateAtRule("@font-face", function(){
					state = "fontFaceRule-begin";
					i += "font-face".length;
					fontFaceRule = new CSSOM.CSSFontFaceRule();
					fontFaceRule.__starts = i;
				}, parentRule && parentRule.constructor.name === "CSSStyleRule" );
				break;
			} else {
				atKeyframesRegExp.lastIndex = i;
				var matchKeyframes = atKeyframesRegExp.exec(token);
				if (matchKeyframes && matchKeyframes.index === i) {
					state = "keyframesRule-begin";
					keyframesRule = new CSSOM.CSSKeyframesRule();
					keyframesRule.__starts = i;
					keyframesRule._vendorPrefix = matchKeyframes[1]; // Will come out as undefined if no prefix was found
					i += matchKeyframes[0].length - 1;
					buffer = "";
					break;
				} else if (state === "selector") {
					state = "atRule";
				}
			}
			buffer += character;
			break;

		case "{":
			if (currentScope === styleSheet) {
				nestedSelectorRule = null;
			}
			if (state === "selector" || state === "atRule") {
				if (!nestedSelectorRule && buffer.indexOf(";") !== -1) {
					var ruleClosingMatch = token.slice(i).match(forwardRuleClosingBraceRegExp);
					if (ruleClosingMatch) {
						styleRule = null;
						buffer = "";
						state = "before-selector";
						i += ruleClosingMatch.index + ruleClosingMatch[0].length;
						break;
					}
				}

				if (parentRule) {
					styleRule.parentRule = parentRule;
					ancestorRules.push(parentRule);
				}

				currentScope = parentRule = styleRule;
				styleRule.selectorText = buffer.trim();
				styleRule.style.__starts = i;
				styleRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-name";
			} else if (state === "atBlock") {
				mediaRule.media.mediaText = buffer.trim();

				if (parentRule) {
					mediaRule.parentRule = parentRule;
					ancestorRules.push(parentRule);
				}

				currentScope = parentRule = mediaRule;
				mediaRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "containerBlock") {
				containerRule.containerText = buffer.trim();

				if (parentRule) {
					containerRule.parentRule = parentRule;
					ancestorRules.push(parentRule);
				}
				currentScope = parentRule = containerRule;
				containerRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "conditionBlock") {
				supportsRule.conditionText = buffer.trim();

				if (parentRule) {
					supportsRule.parentRule = parentRule;
					ancestorRules.push(parentRule);
				}

				currentScope = parentRule = supportsRule;
				supportsRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "layerBlock") {
				layerBlockRule.name = buffer.trim();

				var isValidName = layerBlockRule.name.length === 0 || layerBlockRule.name.match(layerRuleNameRegExp) !== null;

				if (isValidName) {
					if (parentRule) {
						layerBlockRule.parentRule = parentRule;
						ancestorRules.push(parentRule);
					}
	
					currentScope = parentRule = layerBlockRule;
					layerBlockRule.parentStyleSheet = styleSheet;
				}
				buffer = "";
				state = "before-selector";
			} else if (state === "hostRule-begin") {
				if (parentRule) {
					ancestorRules.push(parentRule);
				}

				currentScope = parentRule = hostRule;
				hostRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "startingStyleRule-begin") {
				if (parentRule) {
					startingStyleRule.parentRule = parentRule;
					ancestorRules.push(parentRule);
				}

				currentScope = parentRule = startingStyleRule;
				startingStyleRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";

			} else if (state === "fontFaceRule-begin") {
				if (parentRule) {
					fontFaceRule.parentRule = parentRule;
				}
				fontFaceRule.parentStyleSheet = styleSheet;
				styleRule = fontFaceRule;
				buffer = "";
				state = "before-name";
			} else if (state === "keyframesRule-begin") {
				keyframesRule.name = buffer.trim();
				if (parentRule) {
					ancestorRules.push(parentRule);
					keyframesRule.parentRule = parentRule;
				}
				keyframesRule.parentStyleSheet = styleSheet;
				currentScope = parentRule = keyframesRule;
				buffer = "";
				state = "keyframeRule-begin";
			} else if (state === "keyframeRule-begin") {
				styleRule = new CSSOM.CSSKeyframeRule();
				styleRule.keyText = buffer.trim();
				styleRule.__starts = i;
				buffer = "";
				state = "before-name";
			} else if (state === "documentRule-begin") {
				// FIXME: what if this '{' is in the url text of the match function?
				documentRule.matcher.matcherText = buffer.trim();
				if (parentRule) {
					ancestorRules.push(parentRule);
					documentRule.parentRule = parentRule;
				}
				currentScope = parentRule = documentRule;
				documentRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "name") {
				if (styleRule.constructor.name === "CSSNestedDeclarations") {
					if (styleRule.style.length) {
						parentRule.cssRules.push(styleRule);
						styleRule.parentRule = parentRule;
						styleRule.parentStyleSheet = styleSheet;
						ancestorRules.push(parentRule);
					} else {
						// If the styleRule is empty, we can assume that it's a nested selector
						ancestorRules.push(parentRule);
					}
				} else {
					currentScope = parentRule = styleRule;
					ancestorRules.push(parentRule);
					styleRule.parentStyleSheet = styleSheet;
				}
				
				
				styleRule = new CSSOM.CSSStyleRule();
				styleRule.selectorText = buffer.trim();
				styleRule.style.__starts = i - buffer.length;
				styleRule.parentRule = parentRule;
				nestedSelectorRule = styleRule;

				buffer = "";
				state = "before-name";
			}
			break;

		case ":":
			if (state === "name") {
				// It can be a nested selector, let's check
				var openBraceBeforeMatch = token.slice(i).match(/[{;}]/);
				var hasOpenBraceBefore = openBraceBeforeMatch && openBraceBeforeMatch[0] === '{';
				if (hasOpenBraceBefore) {
					// Is a selector
					buffer += character;
				} else {
					// Is a declaration
					name = buffer.trim();
					buffer = "";
					state = "before-value";
				}
			} else {
				buffer += character;
			}
			break;

		case "(":
			if (state === 'value') {
				// ie css expression mode
				if (buffer.trim() === 'expression') {
					var info = (new CSSOM.CSSValueExpression(token, i)).parse();

					if (info.error) {
						parseError(info.error);
					} else {
						buffer += info.expression;
						i = info.idx;
					}
				} else {
					state = 'value-parenthesis';
					//always ensure this is reset to 1 on transition
					//from value to value-parenthesis
					valueParenthesisDepth = 1;
					buffer += character;
				}
			} else if (state === 'value-parenthesis') {
				valueParenthesisDepth++;
				buffer += character;
			} else {
				buffer += character;
			}
			break;

		case ")":
			if (state === 'value-parenthesis') {
				valueParenthesisDepth--;
				if (valueParenthesisDepth === 0) state = 'value';
			}
			buffer += character;
			break;

		case "!":
			if (state === "value" && token.indexOf("!important", i) === i) {
				priority = "important";
				i += "important".length;
			} else {
				buffer += character;
			}
			break;

		case ";":
			switch (state) {
				case "value":
					styleRule.style.setProperty(name, buffer.trim(), priority);
					priority = "";
					buffer = "";
					state = "before-name";
					break;
				case "atRule":
					buffer = "";
					state = "before-selector";
					break;
				case "importRule":
					const isValid = styleSheet.cssRules.length === 0 || styleSheet.cssRules.some(function (rule) {
						return ['CSSImportRule', 'CSSLayerStatementRule'].indexOf(rule.constructor.name) !== -1
					});
					if (isValid) {
						importRule = new CSSOM.CSSImportRule();
						importRule.parentStyleSheet = importRule.styleSheet.parentStyleSheet = styleSheet;
						importRule.cssText = buffer + character;
						styleSheet.cssRules.push(importRule);
					}
					buffer = "";
					state = "before-selector";
					break;
				case "layerBlock":
					const nameListStr = buffer.trim().split(",").map(function (name) {
						return name.trim();
					});
					const isInvalid = parentRule !== undefined || nameListStr.some(function (name) {
						return name.trim().match(layerRuleNameRegExp) === null;
					});

					if (!isInvalid) {
						layerStatementRule = new CSSOM.CSSLayerStatementRule();
						layerStatementRule.parentStyleSheet = styleSheet;
						layerStatementRule.__starts = layerBlockRule.__starts;
						layerStatementRule.__ends = i;
						layerStatementRule.nameList = nameListStr;
						styleSheet.cssRules.push(layerStatementRule);
					}
					buffer = "";
					state = "before-selector";
					break;
				default:
					buffer += character;
					break;
			}
			break;

		case "}":
			switch (state) {
				case "value":
					styleRule.style.setProperty(name, buffer.trim(), priority);
					priority = "";
					/* falls through */
				case "before-name":
				case "name":
					styleRule.__ends = i + 1;
					
					if (parentRule === styleRule) {
						parentRule = ancestorRules.pop()
					}

					if (parentRule) {
						styleRule.parentRule = parentRule;
					}
					styleRule.parentStyleSheet = styleSheet;

					if (currentScope === styleRule) {
						currentScope = parentRule || styleSheet;
					}

					currentScope.cssRules.push(styleRule);
					buffer = "";
					if (currentScope.constructor === CSSOM.CSSKeyframesRule) {
						state = "keyframeRule-begin";
					} else {
						state = "before-selector";
					}

					if (styleRule.constructor.name === "CSSNestedDeclarations") {
						if (currentScope !== styleSheet) {
							nestedSelectorRule = currentScope;
						}
						styleRule = null;
					} else {
						styleRule = null;
						break;
					}
				case "keyframeRule-begin":
				case "before-selector":
				case "selector":
					// End of media/supports/document rule.
					if (!parentRule) {
						break;
						//parseError("Unexpected }");
					}

					// Handle rules nested in @media or @supports
					hasAncestors = ancestorRules.length > 0;

					while (ancestorRules.length > 0) {
						parentRule = ancestorRules.pop();

						if (
							parentRule.constructor.name === "CSSStyleRule"
							|| parentRule.constructor.name === "CSSMediaRule"
							|| parentRule.constructor.name === "CSSSupportsRule"
							|| parentRule.constructor.name === "CSSContainerRule"
							|| parentRule.constructor.name === "CSSLayerBlockRule"
							|| parentRule.constructor.name === "CSSStartingStyleRule"
						) {
							if (nestedSelectorRule) {
								if (nestedSelectorRule.parentRule) {
									prevScope = nestedSelectorRule;
									currentScope = nestedSelectorRule.parentRule;
									if (currentScope.cssRules.findIndex(function (rule) {
										return rule === prevScope
									}) === -1) {
										currentScope.cssRules.push(prevScope);
									}
									nestedSelectorRule = currentScope;
								}
							} else {
								prevScope = currentScope;
								currentScope = parentRule;
								currentScope.cssRules.push(prevScope);
								break;
							}
						}

						if (ancestorRules.length === 0) {
							hasAncestors = false;
						}
					}
					
					if (currentScope.parentRule == null) {
						currentScope.__ends = i + 1;
						if (currentScope !== styleSheet && styleSheet.cssRules.findIndex(function (rule) {
							return rule === currentScope
						}) === -1) {
							styleSheet.cssRules.push(currentScope);
						}
						currentScope = styleSheet;
						if (nestedSelectorRule === parentRule) {
							// Check if this selector is really starting inside another selector
							var nestedSelectorTokenToCurrentSelectorToken = token.slice(nestedSelectorRule.__starts, i + 1);
							
							if (nestedSelectorTokenToCurrentSelectorToken.match(/{/g)?.length === nestedSelectorTokenToCurrentSelectorToken.match(/}/g)?.length) {
								// If the number of opening and closing braces are equal, we can assume that the new selector is starting outside the nestedSelectorRule
								nestedSelectorRule.__ends = i + 1;
								nestedSelectorRule = null;
								parentRule = null;
							}
						} else {
							parentRule = null;

						}
					}

					buffer = "";
					state = "before-selector";
					break;
			}
			break;

		default:
			switch (state) {
				case "before-selector":
					state = "selector";
					if (styleRule && parentRule) {
						// Assuming it's a declaration inside Nested Selector OR a Nested Declaration
						// If Declaration inside Nested Selector let's keep the same styleRule
						if (
							parentRule.constructor.name === "CSSStyleRule"
							|| parentRule.constructor.name === "CSSMediaRule"
							|| parentRule.constructor.name === "CSSSupportsRule"
							|| parentRule.constructor.name === "CSSContainerRule"
							|| parentRule.constructor.name === "CSSLayerBlockRule"
							|| parentRule.constructor.name === "CSSStartingStyleRule"
						) {
							// parentRule.parentRule = styleRule;
							state = "before-name";
							if (styleRule !== parentRule) {
								styleRule = new CSSOM.CSSNestedDeclarations();
								styleRule.__starts = i;	
							}
						}
						
					} else if (nestedSelectorRule && parentRule && (
						parentRule.constructor.name === "CSSStyleRule"
						|| parentRule.constructor.name === "CSSMediaRule"
						|| parentRule.constructor.name === "CSSSupportsRule"
						|| parentRule.constructor.name === "CSSContainerRule"
						|| parentRule.constructor.name === "CSSLayerBlockRule"
						|| parentRule.constructor.name === "CSSStartingStyleRule"
					)) {
						state = "before-name";
						if (parentRule.cssRules.length) {
							currentScope = nestedSelectorRule = parentRule;
							styleRule = new CSSOM.CSSNestedDeclarations();
							styleRule.__starts = i;	
						} else {
							if (parentRule.constructor.name === "CSSStyleRule") {
								styleRule = parentRule;
							} else {
								styleRule = new CSSOM.CSSStyleRule();
								styleRule.__starts = i;								
							}
						}
					} else {
						styleRule = new CSSOM.CSSStyleRule();
						styleRule.__starts = i;
					}
					break;
				case "before-name":
					state = "name";
					break;
				case "before-value":
					state = "value";
					break;
				case "importRule-begin":
					state = "importRule";
					break;
			}
			buffer += character;
			break;
		}
	}

	return styleSheet;
};


//.CommonJS
exports.parse = CSSOM.parse;
// The following modules cannot be included sooner due to the mutual dependency with parse.js
CSSOM.CSSStyleSheet = require("./CSSStyleSheet").CSSStyleSheet;
CSSOM.CSSStyleRule = require("./CSSStyleRule").CSSStyleRule;
CSSOM.CSSNestedDeclarations = require("./CSSNestedDeclarations").CSSNestedDeclarations;
CSSOM.CSSImportRule = require("./CSSImportRule").CSSImportRule;
CSSOM.CSSGroupingRule = require("./CSSGroupingRule").CSSGroupingRule;
CSSOM.CSSMediaRule = require("./CSSMediaRule").CSSMediaRule;
CSSOM.CSSContainerRule = require("./CSSContainerRule").CSSContainerRule;
CSSOM.CSSConditionRule = require("./CSSConditionRule").CSSConditionRule;
CSSOM.CSSSupportsRule = require("./CSSSupportsRule").CSSSupportsRule;
CSSOM.CSSFontFaceRule = require("./CSSFontFaceRule").CSSFontFaceRule;
CSSOM.CSSHostRule = require("./CSSHostRule").CSSHostRule;
CSSOM.CSSStartingStyleRule = require("./CSSStartingStyleRule").CSSStartingStyleRule;
CSSOM.CSSStyleDeclaration = require('./CSSStyleDeclaration').CSSStyleDeclaration;
CSSOM.CSSKeyframeRule = require('./CSSKeyframeRule').CSSKeyframeRule;
CSSOM.CSSKeyframesRule = require('./CSSKeyframesRule').CSSKeyframesRule;
CSSOM.CSSValueExpression = require('./CSSValueExpression').CSSValueExpression;
CSSOM.CSSDocumentRule = require('./CSSDocumentRule').CSSDocumentRule;
CSSOM.CSSLayerBlockRule = require("./CSSLayerBlockRule").CSSLayerBlockRule;
CSSOM.CSSLayerStatementRule = require("./CSSLayerStatementRule").CSSLayerStatementRule;
///CommonJS
