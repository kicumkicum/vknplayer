var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Tracks = function(data) {
	goog.base(this, data);
};
goog.inherits(Tracks, models.AbstractModel);


/**
 * @param {Object} data
 */
Tracks.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {number} */
	this.perPage = data['perPage'];

	/** @type {models.Track} */
	this.results = new models.Track(data['results']);
};


module.exports = Tracks;
