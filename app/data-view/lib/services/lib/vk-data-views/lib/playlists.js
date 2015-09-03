var dataViews = require('../');



/**
 *
 * @constructor
 */
var Playlists = function() {};
goog.inherits(Playlists, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Playlists.prototype.getChild = function() {};


/**
 * @return {string}
 */
Playlists.prototype.toString = function() {};


module.exports = Playlists;
