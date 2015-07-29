var Album = require('./album');
var Artist = require('./artist');
var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Track = function(data) {
	/** @type {yandexMusicModels.Album} */
	this.album = new Album(data['album']);

	/** @type {Array.<yandexMusicModels.Album>} */
	this.albums = (data['albums']['results'] || []).map(function(album) {
		return new Album(album);
	});

	/** @type {Array.<yandexMusicModels.Artist>} */
	this.artists = (data['artists']['results'] || []).map(function(artist) {
		return new Artist(artist);
	});

	/** @type {boolean} */
	this.available = data['available'];

	/** @type {Array.<Track>|undefined} */
	this.duplicates = (data['duplicates'] || []).map(function(duplicat) {
		return new Track(duplicat);
	});

	/** @type {number} */
	this.durationMillis = data['durationMillis'];

	/** @type {number} */
	this.durationMs = data['durationMs'];

	/** @type {boolean} */
	this.explicit = data['explicit'];

	/** @type {number} */
	this.id = data['id'];

	/** @type {Array.<string>} */
	this.regions = data['regions'];

	/** @type {string} */
	this.storageDir = data['storageDir'];

	/** @type {string} */
	this.title = data['title'];
};


/**
 * @return {Promise.<string>}
 */
Track.prototype.getUrl = function() {
	return app.api.yandexMusic.getTrackUrl(this);
};


module.exports = Track;
