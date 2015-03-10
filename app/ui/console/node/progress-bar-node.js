/**
 * Created by oleg on 14.10.14.
 */
var BaseNode = require('./base-node');


var ProgressBarNode = function(params) {
	goog.base(this, params);
};
goog.inherit(ProgressBarNode, BaseNode);


module.exports = ProgressBarNode;
