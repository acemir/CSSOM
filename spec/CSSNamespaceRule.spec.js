describe('CSSOM', function() {
    describe('CSSNamespaceRule', function() {
        given('@namespace url("http://www.w3.org/1999/xhtml");', function(cssText) {
            var rule = new CSSOM.CSSNamespaceRule;
            rule.cssText = cssText;
            expect(rule.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
        });

        given('@namespace a url();', function(cssText) {
            var rule = new CSSOM.CSSNamespaceRule;
            rule.cssText = cssText;
            expect(rule.prefix).toBe('a');
            expect(rule.namespaceURI).toBe('');
            expect(rule.cssText).toBe('@namespace a url();');
        });

        given('@namespace url();', function(cssText) {
            var rule = new CSSOM.CSSNamespaceRule;
            rule.cssText = cssText;
            expect(rule.prefix).toBe('');
            expect(rule.namespaceURI).toBe('');
            expect(rule.cssText).toBe('@namespace url();');
        });

        given('@namespace url(http://example.com);', function(cssText) {
            var rule = new CSSOM.CSSNamespaceRule;
            rule.cssText = cssText;
            expect(rule.prefix).toBe('');
            expect(rule.namespaceURI).toBe('http://example.com');
            expect(rule.cssText).toBe('@namespace url(http://example.com);');
        });

        given('@namespace a url(http://example.com);', function(cssText) {
            var rule = new CSSOM.CSSNamespaceRule;
            rule.cssText = cssText;
            expect(rule.prefix).toBe('a');
            expect(rule.namespaceURI).toBe('http://example.com');
            expect(rule.cssText).toBe('@namespace a url(http://example.com);');
        });
    });
});
