var dataViews = require('../');



/**
 *
 * @constructor
 */
var News = function() {};
goog.inherits(News, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
News.prototype.getChild = function() {};


/**
 * @return {string}
 */
News.prototype.toString = function() {};


module.exports = News;
