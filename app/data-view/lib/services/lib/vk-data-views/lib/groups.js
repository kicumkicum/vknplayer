var dataViews = require('../');



/**
 *
 * @constructor
 */
var Groups = function() {};
goog.inherits(Groups, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Groups.prototype.getChilds = function() {};


/**
 * @return {string}
 */
Groups.prototype.toString = function() {};


module.exports = Groups;
