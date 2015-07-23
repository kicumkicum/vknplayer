/**
 * Created by oleg on 08.06.14.
 */

var blessed = require('blessed');
var BlessedConst = new (require('../../lib/blessed-const'));
var DataList = require('../../../../../helper/data-list');
var Node = require('../../lib/node');
//var homePanel = require('./home-panel');



/**
 * @constructor
 * @extends {Node}
 * @template ItemType
 */
var BasePanel = function(params) {
	this._setOffset(0);
	this._data = new DataList;

	this._elementFocusHandler = this._elementFocusHandler.bind(this);
	this._focusHandler = this._focusHandler.bind(this);
	this._clickHandler = this._clickHandler.bind(this);
	this._keyPressHandler = this._keyPressHandler.bind(this);
	this._dataChangedHandler = this._dataChangedHandler.bind(this);

	goog.base(this, params || {
		left: 0,
		top:  2,
		bottom: 4,
		width: '50%',
		hidden: true
	});

	app.ui.console.on(app.ui.console.EVENT_SET_TOP, function(newPanel, oldPanel) {
		if (newPanel === this) {
			this._prevPanel = oldPanel;
		}
	}.bind(this));
};
goog.inherits(BasePanel, Node);


/**
 * @protected
 */
BasePanel.prototype._init = function() {
	this._recoveryDefaultState();

	this.on(this.EVENT_ELEMENT_CLICK, this._elementFocusHandler);
	this.on(this.EVENT_FOCUS, this._focusHandler);
	this.on(this.EVENT_SELECT, this._clickHandler);
	this.on(this.EVENT_KEY_PRESS, this._keyPressHandler);
	this._data.on(this._data.EVENT_ITEMS_ADDED, this._dataChangedHandler);
	this._data.on(this._data.EVENT_CLEAR, this._clear.bind(this));

	this._loadData();
};


/**
 * @deprecated
 */
BasePanel.prototype.updatePanel = function() {
	this.addChild(this.ROOT_ELEMENT);
	this._setOffset(1);
};


/**
 * @param {string} eventName
 * @protected
 */
BasePanel.prototype.clear = function(eventName) {
	this._data.clear();
};


/**
 * @param {string} eventName
 * @protected
 */
BasePanel.prototype._clear = function(eventName) {
	goog.base(this, '_clear');
	this._recoveryDefaultState();
};


/**
 * @protected
 */
BasePanel.prototype._loadData = function() {};


/**
 */
BasePanel.prototype._back = function() {
	app.ui.console.back();
};


/**
 * @param {number} index
 * @return {?*}
 * @protected
 */
BasePanel.prototype._getDataItem = function(index) {
	return this._data.itemAt(index - this._offset);//todo move offset to data-list
};


/**
 * @return {?DataList.<*>}
 * @protected
 */
BasePanel.prototype._getData = function() {
	return this._data;
};


/**
 * @param {?Array.<*>} data
 * @protected
 */
BasePanel.prototype.setData = function(data) {
	this._data.setItems(data);
};


/**
 * @param {?Array.<*>} data
 * @protected
 */
BasePanel.prototype.addItems = function(data) {
	this._data.addItems(data);
};


/**
 * @param {number} value
 * @protected
 */
BasePanel.prototype._setOffset = function(value) {
	this._offset = value;
};


/**
 * @protected
 */
BasePanel.prototype._getOffset = function() {
	return this._offset;
};


/**
 * @protected
 */
BasePanel.prototype._update = function() {
	this._data.toArray().forEach(function(item) {
		this.addChild(item.toString())
	}, this);
};


/**
 * @protected
 */
BasePanel.prototype._elementFocusHandler = function() {
	this.focus();
};


/**
 * @param {string} eventName
 * @param {*} item
 * @param {number} position
 * @protected
 */
BasePanel.prototype._clickHandler = function(eventName, item, position) {};


/**
 * @protected
 */
BasePanel.prototype._focusHandler = function() {};


/**
 * @param {string} eventName
 * @param {Array.<!ItemType>} data
 * @protected
 */
BasePanel.prototype._dataChangedHandler = function(eventName, data) {
	this._update();
};


/**
 * @param eventName
 * @param ch
 * @param key
 * @protected
 */
BasePanel.prototype._keyPressHandler = function(eventName, ch, key) {
	var handled = false;
	switch (key.name) {
		case BlessedConst.button.ESCAPE:
			this._back();
			handled = true;
			break;
		case BlessedConst.button.HOME:
			this.selectElement(0);
			handled = true;
			break;
		case BlessedConst.button.END:
			this.selectElement(this.getChildrenLength() - 1);
			handled = true;
			break;

	}
	if (handled) {
		app.ui.console.render();
	}
};


/**
 * @protected
 */
BasePanel.prototype._recoveryDefaultState = function() {
	this.addChild(this.ROOT_ELEMENT);
	this._setOffset(1);
};


/**
 * @type {?DataList.<*>}
 * @protected
 */
BasePanel.prototype._data;


/**
 * @type {number}
 * @private
 */
BasePanel.prototype._offset;


/**
 * @type {number}
 * @private
 */
BasePanel.prototype._prevPanel;


/**
 * @const {string}
 */
BasePanel.prototype.ROOT_ELEMENT = '/..';


module.exports = BasePanel;
