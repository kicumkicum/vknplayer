var dataViews = require('../');



/**
 * vknp.models.Friend
 * @param {Friend} data
 * @constructor
 */
var Friend = function(data) {
	this._data = data;
};
goog.inherits(Friend, dataViews.Abstract);


/**
 * @return {Promise.<Array.<dataViews.Playlists>>}
 */
Friend.prototype.getChild = function() {
	return app.api.vk
		.getAudioAlbums(this._data.id, 100)
		.then(function(albums) {
			return albums.map(function(album) {
				return new dataViews.Playlist(album);
			});
		});
};


/**
 * @return {string}
 */
Friend.prototype.toString = function() {
	return 'Friends';
};


/**
 * @type {Friend}
 */
Friend.prototype._data;


module.exports = Friend;
