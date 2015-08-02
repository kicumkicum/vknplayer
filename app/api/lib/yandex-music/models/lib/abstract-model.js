var events = require('events');



/**
 * @param {INPUT_TYPE=} opt_data
 * @constructor
 * @template INPUT_TYPE
 */
var AbstractModel = function(opt_data) {
	goog.base(this);

	if (opt_data) {
		this.parse(opt_data);
	}
};
goog.inherits(AbstractModel, events.EventEmitter);


/**
 * @param {INPUT_TYPE} data
 */
AbstractModel.prototype.parse = function(date) {
	date = date || {};
};


/**
 * @param {Array=} array
 * @param {*} model
 * @return Array
 */
AbstractModel.prototype.parseArray = function(array, model) {
	return (array || []).map(function(arrayItem) {
		return new model(arrayItem);
	});
};


module.exports = AbstractModel;
