var dataViews = require('../');



/**
 *
 * @constructor
 */
var Friends = function() {};
goog.inherits(Friends, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Friends.prototype.getChilds = function() {};


/**
 * @return {string}
 */
Friends.prototype.toString = function() {};


module.exports = Friends;
