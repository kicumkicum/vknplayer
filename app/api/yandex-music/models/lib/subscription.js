var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Subscription = function(data) {
	goog.base(this, data);
};
goog.inherits(Subscription, models.AbstractModel);


/**
 * @param {Object} data
 */
Subscription.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {boolean} */
	this.canStartTrial = data['canStartTrial'];

	/** @type {number} */
	this.trialDuration = data['trialDuration'];
};


module.exports = Subscription;
