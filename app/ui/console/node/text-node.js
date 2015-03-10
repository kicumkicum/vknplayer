/**
 * Created by oleg on 14.10.14.
 */
var BaseNode = require('./base-node');


var TextNode = function(params) {
	goog.base(this, params);
};
goog.inherit(TextNode, BaseNode);


module.exports = TextNode;
