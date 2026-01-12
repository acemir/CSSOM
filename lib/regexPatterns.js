// Shared regex patterns for CSS parsing and validation
// These patterns are compiled once and reused across multiple files for better performance

// Regex patterns for CSS parsing
var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g; // Match @keyframes and vendor-prefixed @keyframes
var beforeRulePortionRegExp = /{(?!.*{)|}(?!.*})|;(?!.*;)|\*\/(?!.*\*\/)/g; // Match the closest allowed character (a opening or closing brace, a semicolon or a comment ending) before the rule
var beforeRuleValidationRegExp = /^[\s{};]*(\*\/\s*)?$/; // Match that the portion before the rule is empty or contains only whitespace, semicolons, opening/closing braces, and optionally a comment ending (*/) followed by whitespace
var forwardRuleValidationRegExp = /(?:\s|\/\*|\{|\()/; // Match that the rule is followed by any whitespace, a opening comment, a condition opening parenthesis or a opening brace
var forwardImportRuleValidationRegExp = /(?:\s|\/\*|'|")/; // Match that the rule is followed by any whitespace, an opening comment, a single quote or double quote
var forwardRuleClosingBraceRegExp = /{[^{}]*}|}/; // Finds the next closing brace of a rule block
var forwardRuleSemicolonAndOpeningBraceRegExp = /^.*?({|;)/; // Finds the next semicolon or opening brace after the at-rule

// Regex patterns for CSS selector validation and parsing
var cssCustomIdentifierRegExp = /^(-?[_a-zA-Z]+(\.[_a-zA-Z]+)*[_a-zA-Z0-9-]*)$/; // Validates a css custom identifier
var startsWithCombinatorRegExp = /^\s*[>+~]/; // Checks if a selector starts with a CSS combinator (>, +, ~)

/**
 * Parse `@page` selectorText for page name and pseudo-pages
 * Valid formats:
 * - (empty - no name, no pseudo-page)
 * - `:left`, `:right`, `:first`, `:blank` (pseudo-page only)
 * - `named` (named page only)
 * - `named:first` (named page with single pseudo-page)
 * - `named:first:left` (named page with multiple pseudo-pages)
 */
var atPageRuleSelectorRegExp = /^([^\s:]+)?((?::\w+)*)$/; // Validates @page rule selectors

// Regex patterns for CSSImportRule parsing
var layerRegExp = /layer\(([^)]*)\)/; // Matches layer() function in @import
var layerRuleNameRegExp = /^(-?[_a-zA-Z]+(\.[_a-zA-Z]+)*[_a-zA-Z0-9-]*)$/; // Validates layer name (same as custom identifier)
var doubleOrMoreSpacesRegExp = /\s{2,}/g; // Matches two or more consecutive whitespace characters


// Regex patterns for CSS escape sequences and identifiers
var startsWithHexEscapeRegExp = /^\\[0-9a-fA-F]/; // Checks if escape sequence starts with hex escape
var identStartCharRegExp = /[a-zA-Z_\u00A0-\uFFFF]/; // Valid identifier start character
var identCharRegExp = /^[a-zA-Z0-9_\-\u00A0-\uFFFF\\]/; // Valid identifier character
var specialCharsNeedEscapeRegExp = /[!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~\s]/; // Characters that need escaping
var combinatorOrSeparatorRegExp = /[\s>+~,()]/; // Selector boundaries and combinators
var afterHexEscapeSeparatorRegExp = /[\s>+~,(){}\[\]]/; // Characters that separate after hex escape
var trailingSpaceSeparatorRegExp = /[\s>+~,(){}]/; // Characters that allow trailing space
var endsWithHexEscapeRegExp = /\\[0-9a-fA-F]{1,6}\s+$/; // Matches selector ending with hex escape + space(s)

/**
 * Regular expression to detect invalid characters in the value portion of a CSS style declaration.
 *
 * This regex matches a colon (:) that is not inside parentheses and not inside single or double quotes.
 * It is used to ensure that the value part of a CSS property does not contain unexpected colons,
 * which would indicate a malformed declaration (e.g., "color: foo:bar;" is invalid).
 *
 * The negative lookahead `(?![^(]*\))` ensures that the colon is not followed by a closing
 * parenthesis without encountering an opening parenthesis, effectively ignoring colons inside
 * function-like values (e.g., `url(data:image/png;base64,...)`).
 *
 * The lookahead `(?=(?:[^'"]|'[^']*'|"[^"]*")*$)` ensures that the colon is not inside single or double quotes,
 * allowing colons within quoted strings (e.g., `content: ":";` or `background: url("foo:bar.png");`).
 *
 * Example:
 * - `color: red;`         // valid, does not match
 * - `background: url(data:image/png;base64,...);` // valid, does not match
 * - `content: ':';`       // valid, does not match
 * - `color: foo:bar;`     // invalid, matches
 */
var basicStylePropertyValueValidationRegExp = /:(?![^(]*\))(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/;

var regexPatterns = {
	// Parsing patterns
	atKeyframesRegExp: atKeyframesRegExp,
	beforeRulePortionRegExp: beforeRulePortionRegExp,
	beforeRuleValidationRegExp: beforeRuleValidationRegExp,
	forwardRuleValidationRegExp: forwardRuleValidationRegExp,
	forwardImportRuleValidationRegExp: forwardImportRuleValidationRegExp,
	forwardRuleClosingBraceRegExp: forwardRuleClosingBraceRegExp,
	forwardRuleSemicolonAndOpeningBraceRegExp: forwardRuleSemicolonAndOpeningBraceRegExp,
	
	// Selector validation patterns
	cssCustomIdentifierRegExp: cssCustomIdentifierRegExp,
	startsWithCombinatorRegExp: startsWithCombinatorRegExp,
	atPageRuleSelectorRegExp: atPageRuleSelectorRegExp,
	
	// Parsing patterns used in CSSImportRule
	layerRegExp: layerRegExp,
	layerRuleNameRegExp: layerRuleNameRegExp,
	doubleOrMoreSpacesRegExp: doubleOrMoreSpacesRegExp,
	
	// Escape sequence and identifier patterns
	startsWithHexEscapeRegExp: startsWithHexEscapeRegExp,
	identStartCharRegExp: identStartCharRegExp,
	identCharRegExp: identCharRegExp,
	specialCharsNeedEscapeRegExp: specialCharsNeedEscapeRegExp,
	combinatorOrSeparatorRegExp: combinatorOrSeparatorRegExp,
	afterHexEscapeSeparatorRegExp: afterHexEscapeSeparatorRegExp,
	trailingSpaceSeparatorRegExp: trailingSpaceSeparatorRegExp,
	endsWithHexEscapeRegExp: endsWithHexEscapeRegExp,

    // Basic style property value validation
    basicStylePropertyValueValidationRegExp: basicStylePropertyValueValidationRegExp
};

//.CommonJS
exports.regexPatterns = regexPatterns;
///CommonJS
