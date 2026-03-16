//.CommonJS
var currentCSSStyleDeclaration;
///CommonJS

function getDefaultCSSStyleDeclaration() {
	return require("./CSSStyleDeclaration").CSSStyleDeclaration;
}

function getCSSStyleDeclaration() {
	return currentCSSStyleDeclaration || getDefaultCSSStyleDeclaration();
}

function setCSSStyleDeclaration(CSSStyleDeclaration) {
	if (typeof CSSStyleDeclaration !== "function") {
		throw new TypeError("CSSStyleDeclaration must be a constructor function");
	}
	currentCSSStyleDeclaration = CSSStyleDeclaration;
}

function resetCSSStyleDeclaration() {
	currentCSSStyleDeclaration = undefined;
}

//.CommonJS
exports.getCSSStyleDeclaration = getCSSStyleDeclaration;
exports.setCSSStyleDeclaration = setCSSStyleDeclaration;
exports.resetCSSStyleDeclaration = resetCSSStyleDeclaration;
///CommonJS
