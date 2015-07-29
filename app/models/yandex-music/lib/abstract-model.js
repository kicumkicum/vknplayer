var EventEmitter = require('EventEmitter');



/**
 * @param {INPUT_TYPE=} opt_data
 * @constructor
 * @template INPUT_TYPE
 */
AbstractModel = function(opt_data) {
	goog.base(this);

	if (opt_data) {
		this.parse(opt_data);
	}
};
goog.inherits(AbstractModel, EventEmitter);


/**
 * @param {INPUT_TYPE} data
 */
AbstractModel.prototype.parse = goog.abstractMethod;


module.exports = AbstractModel;
