describe('CSSOM', function() {
describe('CSSStyleDeclaration', function() {

	it('setProperty, removeProperty, cssText, getPropertyValue, getPropertyPriority', function() {
		var d = new CSSOM.CSSStyleDeclaration;

		d.setProperty('color', 'purple');
		expect(d).toEqualOwnProperties({
			0: 'color',
			length: 1,
			parentRule: null,
			color: 'purple',
			_importants: {
				color: undefined
			}
		});

		d.setProperty('width', '128px', 'important');
		expect(d).toEqualOwnProperties({
			0: 'color',
			1: 'width',
			length: 2,
			parentRule: null,
			color: 'purple',
			width: '128px',
			_importants: {
				color: undefined,
				width: 'important'
			}
		});

		d.setProperty('opacity', 0);

		expect(d.cssText).toBe('color: purple; width: 128px !important; opacity: 0;');

		expect(d.getPropertyValue('color')).toBe('purple');
		expect(d.getPropertyValue('width')).toBe('128px');
		expect(d.getPropertyValue('opacity')).toBe('0');
		expect(d.getPropertyValue('position')).toBe('');

		expect(d.getPropertyPriority('color')).toBe('');
		expect(d.getPropertyPriority('width')).toBe('important');
		expect(d.getPropertyPriority('position')).toBe('');

		d.setProperty('color', 'green');
		d.removeProperty('width');
		d.removeProperty('opacity');

		expect(d.cssText).toBe('color: green;');
	});

	it ('setProperty with invalid value', function() {
		var d = new CSSOM.CSSStyleDeclaration;
		var parseErrors = [];
		var parseErrorHandler = function(e) {
			parseErrors.push(e);
		}

		d.setProperty('color', 'pink :', undefined, parseErrorHandler);
		expect(d).toEqualOwnProperties({
			length: 0,
			parentRule: null,
			_importants: {}
		});
		expect(parseErrors.length).toBe(1);
	});

	it('does not allow overwriting the length property to cause an OOM error', function() {
		// Without the setProperty guard, 'length' becomes the loop limit used by cssText.
		// Let's run the script in a child process so an OOM cannot kill the test run.
		if (typeof process !== 'undefined' && process.versions && process.versions.node) {
			var script =
				'var CSSOM = require(' + JSON.stringify(require.resolve('../lib/index')) + ');' +
				'var style = CSSOM.parse("a{length:2000000000}").cssRules[0].style;' +
				'if (style.length !== 0 || style.cssText !== "") process.exit(1);';

			var childProcess = require('child_process');
			var result = childProcess.spawnSync(process.execPath, ['--max-old-space-size=32', '-e', script], {
				timeout: 5000,
				maxBuffer: 65536
			});

			expect(result.status).toBe(0);
		} else {
			// Cannot properly test for OOM in the browser.
			// Let's simply test the 'length' property is not overwritten.
			var style = CSSOM.parse('a{length:2}').cssRules[0].style;
			expect(style.length).toBe(0);
			expect(style.cssText).toBe('');
		}
	});

	it('ignores declaration names that collide with internal properties', function() {
		// CSS declaration names are assigned directly to the style object, so a name such as
		// parentRule, setProperty, or cssText can change how the rest of the rule is parsed.
		// Without the setProperty guard, cssText is added to the indexed list and serialization
		// recurses until RangeError.
		var sheet = CSSOM.parse('a{length:2;parentRule:x;_importants:y;cssText:z;setProperty:q;__proto__:s;__starts:0;color:red}');
		var d = sheet.cssRules[0].style;
		expect(d.length).toBe(1);
		expect(d[0]).toBe('color');
		expect(d.parentRule).toBe(sheet.cssRules[0]);
		expect(typeof d.setProperty).toBe('function');
		expect(d.cssText).toBe('color: red;');
		expect(CSSOM.clone(sheet).cssRules[0].style.cssText).toBe(d.cssText);

		// Index 0 stores 'color', so writing a property named '0' would replace
		// that name with its value and leave the declaration list inconsistent
		d.setProperty('0', 'bad');
		d.setProperty('constructor', 'bad');
		d.setProperty('toString', 'bad');
		expect(d.length).toBe(1);
		expect(d.cssText).toBe('color: red;');

		d.cssText = 'length: 2; width: 3px;';
		expect(d.cssText).toBe('width: 3px;');

		// A caller can change the indexed name without using setProperty.
		// Cloning must ignore it instead of copying 'length' onto itself.
		d[0] = 'length';
		expect(CSSOM.clone(sheet).cssRules[0].style.length).toBe(0);
	});

	it('preserves direct access to non-reserved properties', function() {
		// Dumb test to ensure direct assignment and setProperty work for a non-reserved property
		var d = new CSSOM.CSSStyleDeclaration;
		d.color = 'red';
		expect(d.color).toBe('red');
		expect(d.getPropertyValue('color')).toBe('red');

		d.setProperty('color', 'blue');
		expect(d.cssText).toBe('color: blue;');
	});

	given('color: pink; outline: 2px solid red;', function(cssText) {
		var d = new CSSOM.CSSStyleDeclaration;
		d.cssText = cssText;
		expect(d.cssText).toBe(cssText);
	});

});
});
