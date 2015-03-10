/**
 * Created by oleg on 14.10.14.
 */

var BaseNode = require('./base-node');


var ListNode = function(params) {
	goog.base(this, params);
};
goog.inherit(ListNode, BaseNode);


module.exports = ListNode;
