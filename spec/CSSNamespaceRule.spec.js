describe('CSSOM', function() {
    describe('CSSNamespaceRule', function() {
        given('@namespace url("http://www.w3.org/1999/xhtml");', function(cssText) {
            var rule = new CSSOM.CSSNamespaceRule;
            rule.cssText = cssText;
            expect(rule.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
        });
    });
});
