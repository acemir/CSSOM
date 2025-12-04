//.CommonJS
var cssstyle = require("cssstyle");
var CSSOM = require('./CSSOM.js');
///CommonJS

/**
 * @constructor
 * @see https://drafts.csswg.org/cssom/#cssstyleproperties
 */
CSSOM.CSSStyleProperties = function CSSStyleProperties(globalObject, parentRule) {
  this._style = new cssstyle.CSSStyleDeclaration(globalObject, {
    context: parentRule
  });
};

CSSOM.CSSStyleProperties.prototype = {

  constructor: CSSOM.CSSStyleProperties,

  /**
   *
   * @param {string} name
   * @see https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-getpropertyvalue
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set.
   */
  getPropertyValue: function(name) {
    return this._style.getPropertyValue(name) || "";
  },

  /**
   *
   * @param {string} name
   * @param {string} value
   * @param {string} [priority=null] "important" or null
   * @see https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty
   */
  setProperty: function(name, value, priority) {
    this._style.setProperty(name, value, priority);
  },

  /**
   *
   * @param {string} name
   * @see https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-removeproperty
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
   */
  removeProperty: function(name) {
    return this._style.removeProperty(name);
  },

  /**
   *
   * @param {String} name
   */
  getPropertyPriority: function(name) {
    return this._style.getPropertyPriority(name) || "";
  },

  get cssText() {
    return this._style.cssText;
  },

  set cssText(text) {
    this._style.cssText = text;
  },

  get length() {
    return this._style.length;
  },

  item(i) {
    return this._style.item(i);
  }
};

for (const property of cssstyle.propertyNames) {
  Object.defineProperty(CSSOM.CSSStyleProperties.prototype, property, {
    get() {
      return this.getPropertyValue(property);
    },
    set(value) {
      if (typeof value === "string") {
        this.setProperty(property, value, "");
      }
    },
  });
}

//.CommonJS
exports.CSSStyleProperties = CSSOM.CSSStyleProperties;
///CommonJS
