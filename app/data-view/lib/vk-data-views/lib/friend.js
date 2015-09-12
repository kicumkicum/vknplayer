var dataViews = require('../');



/**
 * vknp.models.Friend
 * @param {Friend} data
 * @constructor
 */
var Friend = function(data) {
	goog.base(this, data);
};
goog.inherits(Friend, dataViews.Abstract);


/**
 * @return {Promise.<Array.<dataViews.Playlists>>}
 */
Friend.prototype.getChild = function() {
	var playlists = [];
	return app.api.vk
		.getAudio(this._data.id, 300)
		.then(function(tracks) {
			playlists.push(new dataViews.Playlist(tracks));
		}.bind(this))
		.then(function() {
			return app.api.vk.getAudioAlbums(this._data.id, 100);
		}.bind(this))
		.then(function(albums) {
			return playlists.concat(albums.map(function(album) {
				return new dataViews.Playlist(album);
			}));
		});
};


/**
 * @inheritDoc
 */
Friend.prototype.toString = function() {
	return this._data.firstName + ' ' + this._data.lastName;
};


/**
 * @type {Friend}
 */
Friend.prototype._data;


module.exports = Friend;
