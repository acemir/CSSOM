var __globalObject = null;

var CSSOM = {
    setup: function(opts) {
        if (opts.globalObject) {
            __globalObject = opts.globalObject;
        }
    },
    getGlobalObject: function() {
        return __globalObject;
    }
};

//.CommonJS
exports.setup = CSSOM.setup;
exports.getGlobalObject = CSSOM.getGlobalObject;
///CommonJS

