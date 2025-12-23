describe('CSSOM', function() {
    describe('CSSPropertyRule', function() {

        given('@property --my-color {\n  syntax: "<color>";\n  inherits: false;\n  initial-value: #c0ffee;\n}', function(cssText) {
            var sheet = new CSSOM.CSSStyleSheet
            sheet.replaceSync(cssText);
            expect(sheet.cssRules.length).toBe(1);
            var rule = sheet.cssRules[0];

            expect(rule.name).toBe('--my-color');
            expect(rule.syntax).toBe('<color>');
            expect(rule.inherits).toBe(false);
            expect(rule.initialValue).toBe('#c0ffee');
            expect(rule.type).toBe(0);
            // Removes line breaks
            expect(rule.cssText).toBe('@property --my-color { syntax: "<color>"; inherits: false; initial-value: #c0ffee; }');
        });

        given('@property --valid {\n  initial-value: 0;\n  inherits: true;\n  syntax: "*";\n}', function(cssText) {
            var sheet = new CSSOM.CSSStyleSheet
            sheet.replaceSync(cssText);
            expect(sheet.cssRules.length).toBe(1);
            var rule = sheet.cssRules[0];

            expect(rule.name).toBe('--valid');
            expect(rule.syntax).toBe('*');
            expect(rule.inherits).toBe(true);
            expect(rule.initialValue).toBe('0');

            expect(rule.cssText).toBe('@property --valid { syntax: "*"; inherits: true; initial-value: 0; }');
        });

        describe('invalid @property rules', function() {
            given('@property { }', function(cssText) {
                var sheet = new CSSOM.CSSStyleSheet
                sheet.replaceSync(cssText);
                // Should not be added because name is empty
                expect(sheet.cssRules.length).toBe(0);
            });

            given('@property invalid-name {\n  syntax: "*";\n  inherits: true;\n}', function(cssText) {
                var sheet = new CSSOM.CSSStyleSheet
                sheet.replaceSync(cssText);
                // Should not be added because name doesn't start with --
                expect(sheet.cssRules.length).toBe(0);
            });

            given('@property --missing-syntax {\n  inherits: true;\n  initial-value: 0;\n}', function(cssText) {
                var sheet = new CSSOM.CSSStyleSheet
                sheet.replaceSync(cssText);
                // Should not be added because syntax descriptor is required
                expect(sheet.cssRules.length).toBe(0);
            });

            given('@property --empty-syntax {\n  syntax: "";\n  inherits: true;\n  initial-value: 0;\n}', function(cssText) {
                var sheet = new CSSOM.CSSStyleSheet
                sheet.replaceSync(cssText);
                // Should not be added because syntax cannot be empty
                expect(sheet.cssRules.length).toBe(0);
            });

            given('@property --missing-inherits {\n  syntax: "*";\n  initial-value: 0;\n}', function(cssText) {
                var sheet = new CSSOM.CSSStyleSheet
                sheet.replaceSync(cssText);
                // Should not be added because inherits descriptor is required
                expect(sheet.cssRules.length).toBe(0);
            });

            given('@property --missing-initial-value {\n  syntax: "<color>";\n  inherits: true;\n}', function(cssText) {
                var sheet = new CSSOM.CSSStyleSheet
                sheet.replaceSync(cssText);
                // Should not be added because initial-value is required when syntax is not "*"
                expect(sheet.cssRules.length).toBe(0);
            });

            given('@property --universal-syntax-no-initial {\n  syntax: "*";\n  inherits: false;\n}', function(cssText) {
                var sheet = new CSSOM.CSSStyleSheet
                sheet.replaceSync(cssText);
                // Should be added because initial-value is optional when syntax is "*"
                expect(sheet.cssRules.length).toBe(1);
                var rule = sheet.cssRules[0];
                expect(rule.name).toBe('--universal-syntax-no-initial');
                expect(rule.syntax).toBe('*');
                expect(rule.inherits).toBe(false);
                expect(rule.initialValue).toBe(null);
            });
        });
    });
});
