var dataViews = require('../');



/**
 * @param {Group} group
 * @constructor
 */
var Group = function(group) {
	this._data = group;
};
goog.inherits(Group, dataViews.Abstract);


/**
 * @return {Promise.<Array.<dataViews.Playlist>>}
 */
Group.prototype.getChild = function() {
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
Group.prototype.toString = function() {
	return this._data.name;
};


/**
 * @type {Group}
 */
Group.prototype._data;


module.exports = Group;
