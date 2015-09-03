var dataViews = require('../');
var utilites = require('../utils');



/**
 *
 * @constructor
 * @implements {IDataView}
 */
var Root = function(services) {
	this._childs = services.map(function(service) {
		return new dataViews.Service(service);
	});
};
goog.inherits(Root, dataViews.Abstract);


/**
 * @return {Promise.<Array.<Service>>}
 */
Root.prototype.getChild = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve(this._childs);
	}.bind(this));
};


/**
 * @return {string}
 */
Root.prototype.toString = function() {
	return 'root';
};


/**
 * @type {Array.<Service>}
 */
Root.prototype._childs;


module.exports = Root;
