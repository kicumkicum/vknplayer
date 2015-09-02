var dataViews = require('../');



/**
 *
 * @constructor
 * @implements {IDataView}
 */
var Abstract = function() {};


/**
 * @return {Promise.<Array>}
 */
Abstract.prototype.getChilds = function() {};


/**
 * @return {string}
 */
Abstract.prototype.toString = function() {};


module.exports = Abstract;
