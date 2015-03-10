/**
 * Created by oleg on 14.10.14.
 */
var BaseNode = require('./base-node');


var ListBarNode = function(params) {
	goog.base(this, params);
};
goog.inherit(ListBarNode, BaseNode);


module.exports = ListBarNode;
