/**
 * Created by oleg on 08.10.14.
 */
goog.provide('BaseNode');
var blessed = require('blessed');
var events = require('events');
var util = require('util');

var BlessedConst = new (require('../lib/blessed-const'));


/**
 * @constructor
 */
var BaseNode = function(opt_params) {
	this._data = [];
	this._node = null;
	this._createNode(opt_params);
	this._init();
	this._eventsForwarding();
};
goog.inherits(BaseNode, events.EventEmitter);


/**
 * for overload
 * @protected
 */
BaseNode.prototype._createNode = function(opt_params) {};


/**
 * for overload
 * @protected
 */
BaseNode.prototype._init = function() {};


/**
 * @return {}
 */
BaseNode.prototype.getNode = function() {
	return this._node;
};


/**
 * @param {number} index
 * @return {?Object}
 */
BaseNode.prototype.getChild = function(index) {
	if (this._node.children && this._node.children[index]) {
		return this._node.children[index];
	} else {
		return null;
	}
};


/**
 * @return {?number}
 */
BaseNode.prototype.getSelectedChildIndex = function() {
	return this._node.selected || null;
};


/**
 * @param {number} index
 * @return {*|undefined}
 */
BaseNode.prototype.getChildData = function(index) {
	return this._data[index];
};


/**
 * @param {string} name
 * @param {*} data
 * @return {number}
 */
BaseNode.prototype.addChild = function(name, data) {
	this._node.add(name);
	this._data.push(data);
	return this._node.children.length - 1;
};


/**
 * @param {} child
 * @return {number}
 */
BaseNode.prototype.removeChild = function(child) {
	this._node.removeItem(child);
};


/**
 * @param {} child
 * @return {number}
 */
BaseNode.prototype.clear = function() {
	var size = this.getChildrenLength();
	while (size) {
		this._node.removeItem(size - 1);
		size = this.getChildrenLength();
	}
	this._data = [];
};


/**
 * @return {Array}
 */
BaseNode.prototype.getChildren = function() {
	return this._node.children || [];
};


/**
 * @return {number}
 */
BaseNode.prototype.getChildrenLength = function() {
	return this._node.children.length || 0;
};


/**
 * @return {}
 */
BaseNode.prototype.getLastChild = function() {
	return this.getChild(this.getChildrenLength() - 1);
};


/**
 */
BaseNode.prototype.focus = function() {
	this._node.focus();
};


/**
 * @return {boolean}
 */
BaseNode.prototype.isHidden = function() {
	return this._node.hidden;
};


/**
 * @return {boolean}
 */
BaseNode.prototype.selectElement = function(index) {
	this._node.select(index);
};


BaseNode.prototype._eventsForwarding = function() {
	this._node.on(BlessedConst.event.ELEMENT_CLICK, this._handler.bind(this, this.EVENT_ELEMENT_CLICK));
	this._node.on(BlessedConst.event.BUTTON_PRESS, this._handler.bind(this, this.EVENT_BUTTON_PRESS));
	this._node.on(BlessedConst.event.FOCUS, this._handler.bind(this, this.EVENT_FOCUS));
	this._node.on(BlessedConst.event.SCROLL, this._handler.bind(this, this.EVENT_SCROLL));
	this._node.on(BlessedConst.event.SELECT, this._handler.bind(this, this.EVENT_SELECT));

};

/**
 * @param {string} event
 * @private
 */
BaseNode.prototype._handler = function(event) {
	var args = this._convertArguments(arguments, event);
	this.emit.apply(this, args);
};

/**
 * @param {Object} args
 * @param {string} event
 * @return {Array}
 * @private
 */
BaseNode.prototype._convertArguments = function(args, event) {
	var newArgs = Array.prototype.slice.apply(args);
	newArgs.unshift(event);
	return newArgs;
};


/**
 * @type {List}
 * @protected
 */
BaseNode.prototype._node;


/**
 * @type {Array.<*>}
 * @protected
 */
BaseNode.prototype._data;


/**
 * Fired with: node
 * @const {string}
 */
BaseNode.prototype.EVENT_ELEMENT_CLICK = 'event-element-click';


/**
 * Fired with:
 * @const {string}
 */
BaseNode.prototype.EVENT_FOCUS = 'event-focus';


/**
 * Fired with: item, position
 * @const {string}
 */
BaseNode.prototype.EVENT_SELECT = 'event-select';


/**
 * Fired with: ch, key
 * @const {string}
 */
BaseNode.prototype.EVENT_KEY_PRESS = 'event-keypress';


/**
 * Fired with:
 * @const {string}
 */
BaseNode.prototype.EVENT_BUTTON_PRESS = 'event-press';


/**
 * Fired with:
 * @const {string}
 */
BaseNode.prototype.EVENT_SCROLL = 'event-scroll';


module.exports = BaseNode;
