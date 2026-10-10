var fs = require('fs');
var path = require('path');
var vm = require('vm');
var Module = require('module');
var jasmineApi = require('./spec/vendor/jasmine/jasmine');

Object.keys(jasmineApi).forEach(function(name) {
	global[name] = jasmineApi[name];
});

global.CSSOM = require('./lib');
global.objectDiff = require('./spec/vendor/objectDiff/objectDiff');

function loadScript(filePath, moduleScoped) {
	var source = fs.readFileSync(filePath, 'utf8');

	if (moduleScoped) {
		var script = vm.runInThisContext('(function(require) {\n' + source + '\n})', {
			filename: filePath
		});

		script(Module.createRequire(filePath));
		return;
	}

	vm.runInThisContext(source, {
		filename: filePath
	});
}

loadScript(path.join(__dirname, 'spec/vendor/objectDiff/jasmine-objectDiff.js'));
loadScript(path.join(__dirname, 'helpers/utils.js'));
loadScript(path.join(__dirname, 'spec/helper.js'));

var specDirectory = path.join(__dirname, 'spec');
var ignoredSpecFiles = ['CSSProperty.spec.js'];
var specFiles = fs.readdirSync(specDirectory).filter(function(fileName) {
	return /\.spec\.js$/.test(fileName) && !ignoredSpecFiles.includes(fileName);
}).sort();

specFiles.forEach(function(fileName) {
	loadScript(path.join(specDirectory, fileName), true);
});

var failedSpecNames = {};
var reporter = new jasmineApi.jasmine.JsApiReporter();
var environment = jasmineApi.jasmine.getEnv();
environment.addReporter(reporter);
environment.addReporter({
	reportSpecResults: function(spec) {
		if (spec.results().failedCount > 0) {
			failedSpecNames[spec.id] = spec.getFullName();
		}
	},
	reportRunnerResults: function() {
		var results = reporter.results();
		var specResults = Object.keys(results).map(function(specId) {
			return {
				id: specId,
				result: results[specId]
			};
		});

		var failedResults = specResults.filter(function(result) {
			return result.result.result === 'failed';
		});

		process.stdout.write('Executed ' + specResults.length + ' specs.\n');
		process.stdout.write('- Passed: ' + (specResults.length - failedResults.length) + '\n');
		process.stdout.write('- Failed: ' + failedResults.length + '\n');

        if (failedResults.length) {
			process.stderr.write('\nFailed specs:\n');
		}

		failedResults.forEach(function(result) {
			process.stderr.write('- ' + (failedSpecNames[result.id] || result.id) + '\n');
			result.result.messages.forEach(function(message) {
				var detail = message.message || (message.trace && message.trace.stack) || message.trace || message;
				process.stderr.write('  ' + String(detail) + '\n');
			});
		});

		if (failedResults.length) {
			process.exitCode = 1;
		}
	}
});

environment.execute();
