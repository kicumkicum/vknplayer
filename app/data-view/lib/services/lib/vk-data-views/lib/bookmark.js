var dataViews = require('../');



/**
 *
 * @constructor
 */
var Bookmark = function() {};
goog.inherits(Bookmark, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Bookmark.prototype.getChilds = function() {};


/**
 * @return {string}
 */
Bookmark.prototype.toString = function() {};


module.exports = Bookmark;
