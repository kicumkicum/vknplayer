var dataViews = require('../');



/**
 * @param {Playlist.Input} data
 * @constructor
 */
var Playlist = function(data) {
	goog.base(this, data);
};
goog.inherits(Playlist, dataViews.Abstract);


/**
 * @return {Promise.<Array.<AudioTrack>>}
 */
Playlist.prototype.getChild = function() {
	var promise = null;

	if (this._isAlbum()) {
		promise = app.api.vk
			.getAudio(this._data.ownerId, 300, this._data.albumId)
			.then(function(tracks) {
				return tracks.map(function(track) {
					return new vknp.models.AudioTrack(track);
				});
			});
	} else {
		promise = new vknp.Promise(function(resolve, reject) {
			var tracks = this._data.map(function(track) {
				return new vknp.models.AudioTrack(track);
			});
			resolve(tracks);
		}.bind(this));
	}

	return promise;
};


/**
 * @inheritDoc
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
