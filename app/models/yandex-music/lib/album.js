var Artist = require('./artist');
var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Album = function(data) {
	/** @type {Array.<yandexMusicModels.Artist>} */
	this.artists = (data['artists'] || []).map(function(artist) {
		return new Artist(artist);
	});

	/** @type {number} */
	this.cover = data['cover'];

	/** @type {string} */
	this.coverUri = data['coverUri'];

	/** @type {string} */
	this.genre = data['genre'];

	/** @type {number} */
	this.id = data['id'];

	/** @type {number} */
	this.originalReleaseYear = data['originalReleaseYear'];

	/** @type {boolean} */
	this.recent = data['recent'];

	/** @type {string} */
	this.storageDir = data['storageDir'];

	/** @type {string} */
	this.title = data['title'];

	/** @type {number} */
	this.trackCount = data['trackCount'];

	/** @type {boolean} */
	this.veryImportant = data['veryImportant'];

	/** @type {number} */
	this.year = data['year'];
};


module.exports = Album;
