var dataViews = require('../');



/**
 *
 * @constructor
 */
var ServiceVK = function() {};
goog.inherits(ServiceVK, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
ServiceVK.prototype.getChilds = function() {};


module.exports = ServiceVK;
