goog.provide('Panel');

var BasePanel = require('./base-panel');
var Node = require('../../lib/node');//todo for inherits. check it

var blessed = require('blessed');



/**
 * @constructor
 * @extends {BasePanel}
 */
var Panel = function(dataView) {
	this._dataView = dataView;
	goog.base(this, {
		mouse: true,
		keys: true,
		scrollable: true,
		hidden: true,

		left: 0,
		top:  2,
		bottom: 4,
		width: '50%',

		border: {
			type: 'line'
		},

		style: {
			selected: {
				fg: 'black'
			}
		}
	});

	this._data.on(this._data.EVENT_ITEMS_ADDED, app.ui.console.render.bind(app.ui.console));
};
goog.inherits(Panel, BasePanel);


/**
 * @param {} dataView
 */
Panel.prototype.setDataView = function(dataView) {
	this._dataView = dataView;
	this._loadData();
};


/**
 * @protected
 */
Panel.prototype._init = function() {
	goog.base(this, '_init');
};


/**
 * @protected
 */
Panel.prototype._loadData = function() {
	goog.base(this, '_loadData');

	this._dataView
		.getChildren()
		.then(function(dataViews) {
			dataViews = [].concat(dataViews);
			if (dataViews[0] instanceof vknp.models.AudioTrack) {
				app.ui.console._panels.slavePL.setContent(/** @type {Array.<AudioTrack>} */(dataViews));
			} else {
				this.setData(dataViews);
			}
		}.bind(this));
};


/**
 * @param {*} select
 * @param {number} selectNumber
 * @protected
 */
Panel.prototype._clickHandler = function(eventName, select, selectNumber) {
	if (selectNumber === 0) {
		this._back();
		return;
	}

	var item = this._getDataItem(selectNumber);
	if (!item) {
		return;
	}

	this.setDataView(item);
};


/**
 * @type {DataView}
 */
Panel.prototype._dataView;


module.exports = Panel;
