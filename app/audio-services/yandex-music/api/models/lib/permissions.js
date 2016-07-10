var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Permissions = function(data) {
	goog.base(this, data);
};
goog.inherits(Permissions, models.AbstractModel);


/**
 * @param {Object} data
 */
Permissions.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

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


/**
 * @type {clin.models.yandexMusic.Permissions}
 */
module.exports = Permissions;
