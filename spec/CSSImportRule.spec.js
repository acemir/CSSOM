describe('CSSOM', function() {
describe('CSSImportRule', function() {

	given('@import ""', function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.styleSheet).toBeDefined();
		expect(rule.styleSheet.__constructed).toBe(false);
	});

	given('@import url(button.css);', function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.href).toBe('button.css');
		expect([].join.call(rule.media, ', ')).toBe('');
	});

	given('@import url("button.css");', function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.href).toBe('button.css');
		expect([].join.call(rule.media, ', ')).toBe('');
	});

	given("@import url('button.css');", function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.href).toBe('button.css');
		expect([].join.call(rule.media, ', ')).toBe('');
	});

	given('@import "button.css";', function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.href).toBe('button.css');
		expect([].join.call(rule.media, ', ')).toBe('');
	});

	given("@import 'button.css';", function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.href).toBe('button.css');
		expect([].join.call(rule.media, ', ')).toBe('');
	});

	given('@import url(size/medium.css) all;', function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.href).toBe('size/medium.css');
		expect([].join.call(rule.media, ', ')).toBe("all");
		expect(rule.media.mediaText).toBe("all");
	});

	given('@import url(old.css) screen and (color), projection and (min-color: 256);', function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.href).toBe('old.css');
		expect([].join.call(rule.media, ', ')).toBe('screen and (color), projection and (min-color: 256)');
		expect(rule.media.mediaText).toBe('screen and (color), projection and (min-color: 256)');
	});

	given('@import "http:::bar";', function(cssText) {
		var sheet = CSSOM.parse(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];
		expect(rule.href).toBe('http:::bar');
	});
});
});
