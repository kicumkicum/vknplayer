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
 * @param {dataView.Abstract} dataView
 */
Panel.prototype.setDataView = function(dataView) {
	if (this._getGlobalRequestId()) {
		this._historyManager.back();
	}

	this._historyManager.add({
		dataView: this._dataView,
		children: app.helper.clone(this._data.toArray()),
		selected: this.getSelectedChildIndex()
	});

	this._setDataView(dataView);
};


/**
 * @inheritDoc
 */
Panel.prototype._init = function() {
	goog.base(this, '_init');
};


/**
 * @inheritDoc
 */
Panel.prototype._recoveryDefaultState = function() {
	if (this._dataView.toString() === 'Root') {
		this._setOffset(0);
	} else {
		goog.base(this, '_recoveryDefaultState');
	}
};


/**
 * @param {dataView.Abstract} dataView
 * @param {{
 *      children: Array.<dataView.Abstract>,
 *      selected: number
 * }=} opt_state
 * @protected
 */
Panel.prototype._setDataView = function(dataView, opt_state) {
	this._dataView = dataView;
	if (!opt_state) {
		this._loadData();
	} else {
		this.setData(opt_state.children);
		this.selectElement(opt_state.selected)
	}
};


/**
 * @inheritDoc
 */
Panel.prototype._loadData = function() {
	goog.base(this, '_loadData');

	var requestId = this._generateRequestId();
	this._setGlobalRequestId(requestId);

	this._dataView
		.getChildren()
		.then(function(dataViews) {
			if (!this._isActualRequest(requestId)) {
				return;
			}

			this._resetGlobalRequestId();
			dataViews = [].concat(dataViews);

			if (dataViews[0] instanceof vknp.models.AudioTrack || dataViews[0] instanceof vknp.api.vk.models.AudioTrack) {
				this._historyManager.back();
				app.ui.console._panels.slavePL.setContent(/** @type {Array.<AudioTrack>} */(dataViews));
			} else {
				this.setData(dataViews);
			}
		}.bind(this));
};


/**
 * @inheritDoc
 */
Panel.prototype._back = function() {
	var snapshot = this._historyManager.back();

	if (snapshot) {
		this._setDataView(snapshot.dataView, {
			children: snapshot.children,
			selected: snapshot.selected
		});
	}
};


/**
 * @return {string}
 * @protected
 */
Panel.prototype._generateRequestId = function() {
	return '' + Math.random + Date.now();
};


/**
 * @param {?string} requestId
 * @protected
 */
Panel.prototype._setGlobalRequestId = function(requestId) {
	this._globalRequestId = requestId;
};


/**
 * @return {?string}
 * @protected
 */
Panel.prototype._getGlobalRequestId = function() {
	return this._globalRequestId;
};


/**
 * @protected
 */
Panel.prototype._resetGlobalRequestId = function() {
	this._setGlobalRequestId(null);
};


/**
 * @param {string} promiseId
 * @return {boolean}
 * @protected
 */
Panel.prototype._isActualRequest = function(promiseId) {
	return this._globalRequestId === promiseId;
};


/**
 * @param {*} select
 * @param {number} selectNumber
 * @inheritDoc
 */
Panel.prototype._clickHandler = function(eventName, select, selectNumber) {
	var item = this._getDataItem(selectNumber);
	if (item) {
		this.setDataView(item);
	} else {
		this._back();
	}
};


/**
 * @type {DataView}
 */
Panel.prototype._dataView;


module.exports = Panel;
