var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Artist = function(data) {
	goog.base(this, data);
};
goog.inherits(Artist, models.AbstractModel);


/**
 * @param {Object} data
 */
Artist.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {boolean} */
	this.composer = data['composer'];

	/** @type {models.Cover} */
	this.cover = new models.Cover(data['cover']);

	/** @type {Array.<*>} */
	this.decomposed = data['decomposed'];

	/** @type {number} */
	this.id = data['id'];

	/** @type {string} */
	this.name = data['name'];

	/** @type {boolean} */
	this.various = data['various'];
};


module.exports = Artist;
