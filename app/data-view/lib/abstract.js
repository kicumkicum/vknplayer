var dataViews = require('../');



/**
 * @param {*=} opt_data
 * @constructor
 * @implements {IDataView}
 */
var Abstract = function(opt_data) {
	this._data = opt_data;
};


/**
 * @return {Promise.<Array>}
 */
Abstract.prototype.getChildren = function() {};


/**
 * @return {string}
 */
Abstract.prototype.toString = function() {};


module.exports = Abstract;
