var dataViews = require('../');



/**
 *
 * @constructor
 */
var Playlist = function() {};
goog.inherits(Playlist, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Playlist.prototype.getChild = function() {};


/**
 * @return {string}
 */
Playlist.prototype.toString = function() {};


module.exports = Playlist;
