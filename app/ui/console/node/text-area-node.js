/**
 * Created by oleg on 14.10.14.
 */
var BaseNode = require('./base-node');


var TextAreaNode = function(params) {
	goog.base(this, params);
};
goog.inherit(TextAreaNode, BaseNode);


module.exports = TextAreaNode;
