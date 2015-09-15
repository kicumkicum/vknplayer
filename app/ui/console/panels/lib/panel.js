goog.provide('Panel');
var BasePanel = require('./base-panel');



/**
 * @constructor
 * @extends {BasePanel}
 */
var Panel = function(dataView, historyManager) {
	this._historyManager = historyManager;
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
	this._historyManager.add(this._dataView);
	this._setDataView(dataView);
};


/**
 * @protected
 */
Panel.prototype._init = function() {
	goog.base(this, '_init');
};


/**
 * @param {} dataView
 * @protected
 */
Panel.prototype._setDataView = function(dataView) {
	this._dataView = dataView;
	this._loadData();
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
 * @protected
 */
Panel.prototype._back = function() {
	var dataView = this._historyManager.back();
	if (dataView) {
		this._setDataView(dataView);
	}
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
