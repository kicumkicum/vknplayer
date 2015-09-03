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
Bookmarks.prototype.getChild = function() {};


/**
 * @return {string}
 */
Bookmarks.prototype.toString = function() {};


module.exports = Bookmarks;
