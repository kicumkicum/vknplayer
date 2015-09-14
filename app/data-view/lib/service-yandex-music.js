var dataViews = require('../');



/**
 *
 * @constructor
 */
var ServiceYandexMusic = function() {};
goog.inherits(ServiceYandexMusic, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
ServiceYandexMusic.prototype.getChildren = function() {};


/**
 * @inheritDoc
 */
ServiceYandexMusic.prototype.toString = function() {
	return 'Yandex Music';
};



module.exports = ServiceYandexMusic;
