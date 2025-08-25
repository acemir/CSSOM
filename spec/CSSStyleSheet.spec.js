describe('CSSOM', function() {
	describe('CSSStyleSheet', function() {

		it('insertRule, deleteRule', function() {
			var s = new CSSOM.CSSStyleSheet;
			expect(s.cssRules).toEqual([]);

			s.insertRule("a {color: blue}", 0);
			expect(s.cssRules.length).toBe(1);

			s.insertRule("a *:first-child, a img {border: none}", 1);
			expect(s.cssRules.length).toBe(2);

			s.deleteRule(1);
			expect(s.cssRules.length).toBe(1);

			s.deleteRule(0);
			expect(s.cssRules).toEqual([]);
		});

		describe('insertRule', function () {
			it('should correctly set the parent stylesheet', function () {
				var s = new CSSOM.CSSStyleSheet;
				s.insertRule("a {color: blue}", 0);
				expect(s.cssRules[0].parentStyleSheet).toBe(s);
			});

			it('should insert in index 0 by default', function () {
				var s = new CSSOM.CSSStyleSheet;
				s.insertRule("a {color: blue}", 0);

				var insertedIndex = s.insertRule("b {color: black;}");
				expect(insertedIndex).toEqual(0);
				expect(s.cssRules[0].cssText).toEqual("b {color: black;}");
			});

			it('should throw error on multiple rules', function () {
				var s = new CSSOM.CSSStyleSheet;

				try {
					s.insertRule("@invalid { this is not valid css }");
				} catch(e) {
					console.error(e);
				}

				expect(function() {
					s.insertRule("@invalid { this is not valid css }");
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule '@invalid { this is not valid css }'.");
				expect(function() {
					s.insertRule(true);
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule 'true'.");
				expect(function() {
					s.insertRule(1);
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule '1'.");
				expect(function() {
					s.insertRule({});
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule '[object Object]'.");
				expect(function() {
					s.insertRule([]);
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule ''.");


				expect(s.cssRules.length).toBe(0);
			});

			it('should throw error on multiple rules', function () {
				var s = new CSSOM.CSSStyleSheet;

				expect(function() {
					s.insertRule("a {} b {}");
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule 'a {} b {}'.");

				expect(s.cssRules.length).toBe(0);
			});

			it('should throw error on empty rule', function () {
				var s = new CSSOM.CSSStyleSheet;

				expect(function() {
					s.insertRule();
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': 1 argument required, but only 0 present.");
				expect(function() {
					s.insertRule("");
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule ''.");
				expect(function() {
					s.insertRule(undefined, 0);
				}).toThrow("Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule 'undefined'.");

				expect(s.cssRules.length).toBe(0);
			});
		});

		describe('deleteRule', function () {
			it('should throw error on unreachable index', function () {
				var s = new CSSOM.CSSStyleSheet;
				expect(function() {
					s.deleteRule();
				}).toThrow("Failed to execute 'deleteRule' on 'CSSStyleSheet': 1 argument required, but only 0 present.");
				expect(function() {
					s.deleteRule(0);
				}).toThrow("Failed to execute 'deleteRule' on 'CSSStyleSheet': The index provided (0) is larger than the maximum index (0).");
				expect(function() {
					s.deleteRule(-1);
				}).toThrow("Failed to execute 'deleteRule' on 'CSSStyleSheet': The index provided (4294967295) is larger than the maximum index (0).");

				expect(s.cssRules.length).toBe(0);
			});
		});
	});
});
