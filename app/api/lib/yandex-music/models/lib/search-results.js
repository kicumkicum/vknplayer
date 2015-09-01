var models = require('../');


/**
 * @param data
 * @constructor
 */
var SearchResults = function(data) {
	goog.base(this, data);
};
goog.inherits(SearchResults, models.AbstractModel);


/**
 * @param {Object} data
 */
SearchResults.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

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
		return new models.Track(track);
	});

	/** @type {} */
	this.videos = data['videos']['results'];
};


module.exports = SearchResults;
