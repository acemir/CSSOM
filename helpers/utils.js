/**
 * Shared utilities for CSSOM object inspection and comparison
 */

/**
 * Check if an object has a getter for the given property in its prototype chain
 * @param {Object} object
 * @param {string} property
 * @return {boolean}
 */
function hasPrototypeGetter(object, property) {
	var obj = object;
	while (obj) {
		var descriptor = Object.getOwnPropertyDescriptor(obj, property);
		if (descriptor && typeof descriptor.get === 'function') {
			return true;
		}
		obj = Object.getPrototypeOf(obj);
	}
	return false;
}

/**
 * Get object keys including prototype getters for CSSOM objects
 * @param {Object} object
 * @return {Array<string>}
 */
function getObjectKeysWithGetters(object) {
	var keys = Object.keys(object);
	
	// Filter out specific __ prefixed properties that have getter equivalents
	var hiddenProperties = [
		'__conditionText',
		'__href',
		'__layerName',
		'__media',
		'__namespaceURI',
		'__parentRule',
		'__parentStyleSheet',
		'__prefix',
		'__selectorText',
		'__style',
		'__styleSheet',
		'__supportsText'
	];
	keys = keys.filter(function(key) {
		return hiddenProperties.indexOf(key) === -1;
	});
	
	// Add prototype getters for CSSOM objects
	var prototypeGetters = [
		'conditionText',
		'containerName',
		'containerQuery',
		'end',
		'href',
		'layerName',
		'media',
		'namespaceURI',
		'parentRule',
		'parentStyleSheet',
		'prefix',
		'selectorText',
		'start',
		'style',
		'styleSheet',
		'supportsText'
	];
	for (var i = 0; i < prototypeGetters.length; i++) {
		var prop = prototypeGetters[i];
		// Check if the property exists as a getter on the prototype chain
		// and if it's not already in the own properties
		if (keys.indexOf(prop) === -1 && hasPrototypeGetter(object, prop)) {
			keys.push(prop);
		}
	}
	
	return keys;
}

/**
 * Materialize prototype getters as own properties for comparison
 * @param {Object} object
 * @param {Array} stack - Track visited objects to avoid infinite recursion
 */
function materializeGetters(object, stack) {
	if (!object || typeof object !== 'object') {
		return;
	}
	
	// Initialize stack if not provided
	if (!stack) {
		stack = [];
	}
	
	// Check if we've already visited this object (circular reference)
	if (stack.indexOf(object) !== -1) {
		return;
	}
	
	// Add current object to stack
	stack.push(object);
	
	var prototypeGetters = [
		'conditionText',
		'containerName',
		'containerQuery',
		'end',
		'href',
		'layerName',
		'media',
		'namespaceURI',
		'parentRule',
		'parentStyleSheet',
		'prefix',
		'selectorText',
		'start',
		'style',
		'styleSheet',
		'supportsText'
	];
	for (var i = 0; i < prototypeGetters.length; i++) {
		var prop = prototypeGetters[i];
		if (!object.hasOwnProperty(prop) && hasPrototypeGetter(object, prop)) {
			try {
				var value = object[prop]; // Get the value from the getter
				Object.defineProperty(object, prop, {
					value: value,
					writable: true,
					enumerable: true,
					configurable: true
				});
			} catch (e) {
				// Ignore errors if property can't be accessed
			}
		}
	}
	
	// Recursively materialize getters in nested objects
	var keys = Object.keys(object);
	for (var j = 0; j < keys.length; j++) {
		var key = keys[j];
		var value = object[key];
		if (value && typeof value === 'object') {
			if (Array.isArray(value)) {
				for (var k = 0; k < value.length; k++) {
					materializeGetters(value[k], stack);
				}
			} else {
				materializeGetters(value, stack);
			}
		}
	}
	
	// Remove current object from stack
	stack.pop();
}

/**
 * buildPath(2) -> '../..'
 * @param {number} level
 * @return {string}
 */
function buildPath(level) {
	if (level === 0) {
		return '.';
	} else {
		var result = '..';
		for (var i = 1; i < level; i++) {
			result += '/..';
		}
		return result;
	}
}

/**
 * @param {Object} object
 * @return {Object}
 */
function uncircularOwnProperties(object) {
	function _uncircular(object, depth, stack) {
		var stackLength = stack.push(object);
		depth++;
		var keys = Object.keys(object);
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			var value = object[key];
			if (value && typeof value === 'object') {
				var level = stack.indexOf(value);
				if (level !== -1) {
					object[key] = buildPath(depth - level - 1);
				} else {
					_uncircular(value, depth, stack);
					stack.length = stackLength;
				}
			}
		}
	}
	_uncircular(object, 0, []);
	return object;
}

// Export for CommonJS/Node.js environments
if (typeof exports !== 'undefined') {
	exports.hasPrototypeGetter = hasPrototypeGetter;
	exports.getObjectKeysWithGetters = getObjectKeysWithGetters;
	exports.materializeGetters = materializeGetters;
	exports.uncircularOwnProperties = uncircularOwnProperties;
	exports.buildPath = buildPath;
}