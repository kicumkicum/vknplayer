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

	/** @type {Array.<models.Day>} */
	this.days = this.parseArray(data['days'], models.Day);

	/** @type {Array.<{
	 *     id: string,
	 *     message: string,
	 *     type: string
	 * }>}
	 */
	this.headlines = (data['headlines'] || []).map(function(headline) {
		return {
			id: headline['id'],
			message: headline['message'],
			type: headline['type']
		};
	});

	/** @type {string} */
	this.nextRevision = data['nextRevision'];

	/** @type {string} */
	this.today = data['today'];
};


module.exports = Feed;
