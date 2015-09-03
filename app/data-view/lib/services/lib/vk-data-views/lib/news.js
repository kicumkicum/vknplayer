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
News.prototype.getChilds = function() {};


/**
 * @return {string}
 */
News.prototype.toString = function() {};


module.exports = News;
