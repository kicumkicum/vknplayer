var dataViews = require('../');



/**
 *
 * @constructor
 * @interface
 */
var IDataView = function(params) {

};


/**
 * @return {Promise.<Array.<dataViews.Abstract>>}
 */
IDataView.prototype.getChilds = function() {};


/**
 * @return {string}
 */
IDataView.prototype.toString = function() {};


module.exports = IDataView;
