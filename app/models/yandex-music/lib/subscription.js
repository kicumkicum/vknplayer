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


module.exports = Subscription;
