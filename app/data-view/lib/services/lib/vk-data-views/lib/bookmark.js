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
Bookmark.prototype.getChild = function() {};


/**
 * @return {string}
 */
Bookmark.prototype.toString = function() {};


module.exports = Bookmark;
