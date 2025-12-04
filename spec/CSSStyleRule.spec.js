describe('CSSOM', function() {
describe('CSSStyleRule', function() {

	given('h1:first-of-type {\n\tfont-size: 3em\n}', function(cssText) {
		var sheet = new CSSOM.CSSStyleSheet
		sheet.replaceSync(cssText);
		expect(sheet.cssRules.length).toBe(1);
		var rule = sheet.cssRules[0];

		expect(rule.cssText).toBe('h1:first-of-type { font-size: 3em; }');
		expect(rule.selectorText).toBe('h1:first-of-type');

		rule.selectorText = 'h1.title';
		expect(rule.selectorText).toBe('h1.title');
		expect(rule.cssText).toBe('h1.title { font-size: 3em; }');
	});

	describe('Serialzation', function() {
		it('Empty CSSNestedDeclarations', function() {
			var s = new CSSOM.CSSStyleSheet;
			s.insertRule('.a { & { } left: 1px; & { } right: 1px; }');
			var rule = s.cssRules[0];
			expect(rule.cssText).toBe('.a {\n  & { }\n  left: 1px;\n  & { }\n  right: 1px;\n}');
			for (var i = 0; i < rule.cssRules.length; i++) {
				rule.cssRules[i].style = '';
			}
			expect(rule.cssText).toBe('.a {\n  & { }\n  & { }\n}');
		});
		it('Empty CSSNestedDeclarations (nested grouping rule)', function() {
			var s = new CSSOM.CSSStyleSheet;
			s.insertRule('.a {\n  @media (width > 1px) {\n  & { }\n  left: 1px;\n  & { }\n  right: 1px;\n}\n}');
			var rule = s.cssRules[0];
			var mediaRule = s.cssRules[0].cssRules[0];
			expect(rule.cssText).toBe('.a {\n  @media (width > 1px) {\n  & { }\n  left: 1px;\n  & { }\n  right: 1px;\n}\n}');
			for (var i = 0; i < mediaRule.cssRules.length; i++) {
				mediaRule.cssRules[i].style = '';
			}
			expect(rule.cssText).toBe('.a {\n  @media (width > 1px) {\n  & { }\n  & { }\n}\n}');
		});
	});
});
});
