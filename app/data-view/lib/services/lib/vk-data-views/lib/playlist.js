var dataViews = require('../');



/**
 * @param {Playlist.Input} data
 * @constructor
 */
var Playlist = function(data) {
	this._data = data;
};
goog.inherits(Playlist, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Playlist.prototype.getChild = function() {
	return app.api.vk
		.getAudio(this._data.ownerId, 300, this._data.albumId)
		.then(function(tracks) {
			return tracks.map(function(track) {
				return new vknp.models.AudioTrack(track);
			});
		});
};


/**
 * @return {string}
 */
Playlist.prototype.toString = function() {
	if (this._isAlbum()) {
		return this._data.title;
	} else {
		return 'All music';
	}
};


/**
 * @return {boolean}
 * @protected
 */
Playlist.prototype._isAlbum = function() {
	return !(this._data instanceof Array);
};


/**
 * @type {Playlist.Input}
 */
Playlist.prototype._data;


/**
 * @typedef {Album|Array.<AudioTrack>}
 */
Playlist.Input;


module.exports = Playlist;
