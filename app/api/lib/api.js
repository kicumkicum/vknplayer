var api = require('../');


/**
 * @param {*} config
 * @constructor
 */
var Api = function(config) {
	if (config.vk.enabled) {
		this.vk = new api.vk.Api(config.vk);
		this.vk.on(this.vk.EVENT_ERROR, function(eventName, error) {
			this._emitError(eventName, Api.Type.VK, error);
		}.bind(this));
	}

	if (config.gmusic.enabled) {
		//todo add gmusic api
	}

	if (config.soundcloud.enabled) {
		//todo add soundcloud api
	}

	if (config.yandexMusic.enable) {
		this.yandexMusic = new api.yandexMusic.Api(config.yandexMusic);
		//this.yandexMusic.on(this.yandexMusic.EVENT_ERROR, function(eventName, error) {
		//	this._emitError(eventName, Api.Type.YANDEX_MUSIC, error);
		//}.bind(this));
	}
};


/**
 * @param {string} eventName
 * @param {Api.Type} type
 * @param {*} error
 * @private
 */
Api.prototype._emitError = function(eventName, type, error) {
	this.emit(this.EVENT_ERROR, eventName, type, error);
};


/**
 * @type {VK}
 */
Api.prototype.vk;


/**
 * @type {YandexMusic}
 */
Api.prototype.yandexMusic;


/**
 * Fire with: api-type {Api.Type}, error {*}
 * @type {string}
 */
Api.prototype.EVENT_ERROR = 'error';


/**
 * @enum {string}
 */
Api.Type = {
	VK: 'vk',
	YANDEX_MUSIC: 'yandex-music'
};


module.exports = Api;
