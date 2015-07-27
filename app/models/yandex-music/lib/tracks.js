var Track = require('./search-results');



/**
 * @param {*} data
 * @constructor
 */
var Tracks = function(data) {
	/** @type {number} */
	this.perPage = data['perPage'];

	/** @type {yandexMusicModels.Track} */
	this.results = new Track(data['results']);
};


module.exports = Tracks;
