var dataViews = require('../');



/**
 *
 * @constructor
 */
var Friend = function() {};
goog.inherits(Friend, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Friend.prototype.getChilds = function() {};


/**
 * @return {string}
 */
Friend.prototype.toString = function() {};


module.exports = Friend;
