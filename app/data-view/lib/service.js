var dataViews = require('../');



/**
 *
 * @constructor
 */
var Service = function(type) {
	this._type = type;
	switch (this._type) {
		case Service.Type.VK:
			return new dataViews.ServiceVK;
			break;
		case Service.Type.YANDEX_MUSIC:
			return new dataViews.ServiceYandexMusic;
			break;
	}

};
goog.inherits(Service, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Service.prototype.getChilds = function() {

};


/**
 * @return {string}
 */
Service.prototype.toString = function() {
	return this._type;
};


/**
 * @type {string}
 */
Service.prototype._type;


/**
 * @enum {string}
 */
Service.Type = {
	VK: 'vk',
	YANDEX_MUSIC: 'yandex-music'
};


module.exports = Service;
