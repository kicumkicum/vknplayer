/**
 * Created by oleg on 08.10.14.
 */
goog.provide('Node');
var blessed = require('blessed');
var events = require('events');
var util = require('util');

var BlessedConst = new (require('./blessed-const'));


/**
 * @constructor
 */
var Node = function(opt_params) {
	this._node = null;
	this._createNode(opt_params);
	this._init();
	this._eventsForwarding();
};
goog.inherits(Node, events.EventEmitter);


/**
 * for overload
 * @protected
 */
Node.prototype._createNode = function(opt_params) {
	this._node = blessed.list({
		mouse: true,
		keys: true,
		scrollable: true,
		hidden: opt_params.hidden,

		left: opt_params.left,
		right: opt_params.right,
		top:  opt_params.top,
		bottom: opt_params.bottom,
		width: opt_params.width,

		border: {
			type: 'line'
		},

		style: {
			selected: {
				fg: 'black'
			}
		}
	});
	app.ui.console.append(this._node);
};


/**
 * for overload
 * @protected
 */
Node.prototype._init = function() {};


/**
 * @return {List}
 */
Node.prototype.getNode = function() {
	return this._node;
};


/**
 * @param {number} index
 * @return {?Object}
 */
Node.prototype.getChild = function(index) {
	if (this._node.children && this._node.children[index]) {
		return this._node.children[index];
	} else {
		return null;
	}
};


/**
 * @return {?number}
 */
Node.prototype.getSelectedChildIndex = function() {
	return this._node.selected || null;
};


/**
 * @param {string} name
 * @return {number}
 */
Node.prototype.addChild = function(name) {
	this._node.add(name);
	return this._node.children.length - 1;
};


/**
 * @param {} child
 * @return {number}
 */
Node.prototype.removeChild = function(child) {
	this._node.removeItem(child);
};


/**
 */
Node.prototype.clear = function() {
	var size = this.getChildrenLength();
	while (size) {
		this._node.removeItem(size - 1);
		size = this.getChildrenLength();
	}
};


/**
 * @return {Array}
 */
Node.prototype.getChildren = function() {
	return this._node.children || [];
};


/**
 * @return {number}
 */
Node.prototype.getChildrenLength = function() {
	return this._node.children.length || 0;
};


/**
 * @return {}
 */
Node.prototype.getLastChild = function() {
	return this.getChild(this.getChildrenLength() - 1);
};


/**
 */
Node.prototype.focus = function() {
	this._node.focus();
};


/**
 * @return {boolean}
 */
Node.prototype.isHidden = function() {
	return this._node.hidden;
};


/**
 * @param {number} index
 * @return {boolean}
 */
Node.prototype.selectElement = function(index) {
	this._node.select(index);
};


Node.prototype._eventsForwarding = function() {
	this._node.on(BlessedConst.event.ELEMENT_CLICK, this._handler.bind(this, this.EVENT_ELEMENT_CLICK));
	this._node.on(BlessedConst.event.BUTTON_PRESS, this._handler.bind(this, this.EVENT_BUTTON_PRESS));
	this._node.on(BlessedConst.event.KEY_PRESS, this._handler.bind(this, this.EVENT_KEY_PRESS));
	this._node.on(BlessedConst.event.FOCUS, this._handler.bind(this, this.EVENT_FOCUS));
	this._node.on(BlessedConst.event.SCROLL, this._handler.bind(this, this.EVENT_SCROLL));
	this._node.on(BlessedConst.event.SELECT, this._handler.bind(this, this.EVENT_SELECT));

};

/**
 * @param {string} event
 * @private
 */
Node.prototype._handler = function(event) {
	var args = this._convertArguments(arguments, event);
	this.emit.apply(this, args);
};

/**
 * @param {Object} args
 * @param {string} event
 * @return {Array}
 * @private
 */
Node.prototype._convertArguments = function(args, event) {
	var newArgs = Array.prototype.slice.apply(args);
	newArgs.unshift(event);
	return newArgs;
};


/**
 * @type {List}
 * @protected
 */
Node.prototype._node;


/**
 * Fired with: node
 * @const {string}
 */
Node.prototype.EVENT_ELEMENT_CLICK = 'event-element-click';


/**
 * Fired with:
 * @const {string}
 */
Node.prototype.EVENT_FOCUS = 'event-focus';


/**
 * Fired with: item, position
 * @const {string}
 */
Node.prototype.EVENT_SELECT = 'event-select';


/**
 * Fired with: ch, key
 * @const {string}
 */
Node.prototype.EVENT_KEY_PRESS = 'event-keypress';


/**
 * Fired with:
 * @const {string}
 */
Node.prototype.EVENT_BUTTON_PRESS = 'event-press';


/**
 * Fired with:
 * @const {string}
 */
Node.prototype.EVENT_SCROLL = 'event-scroll';


module.exports = Node;
