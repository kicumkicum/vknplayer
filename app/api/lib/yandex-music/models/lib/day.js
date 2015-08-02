var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Day = function(data) {
	goog.base(this, data);
};
goog.inherits(Day, models.AbstractModel);


/**
 * @param {Object} data
 */
Day.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {string} */
	this.day = data['day'];

	/** @type {Array.<model.Event>} */
	this.events = this.parseArray(data['events'], models.Event);

	/** @type {Array.<models.Track>} */
	this.tracksToPlay = this.parseArray(data['tracksToPlay'], models.Track);

	///** @type {Array.<models.Track>} */
	//this.tracksToPlayWithAds = this.parseArray(data['tracksToPlayWithAds'], models.Track);
};


module.exports = Day;

