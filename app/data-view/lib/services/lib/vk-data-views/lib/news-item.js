var dataViews = require('../');



/**
 *
 * @constructor
 */
var NewsItem = function() {};
goog.inherits(NewsItem, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
NewsItem.prototype.getChild = function() {};


/**
 * @return {string}
 */
NewsItem.prototype.toString = function() {};


module.exports = NewsItem;
