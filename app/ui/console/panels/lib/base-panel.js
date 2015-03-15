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
 */
var BasePanel = function(params) {
	this._setOffset(0);
	goog.base(this, params || {
		left: 0,
		top:  2,
		bottom: 4,
		width: '50%',
		hidden: true
	});
	this._data = null;
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
	if (!(this instanceof require('./home'))) {//workaround - incorrect goog.base
		this.addChild('/..');
		this._setOffset(1);
	}

	this._loadData();
	this.on(this.EVENT_ELEMENT_CLICK, this.focus.bind(this));
	this.on(this.EVENT_FOCUS, function(eventName) {
//		app.ui.console.activePanel = this;
	}.bind(this));
	this.on(this.EVENT_SELECT, this._click.bind(this));
	this.on(this.EVENT_KEY_PRESS, function(eventName, ch, key) {
		if (key.name === BlessedConst.button.ESCAPE) {
			this._back();
		}
		if (key.name === BlessedConst.button.HOME) {
			this.selectElement(0);
		}
		if (key.name === BlessedConst.button.END) {
			this.selectElement(this.getChildrenLength() - 1);
		}
		app.ui.console.render();//todo not often
	}.bind(this));
};


/**
 * @protected
 */
BasePanel.prototype._loadData = function() {};


/**
 * @param item
 * @param position
 * @protected
 */
BasePanel.prototype._click = function(eventName, item, position) {};


/**
 * @param {*} data
 */
BasePanel.prototype.updatePanel = function(data) {
	this.clear();
	this.addChild('/..');
	this._setOffset(1);
};


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
	return this._data.itemAt(index - this._offset);
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
BasePanel.prototype._setData = function(data) {
	this._data = new DataList(data);
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
 * @type {?DataList.<*>}
 * @private
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
