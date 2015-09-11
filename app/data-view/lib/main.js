var dataViews = require('../');



/**
 *
 * @constructor
 */
var Main = function(config) {
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
goog.inherits(Main, dataViews.Abstract);


Main.prototype.getChild = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve(this._children);
	}.bind(this));
};


Main.prototype.toString = function() {
	return 'Main';
};


/**
 * @type {MainVK}
 */
Main.prototype.vk;


/**
 * @type {MainYandexMusic}
 */
Main.prototype.yandexMusic;


/**
 * @type {Object}
 * @protected
 */
Main.prototype._config;


/**
 * @type {Array.<dataView.Abstract>}
 * @protected
 */
Main.prototype._children;


/**
 * @enum {string}
 */
Main.Type = {
	VK: 'vk',
	YANDEX_MUSIC: 'yandex-music'
};


module.exports = Main;
