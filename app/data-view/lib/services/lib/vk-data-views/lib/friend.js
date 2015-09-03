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
Friend.prototype.getChild = function() {};


/**
 * @return {string}
 */
Friend.prototype.toString = function() {};


module.exports = Friend;
