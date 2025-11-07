//.CommonJS
var CSSOM = {
	MediaList: require("./MediaList").MediaList
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-stylesheet-interface
 */
CSSOM.StyleSheet = function StyleSheet() {
	this.__media = new CSSOM.MediaList();
	this.__parentStyleSheet = null;
};

Object.defineProperties(CSSOM.StyleSheet.prototype, {
	media: {
		get: function() {
			return this.__media;
		},
		set: function(value) {
			if (typeof value === "string") {
				this.__media.mediaText = value;
			} else {
				this.__media = value;
			}
		}
	},
	parentStyleSheet: {
		get: function() {
			return this.__parentStyleSheet;
		}
	}
});

//.CommonJS
exports.StyleSheet = CSSOM.StyleSheet;
///CommonJS
