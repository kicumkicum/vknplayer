/**
 * Created by oleg on 21.07.14.
 */
var blessed = require('blessed');
var BlessedConst = new (require('../../lib/blessed-const'));
var Node = require('../../lib/node');



/**
 * @constructor
 */
var Input = function(params) {
	this._node = this._createNode(params);
	if (!params.parent) {
		app.ui.console.append(this._node);
	}

	this._node.on(BlessedConst.event.FOCUS, function() {
		this._node.readInput(function(err, value) {});
	}.bind(this));

	this._node.on(BlessedConst.event.KEY_PRESS, function(ch, key) {
		if (this._isFunctionKey(key)) {
			this.emit('funckey', key);
		}
	}.bind(this));
};
goog.inherits(Input, Node);


/**
 * @param {string} value
 */
Input.prototype.setValue = function(value) {
	this._node.setValue(value);
	app.ui.console.render();
};


/**
 * @return {string}
 */
Input.prototype.getValue = function() {
	return this._node.getValue();
};


/**
 * @return {string}
 */
Input.prototype.clearValue = function() {
	return this._node.clearValue();
};


Input.prototype._createNode = function(params) {
	return blessed.textarea({
		parent: params.parent,
		keys: true,
		mouse: true,
		bottom: params.bottom,
		top: params.top,
		left: params.left,
		width: params.width,
		height: params.height,
		style: {
			fg: params.style.fg,
			bg: params.style.bg
		}
	});
};


/**
 * @param key
 * @return {boolean}
 * @private
 */
Input.prototype._isFunctionKey = function(key) {
	return key.name && key.name.indexOf('f') > -1 && key.name.length > 1;
};


/**
 * @type {Textarea}
 */
Input.prototype.node;


/**
 * @typedef {{
 *      parent: (*|undefined),
 *      bottom: (number|string|undefined),
 *      top: (number|string|undefined),
 *      left: (number|string|undefined),
 *      right: (number|string|undefined),
 *      width: (number|string|undefined),
 *      height: (number|string|undefined),
 *      style: {
 *          fg: (string|undefined),
 *          bg: (string|undefined)
 *      }
 *
 * }}
 */
Input.params;


module.exports = Input;
