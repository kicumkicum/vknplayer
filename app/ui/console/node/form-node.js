/**
 * Created by oleg on 14.10.14.
 */

var BaseNode = require('./base-node');


var FormNode = function(params) {
	goog.base(this, params);
};
goog.inherit(FormNode, BaseNode);


/**
 * @type {Form}
 * @protected
 */
FormNode.prototype._node;


module.exports = FormNode;
