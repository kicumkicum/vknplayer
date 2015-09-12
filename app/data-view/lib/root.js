var dataViews = require('../');



/**
 *
 * @constructor
 */
var Root = function(config) {
	this._config = config;
	this._children = [];

	if (config.vk.enabled) {
		this.vk = new dataViews.VK;
		this._children.push(this.vk);
	}

	if (config.yandexMusic.enable) {
		//this.yandexMusic = new dataViews.YandexMusic;
		//this._children.push(this.yandexMusic);
	}

	this.radio = new dataViews.Radio;
	this._children.push(this.radio);

	goog.base(this, this._children);
};
goog.inherits(Root, dataViews.Abstract);


Root.prototype.getChild = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve(this._children);
	}.bind(this));
};


Root.prototype.toString = function() {
	return 'Root';
};


/**
 * @type {MainVK}
 */
Root.prototype.vk;


/**
 * @type {MainYandexMusic}
 */
Root.prototype.yandexMusic;


/**
 * @type {Object}
 * @protected
 */
Root.prototype._config;


/**
 * @type {Array.<dataView.Abstract>}
 * @protected
 */
Root.prototype._children;


/**
 * @enum {string}
 */
Root.Type = {
	VK: 'vk',
	YANDEX_MUSIC: 'yandex-music'
};


module.exports = Root;
