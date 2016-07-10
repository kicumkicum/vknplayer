var dataViews = require('../');



/**
 * @param {Group} group
 * @constructor
 */
var Group = function(group) {
	goog.base(this, group);
};
goog.inherits(Group, dataViews.Abstract);


/**
 * @return {Promise.<Array.<dataViews.Playlist>>}
 */
Group.prototype.getChildren = function() {
	return new clin.Promise(function(resolve, reject) {
		var flag = false;
		var playlists = [];

		var getAlbums = function() {
			app.api.vk
				.getAudioAlbums(this._data.id, 100)
				.then(function(albums) {
					playlists = playlists.concat(albums.map(function(album) {
						return new dataViews.Playlist(album);
					}));
					checkLoad();
				});
		}.bind(this);

		var getAllTracks = function() {
			app.api.vk
				.getAudio(this._data.id, 300)
				.then(function(tracks) {
					playlists.splice(0, 0, new dataViews.Playlist(tracks));
					checkLoad();
				})
		}.bind(this);

		var checkLoad = function() {
			if (flag) {
				resolve(playlists);
			} else {
				flag = true;
			}
		};

		getAlbums();
		getAllTracks();
	}.bind(this));
};


/**
 * @inheritDoc
 */
Group.prototype.toString = function() {
	return this._data.name;
};


/**
 * @type {Group}
 */
Group.prototype._data;


module.exports = Group;
