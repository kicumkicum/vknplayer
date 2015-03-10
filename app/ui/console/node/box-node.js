/**
 * Created by oleg on 14.10.14.
 */

var BaseNode = require('./base-node');


app.ui.console.node.Box = function(params) {
	goog.base(this, params);
};
goog.inherit(app.ui.console.node.Box, BaseNode);


/**
 * @type {app.ui.console.node.Box}
 * @protected
 */
app.ui.console.node.Box.prototype._node;


module.exports = Box;
