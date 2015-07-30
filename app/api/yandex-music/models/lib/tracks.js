var Track = require('./search-results');
var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Tracks = function(data) {
	/** @type {number} */
	this.perPage = data['perPage'];

	/** @type {models.Track} */
	this.results = new models.Track(data['results']);
};


module.exports = Tracks;
