var dataViews = require('../');



/**
 *
 * @constructor
 */
var Service = function(config) {
	this._config = config;
	this._children = [];

	if (config.vk.enabled) {
		this.vk = new dataViews.VK;
		this._children.push(this.vk);
	}

	if (config.yandexMusic.enable) {
		this.yandexMusic = new dataViews.YandexMusic;
		this._children.push(this.yandexMusic);
	}
};
goog.inherits(Service, dataViews.Abstract);


Service.prototype.getChild = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve(this._children);
	}.bind(this));
};


Service.prototype.toString = function() {
	return 'Main';
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
 * @type {Array.<dataView.Abstract>}
 * @protected
 */
Service.prototype._children;


/**
 * @enum {string}
 */
Service.Type = {
	VK: 'vk',
	YANDEX_MUSIC: 'yandex-music'
};


module.exports = Service;
