var IUI = require('../../i-ui');
var events = require('events');



/**
 * @param config
 * @param api
 * @param dataViews
 * @param player
 * @param playlist
 * @constructor
 * @implements {IUI}
 */
var BaseUI = function(config, dataViews, api, player, playlist) {
	this._dataViews = dataViews;// init in app
	this._config = config;
	this._api = api;
	this._player = player;
	this._playlist = playlist;
};
goog.inherits(Console, events.EventEmitter);


/**
 * @inheritDoc
 */
BaseUI.prototype.init = function() {
	this._api.vk.on(this._api.vk.EVENT_START_REQUEST, this._onApiVKStartRequest.bind(this));// todo move to application.
	this._api.vk.on(this._api.vk.EVENT_STOP_REQUEST, this._onApiVKStopRequest.bind(this));
	this._api.vk.on('error', this._apiVKErrorHandler.bind(this));
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
 * @type {Service}
 */
BaseUI.prototype._dataViews;


module.exports = BaseUI;
