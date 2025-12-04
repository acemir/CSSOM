describe('CSSOM', function() {
    describe('CSSCounterStyleRule', function() {

        given('@counter-style foo {\n  system: cyclic;\n  symbols: ‣;\n  suffix: " ";\n}', function(cssText) {
            var sheet = new CSSOM.CSSStyleSheet
            sheet.replaceSync(cssText);
            expect(sheet.cssRules.length).toBe(1);
            var rule = sheet.cssRules[0];

            expect(rule.name).toBe('foo');
            // Removes line breaks
            expect(rule.cssText).toBe('@counter-style foo { system: cyclic; symbols: ‣; suffix: " "; }');

            rule.name = 'bar';

            expect(rule.cssText).toBe('@counter-style bar { system: cyclic; symbols: ‣; suffix: " "; }');
        });
    });
});