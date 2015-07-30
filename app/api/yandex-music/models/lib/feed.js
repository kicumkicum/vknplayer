var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Feed = function(data) {
	data = data || {};

	/** @type {boolean} */
	this.canGetMoreEvents = data['canGetMoreEvents'];

	/** @type {} */
	this.days = data['days'];

	/** @type {} */
	// todo
	this.headlines = data['headlines'];

	/** @type {string} */
	this.nextRevision = data['nextRevision'];

	/** @type {string} */
	this.today = data['today'];
};


module.exports = Feed;
