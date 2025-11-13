// CSSOM.js
// A namespace object shared by all models and the parser.
var CSSOM = {};

/**
* Placeholder for the parser function.
* This will be overwritten by parse.js upon initialization.
*/
CSSOM.parse = function() {
  throw new Error("Parser not yet registered. Ensure parse.js is loaded after all models.");
};

module.exports = CSSOM;
