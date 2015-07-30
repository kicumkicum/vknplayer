var a;
var models = require('../index');



/**
 * @param {Object=} opt_data
 * @constructor
 */
var Cover = function(opt_data) {
	goog.base(this, opt_data);
};
goog.inherits(Cover, models.AbstractModel);


/**
 * @param {Object=} opt_data
 */
Cover.prototype.parse = function(opt_data) {
	/** @type {string} */
	this.prefix = opt_data['prefix'];

	/** @type {string} */
	this.type = opt_data['type'];

	/** @type {string} */
	this.uri = opt_data['uri'];

};


module.exports = Cover;
