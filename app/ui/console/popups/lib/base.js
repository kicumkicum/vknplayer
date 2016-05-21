/**
 * Created by oleg on 07.07.14.
 */

var blessed = require('blessed');
var events = require('events');

var Node = require('../../lib/node');



/**
 *
 * @param {BasePopUp.param} param
 * @constructor
 */
var BasePopUp = function(param) {};
goog.inherits(BasePopUp, Node);


/**
 * @param {BasePopUp.param} param
 * @protected
 */
BasePopUp.prototype._init = function(param) {
	this._close = this._close.bind(this);
	this._keyPressListener = this._keyPressListener.bind(this);

	this._node = this._createNode(param);
	app.ui.console.append(this._node);
	this._cancel = this._createButton('cancel', {
		right: 3,
		bottom: 1
	});

	this._node.on(BlessedConst.event.KEY_PRESS, this._keyPressListener);
	this._cancel.on(BlessedConst.event.BUTTON_PRESS, this._close);
};


BasePopUp.prototype.getNode = function() {
	return this._node;
};


/**
 * @param {number} value
 */
BasePopUp.prototype.setIndex = function(value) {
	this._node.setIndex(value);
};



/**
 */
BasePopUp.prototype.close = function() {
	this._cancel.removeListener(BlessedConst.event.BUTTON_PRESS, this._close);
	this._cancel.removeListener(BlessedConst.event.BUTTON_PRESS, this._keyPressListener);
	app.ui.console.screen.remove(this._node);
	app.ui.console.render();
	this.emit('close', this);
};


/**
 */
BasePopUp.prototype._close = function() {
	this.close();
};


/**
 */
BasePopUp.prototype._keyPressListener = function(ch, key) {
	if (key.name === BlessedConst.button.ESCAPE) {
			//this.close();//todo разобраться почему после закрытия попап не дохнет
		}
};


/**
 * @returns {Form}
 * @protected
 */
BasePopUp.prototype._createNode = function(param) {
	return blessed.form({
		mouse: true,
		keys: true,
		scrollable: true,
		tags: true,

		label: param.title,
		content: param.message,

		left: param.left + '%',
		top:  param.top + '%',
		width: param.width + '%',
		height: param.height + '%',

		border: {
			type: 'line'
		},

		style: {
			border: {
				fg: 'blue'
			},
			selected: {
				fg: 'black'
			}
		}
	});
};


/**
 * @param {string} title
 * @param {{
 *      right: (number|undefined),
 *      left: (number|undefined),
 *      bottom: number
 * }} indent
 * @return {Button}
 * @protected
 */
BasePopUp.prototype._createButton = function(message, indent) {
	return blessed.button({
		parent: this._node,
		mouse: true,
		keys: true,
		shrink: true,
		tags: true,
		top: indent.top,
		width: indent.width,
		height: indent.height,
		right: indent.right,
		left: indent.left,
		bottom: indent.bottom,
		content: message,

		border: {
			type: 'line'
		},
		style: {
			focus: {
				bg: 'blue'
			},
			hover: {
				bg: 'blue'
			}
		}
	});
};


/**
 * @type {Form}
 */
BasePopUp.prototype.node;


/**
 * @typedef {{
 *      title: string
 *      left: number,
 *      top: number,
 *      width: number,
 *      height: number
 * },}
 */
BasePopUp.param;


module.exports = BasePopUp;
