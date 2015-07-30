var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Account = function(data) {
	/** @type {string} */
	this.displayName = data['displayName'];

	/** @type {string} */
	this.firstName = data['firstName'];

	/** @type {string} */
	this.fullName = data['fullName'];

	/** @type {boolean} */
	this.hostedUser = data['hostedUser'];

	/** @type {string} */
	this.login = data['login'];

	/** @type {Date} */
	this.now = new Date(data['now']);

	/** @type {number} */
	this.region = data['region'];

	/** @type {string} */
	this.secondName = data['secondName'];

	/** @type {boolean} */
	this.serviceAvailable = data['serviceAvailable'];

	/** @type {number} */
	this.uid = data['uid'];
};
goog.inherits(Account, models.AbstractModel);


module.exports = Account;
