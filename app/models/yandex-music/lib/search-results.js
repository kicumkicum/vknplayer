var models = require('../');


/**
 * @param data
 * @constructor
 */
var SearchResults = function(data) {
	data = data || {};

	/** @type {} */
	this.albums = data['albums']['results'];

	/** @type {} */
	this.artists = data['artists']['results'];

	/** @type {} */
	this.best = data['best']['result'];

	/** @type {boolean} */
	this.misspellCorrected = data['misspellCorrected'];

	/** @type {} */
	this.nocorrect = data['nocorrect'];

	/** @type {} */
	this.playlists = data['playlists'] && data['playlists']['results'];

	/** @type {string} */
	this.text = data['text'] || '';

	/** @type {} */
	this.tracks = (data['tracks']['results'] || []).map(function(track) {
		return new vknp.models.yandexMusic.Track(track);
	});

	/** @type {} */
	this.videos = data['videos']['results'];
};


module.exports = SearchResults;
