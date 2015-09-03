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
Playlist.prototype.getChilds = function() {};


/**
 * @return {string}
 */
Playlist.prototype.toString = function() {};


module.exports = Playlist;
