/**
 * @type {{
 *      Api: YandexMusic,
 *      models: models.Type
 * }}
 */
var yandexMusic = {
	Api: require('./api/yandex-music'),
	models: require('./models')
};


module.exports = yandexMusic;
