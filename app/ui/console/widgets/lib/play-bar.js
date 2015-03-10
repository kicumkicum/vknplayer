/**
 * Created by oleg on 28.05.14.
 */

var blessed = require('blessed');
var util = require('util');

var Node = require('../../lib/node');


/**
 * @constructor
 * @extends {Node}
 */
var PlayBar = function() {
	this._node = blessed.progressbar({
		orientation: 'horizontal',

		right: 0,
		top: 0,
		height: 3,
		width: '51%',

		border: {
			type: 'line'
		}
	});
	app.ui.console.append(this._node);
	this._node.setProgress(70);
};
goog.inherits(PlayBar, Node);


/**
 * @return {*}
 */
PlayBar.prototype.getNode = function() {
	return this._node;
};

/**
 */
PlayBar.prototype._node;


module.exports = PlayBar;