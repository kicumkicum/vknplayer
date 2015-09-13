var IUI = require('../../i-ui');
var events = require('events');



/**
 * @param config
 * @param api
 * @param dataViews
 * @param player
 * @param playlist
 * @param historyManager
 * @constructor
 * @implements {IUI}
 */
var BaseUI = function(config, dataViews, api, player, playlist, historyManager) {
	this._api = api;
	this._config = config;
	this._dataViews = dataViews;
	this._player = player;
	this._playlist = playlist;
	this._historyManager = historyManager;
};
goog.inherits(BaseUI, events.EventEmitter);


/**
 * @inheritDoc
 */
BaseUI.prototype.init = function() {
	//this._api.vk.on(this._api.vk.EVENT_START_REQUEST, this._onApiVKStartRequest.bind(this));// todo this._api.on...
	//this._api.vk.on(this._api.vk.EVENT_STOP_REQUEST, this._onApiVKStopRequest.bind(this));
	//this._api.vk.on(this.EVENT_ERROR, this._onApiVkError.bind(this));
};


/**
 * @inheritDoc
 */
BaseUI.prototype.show = function(dataView) {

};


/**
 * @inheritDoc
 */
BaseUI.prototype.back = function() {
	this._dataViews.back();
};


/**
 * @param dataView
 * @protected
 */
BaseUI.prototype._show = function(dataView) {

};


/**
 * @protected
 */
BaseUI.prototype._onApiVKStartRequest = function() {};


/**
 * @protected
 */
BaseUI.prototype._onApiVKStopRequest = function() {};


/**
 * @protected
 */
BaseUI.prototype._onApiVkError = function() {};


/**
 * @type {Main}
 */
BaseUI.prototype._dataViews;


/**
 * @type {HistoryManager}
 */
BaseUI.prototype._historyManager;


module.exports = BaseUI;
