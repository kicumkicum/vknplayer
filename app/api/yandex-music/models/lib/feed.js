var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Feed = function(data) {
	goog.base(this, data);
};
goog.inherits(Feed, models.AbstractModel);


/**
 * @param {Object} data
 */
Feed.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {boolean} */
	this.canGetMoreEvents = data['canGetMoreEvents'];

	/** @type {} */
	this.days = data['days'];

	/** @type {} */
	this.headlines = data['headlines'];

	/** @type {string} */
	this.nextRevision = data['nextRevision'];

	/** @type {string} */
	this.today = data['today'];
};


module.exports = Feed;
