var dataViews = require('../');



/**
 * @param {Playlists} group
 * @constructor
 */
var Playlists = function(group) {
	goog.base(this, group);
};
goog.inherits(Playlists, dataViews.Abstract);


/**
 * @return {Promise.<Array.<dataViews.Playlist>>}
 */
Playlists.prototype.getChildren = function() {
	return app.api.vk
		.getAudioAlbums(null, 100)
		.then(function(albums) {
			return albums.map(function(album) {
				return new dataViews.Playlist(album);
			});
		});
};


/**
 * @inheritDoc
 */
Playlists.prototype.toString = function() {
	return 'Playlists';
};


/**
 * @type {Playlists}
 */
Playlists.prototype._data;


module.exports = Playlists;
