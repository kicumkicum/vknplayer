var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var AccountStatus = function(data) {
	/** @type {Account} */
	this.account = new models.Account(data['account']);

	/** @type {vknp.models.yandexMusic.Permissions} */
	this.permissions = new models.Permissions(data['permissions']);

	/** @type {vknp.models.yandexMusic.Subscription} */
	this.subscription = new models.Subscription(data['subscription']);
};


module.exports = AccountStatus;
