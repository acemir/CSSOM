if (!Array.isArray) {
	Array.isArray = function(array) {
		return {}.toString.call(array) === '[object Array]';
	};
}

function byId(id) {
	return document.getElementById(id);
}

/**
 * @param {number} depth
 * @return {string}
 */
function makeIndent(depth) {
	var INDENT = '    ';
	if (depth === 1) {
		return INDENT;
	} else if (depth < 1) {
		return '';
	}

	if (depth in makeIndent.cache) {
		return makeIndent.cache[depth];
	} else {
		var result = INDENT;
		for (var i = depth; --i;) {
			result += INDENT;
		}
		makeIndent.cache[depth] = result;
		return result;
	}
}
makeIndent.cache = {};


/**
 * stringifyObjectKey('color') -> 'color'
 * stringifyObjectKey('background-color') -> '"background-color"'
 * @param {string} key
 * @return {string}
 */
function stringifyObjectKey(key) {
	return /^[a-z0-9_$]+$/i.test(key) ?
		key :
		JSON.stringify(key);
}


/**
 * Get object keys including prototype getters for CSSOM objects
 * @param {Object} object
 * @return {Array<string>}
 */
function getObjectKeys(object) {
	var keys = Object.keys(object);
	
	// Filter out specific __ prefixed properties that have getter equivalents
	var hiddenProperties = ['__parentRule', '__parentStyleSheet', '__selectorText', '__style'];
	keys = keys.filter(function(key) {
		return hiddenProperties.indexOf(key) === -1;
	});
	
	// Add prototype getters for CSSOM objects
	var prototypeGetters = ['parentRule', 'parentStyleSheet', 'selectorText', 'style'];
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
 * @param {Object} object
 * @return {DocumentFragment}
 */
function inspect(object) {

	var root = document.createDocumentFragment();
	_inspect(root, object, 0);
	return root;

	/**
	 * @param {DocumentFragment} root
	 * @param {Object} object
	 * @param {number} depth
	 */
	function _inspect(root, object, depth) {
		switch (typeof object) {
			case 'object':
				if (!object) {
					//null
					root.appendChild(document.createTextNode('null'));
					break;
				}
				depth++;
				var indent = document.createTextNode(makeIndent(depth));
				var span = document.createElement('span');
				span.textContent = ',\n';
				var comma = span;
				if (Array.isArray(object)) {
					var length = object.length;
					if (length === 0) {
						span = span.cloneNode(false);
						span.textContent = '[]';
						root.appendChild(span);
					} else {
						span = span.cloneNode(false);
						span.textContent = '[\n';
						root.appendChild(span);
						for (var i = 0; i < length; i++) {
							root.appendChild(indent.cloneNode(true));
							_inspect(root, object[i], depth);
							if (i < length - 1) {
								root.appendChild(comma.cloneNode(true));
							}
						}
						span = span.cloneNode(false);
						span.textContent = '\n' + makeIndent(depth - 1) + ']';
						root.appendChild(span);
					}
				} else {
					var keys = getObjectKeys(object);
					length = keys.length;
					if (length === 0) {
						span = span.cloneNode(false);
						span.textContent = '{}';
						root.appendChild(span);
					} else {
						span = span.cloneNode(false);
						span.textContent = '{\n';
						root.appendChild(span);
						var colon = span.cloneNode(false);
						colon.textContent = ': ';
						for (i = 0; i < length; i++) {
							var key = keys[i];
							root.appendChild(indent.cloneNode(true));
							root.appendChild(document.createTextNode(stringifyObjectKey(key)));
							root.appendChild(colon.cloneNode(true));
							_inspect(root, object[key], depth);
							if (i < length - 1) {
								root.appendChild(comma.cloneNode(true));
							}
						}
						span = span.cloneNode(false);
						span.textContent = '\n' + makeIndent(depth - 1) + '}';
						root.appendChild(span);
					}
				}
				break;

			case 'string':
				root.appendChild(document.createTextNode(JSON.stringify(object)));
				break;

			default:
				if (object) {
					root.appendChild(document.createTextNode(object.toString()));
				}
		}
	}

}


var style = byId("style");
var output = byId("output");
var serialized = byId("serialized");

function outputUpdated() {
	var value = style.value;
	if (value !== style.prevValue) {
		style.prevValue = value;
		var css = CSSOM.parse(value);
		window._last_parsed = css;
		uncircularOwnProperties(css);
		output.innerHTML = '';
		output.appendChild(inspect(css));
		serialized.innerHTML = css.toString();
	}
}

/**
 * @return {boolean} update happend or not
 */
function hashChanged() {
	var hash = location.hash;
	var splitted = hash.split("=");
	if (splitted.length < 2) {
		return false;
	}
	var name = splitted[0];
	var value = splitted[1];
	if (name === "#css") {
		style.value = decodeURIComponent(value);
		outputUpdated();
		return true;
	}
	return false;
}

window.onload = function() {
	hashChanged() || outputUpdated();
};

window.onhashchange = hashChanged;

function debounce(func, timeout) {
  if (timeout === undefined) timeout = 300;
  var timer;
  return function() {
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() { func.apply(this, args); }, timeout);
  };
}

function changed(){
	outputUpdated();
}

function updateLocation() {
	if (style.value.length < 1024) {
		location.hash = "css=" + encodeURIComponent(style.value);
	} else {
		// Huge location.hash slows down the browser :(
		location.hash = 'css_is_too_big';
	}
}

style.onkeyup = style.onpaste = debounce(function() { return changed(); });
style.onchange = debounce(function() { return updateLocation()});;
