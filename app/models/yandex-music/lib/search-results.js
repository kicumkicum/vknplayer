var Album = require('./album');
var Artist = require('./artist');



/**
 * @param {*} data
 * @constructor
 */
var SearchResults = function(data) {
	/** @type {yandexMusicModels.Album} */
	this.album = new Album(data['album']);

	/** @type {Array.<yandexMusicModels.Album>} */
	this.albums = (data['albums'] || []).map(function(album) {
		return new Album(album);
	});

	/** @type {Array.<yandexMusicModels.Artist>} */
	this.artists = (data['artists'] || []).map(function(artist) {
		return new Artist(artist);
	});

	/** @type {boolean} */
	this.available = data['available'];

	/** @type {Array.<SearchResults>|undefined} */
	this.duplicates = (data['duplicates'] || []).map(function(duplicat) {
		return new SearchResults(duplicat);
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


module.exports = SearchResults;
