describe('CSSOM', function() {
	describe('CSSGroupingRule', function() {
		
		it('insertRule, deleteRule', function() {
			var rule = new CSSOM.CSSGroupingRule;
			expect(rule.cssRules).toEqual([]);

			rule.insertRule("a {color: blue}", 0);
			expect(rule.cssRules.length).toBe(1);

			rule.insertRule("a *:first-child, a img {border: none}", 1);
			expect(rule.cssRules.length).toBe(2);

			rule.deleteRule(1);
			expect(rule.cssRules.length).toBe(1);

			rule.deleteRule(0);
			expect(rule.cssRules).toEqual([]);
		});

		describe('insertRule', function () {
			it('should correctly set the parent rule', function () {
				var rule = new CSSOM.CSSGroupingRule;
				rule.insertRule("a {color: blue}", 0);
				expect(rule.cssRules[0].__parentRule).toBe(rule);
			});

			it('should insert in index 0 by default', function () {
				var rule = new CSSOM.CSSGroupingRule;
				rule.insertRule("a {color: blue}", 0);

				var insertedIndex = rule.insertRule("b {color: black;}");
				expect(insertedIndex).toEqual(0);
				expect(rule.cssRules[0].cssText).toEqual("b { color: black; }");
			});

			it('should throw error on invalid rule input', function () {
				var rule = new CSSOM.CSSGroupingRule;

				expect(function() {
					rule.insertRule("@invalid { this is not valid css }");
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule '@invalid { this is not valid css }'.");
				expect(function() {
					rule.insertRule(true);
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule 'true'.");
				expect(function() {
					rule.insertRule(1);
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule '1'.");
				expect(function() {
					rule.insertRule({});
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule '[object Object]'.");
				expect(function() {
					rule.insertRule([]);
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule ''.");

				expect(rule.cssRules.length).toBe(0);
			});

			it('should throw error on multiple rules', function () {
				var rule = new CSSOM.CSSGroupingRule;

				expect(function() {
					rule.insertRule("a {} b {}");
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule 'a {} b {}'.");

				expect(rule.cssRules.length).toBe(0);
			});

			it('should throw error on empty rule', function () {
				var rule = new CSSOM.CSSGroupingRule;

				expect(function() {
					rule.insertRule();
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': 1 argument required, but only 0 present.");
				expect(function() {
					rule.insertRule("");
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule ''.");
				expect(function() {
					rule.insertRule(undefined, 0);
				}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule 'undefined'.");

				expect(rule.cssRules.length).toBe(0);
			});

			it('should throw error on invalid index', function () {
				var rule = new CSSOM.CSSGroupingRule;

				expect(function() {
					rule.insertRule("a {color: blue}", -1);
				}).toThrow("INDEX_SIZE_ERR");
				expect(function() {
					rule.insertRule("a {color: blue}", 1);
				}).toThrow("INDEX_SIZE_ERR");

				expect(rule.cssRules.length).toBe(0);
			});

			describe('rule restriction edge cases', function () {
				it('should throw error when inserting @import rules', function () {
					var rule = new CSSOM.CSSGroupingRule;
					
					expect(function() {
						rule.insertRule("@import url('test.css');", 0);
					}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': '@import' rules cannot be inserted inside a group rule.");
				});

				it('should throw error when inserting @namespace rules', function () {
					var rule = new CSSOM.CSSGroupingRule;
					
					expect(function() {
						rule.insertRule("@namespace svg url('http://www.w3.org/2000/svg');", 0);
					}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': '@namespace' rules cannot be inserted inside a group rule.");
				});

				it('should throw error when inserting @layer statement rules', function () {
					var rule = new CSSOM.CSSGroupingRule;
					
					expect(function() {
						rule.insertRule("@layer base;", 0);
					}).toThrow("Failed to execute 'insertRule' on 'CSSGroupingRule': Failed to parse the rule '@layer base;'.");
				});

				it('should allow regular style rules', function () {
					var rule = new CSSOM.CSSGroupingRule;
					
					rule.insertRule("body { margin: 0; }", 0);
					rule.insertRule("h1 { color: red; }", 1);
					rule.insertRule("p { font-size: 14px; }", 2);
					
					expect(rule.cssRules.length).toBe(3);
					expect(rule.cssRules[0].selectorText).toBe("body");
					expect(rule.cssRules[1].selectorText).toBe("h1");
					expect(rule.cssRules[2].selectorText).toBe("p");
				});

				it('should allow nested grouping rules like @media', function () {
					var rule = new CSSOM.CSSGroupingRule;
					
					rule.insertRule("@media screen { body { color: black; } }", 0);
					expect(rule.cssRules.length).toBe(1);
					expect(rule.cssRules[0].constructor.name).toBe("CSSMediaRule");
				});

				it('should allow @supports rules', function () {
					var rule = new CSSOM.CSSGroupingRule;
					
					rule.insertRule("@supports (display: grid) { .grid { display: grid; } }", 0);
					expect(rule.cssRules.length).toBe(1);
					expect(rule.cssRules[0].constructor.name).toBe("CSSSupportsRule");
				});

				it('should allow @keyframes rules', function () {
					var rule = new CSSOM.CSSGroupingRule;
					
					rule.insertRule("@keyframes slide { from { left: 0; } to { left: 100px; } }", 0);
					expect(rule.cssRules.length).toBe(1);
					expect(rule.cssRules[0].constructor.name).toBe("CSSKeyframesRule");
				});
			});
		});

		describe('deleteRule', function () {
			it('should throw error on missing arguments', function () {
				var rule = new CSSOM.CSSGroupingRule;
				expect(function() {
					rule.deleteRule();
				}).toThrow("Failed to execute 'deleteRule' on 'CSSGroupingRule': 1 argument required, but only 0 present.");
			});

			it('should throw error on invalid index', function () {
				var rule = new CSSOM.CSSGroupingRule;
				
				expect(function() {
					rule.deleteRule(0);
				}).toThrow("Failed to execute 'deleteRule' on 'CSSGroupingRule': The index provided (0) is larger than the maximum index (0).");
				expect(function() {
					rule.deleteRule(-1);
				}).toThrow("Failed to execute 'deleteRule' on 'CSSGroupingRule': The index provided (4294967295) is larger than the maximum index (0).");

				expect(rule.cssRules.length).toBe(0);
			});

			it('should correctly remove parent rule reference', function () {
				var rule = new CSSOM.CSSGroupingRule;
				rule.insertRule("a {color: blue}", 0);
				
				var childRule = rule.cssRules[0];
				expect(childRule.__parentRule).toBe(rule);
				
				rule.deleteRule(0);
				expect(childRule.__parentRule).toBe(null);
				expect(rule.cssRules.length).toBe(0);
			});

			it('should correctly delete from middle of rules list', function () {
				var rule = new CSSOM.CSSGroupingRule;
				rule.insertRule("a {color: blue}", 0);
				rule.insertRule("b {color: red}", 1);
				rule.insertRule("c {color: green}", 2);
				
				expect(rule.cssRules.length).toBe(3);
				expect(rule.cssRules[1].selectorText).toBe("b");
				
				rule.deleteRule(1);
				expect(rule.cssRules.length).toBe(2);
				expect(rule.cssRules[0].selectorText).toBe("a");
				expect(rule.cssRules[1].selectorText).toBe("c");
			});
		});

		describe('cssRules array behavior', function () {
			it('should maintain cssRules as an array', function () {
				var rule = new CSSOM.CSSGroupingRule;
				expect(Array.isArray(rule.cssRules)).toBe(true);
				expect(rule.cssRules.length).toBe(0);
			});

			it('should update cssRules length correctly', function () {
				var rule = new CSSOM.CSSGroupingRule;
				
				rule.insertRule("a {color: blue}", 0);
				expect(rule.cssRules.length).toBe(1);
				
				rule.insertRule("b {color: red}", 1);
				expect(rule.cssRules.length).toBe(2);
				
				rule.deleteRule(0);
				expect(rule.cssRules.length).toBe(1);
			});

			it('should preserve rule order', function () {
				var rule = new CSSOM.CSSGroupingRule;
				
				rule.insertRule("a {color: blue}", 0);
				rule.insertRule("b {color: red}", 0);  // Insert at beginning
				rule.insertRule("c {color: green}", 2); // Insert at end
				
				expect(rule.cssRules[0].selectorText).toBe("b");
				expect(rule.cssRules[1].selectorText).toBe("a");
				expect(rule.cssRules[2].selectorText).toBe("c");
			});
		});
	});
});