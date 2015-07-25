/**
 * @param {*} data
 * @constructor
 */
var AccountStatus = function(data) {
	/** @type {Account} */
	this.account = new vknp.models.yandexMusic.Account(data['account']);

	/** @type {vknp.models.yandexMusic.Permissions} */
	this.permissions = new vknp.models.yandexMusic.Permissions(data['permissions']);

	/** @type {vknp.models.yandexMusic.Subscription} */
	this.subscription = new vknp.models.yandexMusic.Subscription(data['subscription']);
};


module.exports = AccountStatus;
