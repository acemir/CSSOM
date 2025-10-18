// Utility functions for CSSOM error handling

/**
 * Gets the appropriate error constructor from the global object context.
 * Tries to find the error constructor from parentStyleSheet._globalObject,
 * then from _globalObject, then falls back to the native constructor.
 * 
 * @param {Object} context - The CSSOM object (rule, stylesheet, etc.)
 * @param {string} errorType - The error type ('TypeError', 'RangeError', 'DOMException', etc.)
 * @return {Function} The error constructor
 */
function getErrorConstructor(context, errorType) {
	// Try parentStyleSheet._globalObject first
	if (context.parentStyleSheet && context.parentStyleSheet._globalObject && context.parentStyleSheet._globalObject[errorType]) {
		return context.parentStyleSheet._globalObject[errorType];
	}
	
	// Try __parentStyleSheet (alternative naming)
	if (context.__parentStyleSheet && context.__parentStyleSheet._globalObject && context.__parentStyleSheet._globalObject[errorType]) {
		return context.__parentStyleSheet._globalObject[errorType];
	}
	
	// Try _globalObject on the context itself
	if (context._globalObject && context._globalObject[errorType]) {
		return context._globalObject[errorType];
	}
	
	// Fall back to native constructor
	return (typeof global !== 'undefined' && global[errorType]) || 
	       (typeof window !== 'undefined' && window[errorType]) || 
	       eval(errorType);
}

/**
 * Creates and throws an appropriate error with context-aware constructor.
 * 
 * @param {Object} context - The CSSOM object (rule, stylesheet, etc.)
 * @param {string} errorType - The error type ('TypeError', 'RangeError', 'DOMException', etc.)
 * @param {string} message - The error message
 * @param {string} [name] - Optional name for DOMException
 */
function throwError(context, errorType, message, name) {
	var ErrorConstructor = getErrorConstructor(context, errorType);
	var error = new ErrorConstructor(message, name);
	throw error;
}

/**
 * Throws a TypeError for missing required arguments.
 * 
 * @param {Object} context - The CSSOM object
 * @param {string} methodName - The method name (e.g., 'appendRule')
 * @param {string} objectName - The object name (e.g., 'CSSKeyframesRule')
 * @param {number} [required=1] - Number of required arguments
 * @param {number} [provided=0] - Number of provided arguments
 */
function throwMissingArguments(context, methodName, objectName, required, provided) {
	required = required || 1;
	provided = provided || 0;
	var message = "Failed to execute '" + methodName + "' on '" + objectName + "': " + 
	              required + " argument" + (required > 1 ? "s" : "") + " required, but only " + 
	              provided + " present.";
	throwError(context, 'TypeError', message);
}

/**
 * Throws a RangeError for index out of bounds.
 * 
 * @param {Object} context - The CSSOM object
 * @param {string} [message] - Optional custom message, defaults to 'INDEX_SIZE_ERR'
 */
function throwIndexSizeError(context, message) {
	throwError(context, 'RangeError', message || 'INDEX_SIZE_ERR');
}

/**
 * Throws a DOMException for parse errors.
 * 
 * @param {Object} context - The CSSOM object
 * @param {string} methodName - The method name
 * @param {string} objectName - The object name
 * @param {string} rule - The rule that failed to parse
 * @param {string} [name='SyntaxError'] - The DOMException name
 */
function throwParseError(context, methodName, objectName, rule, name) {
	var message = "Failed to execute '" + methodName + "' on '" + objectName + "': " +
	              "Failed to parse the rule '" + rule + "'.";
	throwError(context, 'DOMException', message, name || 'SyntaxError');
}

/**
 * Throws a DOMException for index errors.
 * 
 * @param {Object} context - The CSSOM object
 * @param {string} methodName - The method name
 * @param {string} objectName - The object name
 * @param {number} index - The invalid index
 * @param {number} maxIndex - The maximum valid index
 * @param {string} [name='IndexSizeError'] - The DOMException name
 */
function throwIndexError(context, methodName, objectName, index, maxIndex, name) {
	var message = "Failed to execute '" + methodName + "' on '" + objectName + "': " +
	              "The index provided (" + index + ") is larger than the maximum index (" + maxIndex + ").";
	throwError(context, 'DOMException', message, name || 'IndexSizeError');
}

var errorUtils = {
	getErrorConstructor: getErrorConstructor,
	throwError: throwError,
	throwMissingArguments: throwMissingArguments,
	throwIndexSizeError: throwIndexSizeError,
	throwParseError: throwParseError,
	throwIndexError: throwIndexError
};

//.CommonJS
exports.errorUtils = errorUtils;
///CommonJS