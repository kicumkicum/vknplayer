var dataViews = require('../');



/**
 *
 * @constructor
 */
var Group = function() {};
goog.inherits(Group, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Group.prototype.getChilds = function() {};


/**
 * @return {string}
 */
Group.prototype.toString = function() {};


module.exports = Group;
