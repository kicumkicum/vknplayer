var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Permissions = function(data) {
	/** @type {Array.<string>} */
	this.default = data['default'].map(function(item) {
		return item
	});

	/** @type {Date} */
	this.until = new Date(data['until']);

	/** @type {Array.<string>} */
	this.values = data['values'].map(function(item) {
		return item
	});
};
goog.inherits(Permissions, models.AbstractModel);


/**
 * @type {vknp.models.yandexMusic.Permissions}
 */
module.exports = Permissions;
