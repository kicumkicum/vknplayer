var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Subscription = function(data) {
	/** @type {boolean} */
	this.canStartTrial = data['canStartTrial'];

	/** @type {number} */
	this.trialDuration = data['trialDuration'];
};
goog.inherits(Subscription, models.AbstractModel);


module.exports = Subscription;
