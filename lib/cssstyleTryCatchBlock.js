//.CommonJS
var styleDeclarationProvider = require("./styleDeclarationProvider");

try {
	styleDeclarationProvider.setCSSStyleDeclaration(require("cssstyle").CSSStyleDeclaration);
} catch (e) {
	// ignore
}
///CommonJS
