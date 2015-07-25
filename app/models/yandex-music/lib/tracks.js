var SearchResults = require('./search-results');



/**
 * @param {*} data
 * @constructor
 */
var Tracks = function(data) {
	/** @type {number} */
	this.perPage = data['perPage'];

	/** @type {yandexMusicModels.SearchResults} */
	this.results = new SearchResults(data['results']);
};


module.exports = Tracks;
