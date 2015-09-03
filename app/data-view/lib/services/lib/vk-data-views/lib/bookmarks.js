var dataViews = require('../');



/**
 *
 * @constructor
 */
var Bookmarks = function() {};
goog.inherits(Bookmarks, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Bookmarks.prototype.getChilds = function() {};


/**
 * @return {string}
 */
Bookmarks.prototype.toString = function() {};


module.exports = Bookmarks;
