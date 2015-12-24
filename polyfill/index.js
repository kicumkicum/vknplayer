/**
 * @type {Polyfill}
 */
var polyfill = {
	goog: require('./lib/goog')
};

/**
 * @typedef {{
 *      goog: {
 *          base: function,
 *          inherit: function
 *      }
 * }}
 */
var Polyfill;

module.exports = polyfill;
