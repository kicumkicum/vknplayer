var dataViews = require('../');



/**
 *
 * @constructor
 */
var Service = function(config) {
	this._config = config;

	if (config.vk.enable) {
		this.vk = new dataViews.VK;
	}
	if (config.yandexMusic.enable) {
		this.yandexMusic = new dataViews.YandexMusic;
	}
};


/**
 * @type {ServiceVK}
 */
Service.prototype.vk;


/**
 * @type {ServiceYandexMusic}
 */
Service.prototype.yandexMusic;


/**
 * @type {Object}
 * @protected
 */
Service.prototype._config;


/**
 * @enum {string}
 */
Service.Type = {
	VK: 'vk',
	YANDEX_MUSIC: 'yandex-music'
};


module.exports = Service;
