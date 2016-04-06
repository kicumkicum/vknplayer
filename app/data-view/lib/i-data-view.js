var dataViews = require('../');



/**
 * @param {*} params
 * @constructor
 * @interface
 */
var IDataView = function(params) {

};


/**
 * @return {Promise.<Array.<dataViews.Abstract>>}
 */
IDataView.prototype.getChildren = function() {};


/**
 * @return {string}
 */
IDataView.prototype.toString = function() {};


module.exports = IDataView;
