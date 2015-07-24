var Promise = require('promise');
var YandexMusicApi = require('yandex-music-api');
var events = require('events');
var util = require('util');


var YandexMusic = function() {
	goog.base(this);
	this.init({username: 'kicumkicum@yandex.ru', password: '11zhlm5a'}).then(function() {
		// place code here
	});

};
goog.inherits(YandexMusic, YandexMusicApi);


/**
 * @param {string} query
 * @param {YandexMusic.SearchOptions} options
 */
YandexMusic.prototype.search = function(query, options) {
	return goog.base(this, 'search', query, options)
		.then(function(response) {
			aaa = response
		});
};


/**
 * @typedef {{
 *      type: YandexMusic.SearchOptionsType,
 *      page: number,
 *      nocorrect: boolean
 * }}
 */
YandexMusic.SearchOptions;


/**
 * @enum {string}
 */
YandexMusic.SearchOptionsType = {
	ARTIST: 'artist',
	ALBUM: 'album',
	TRACK: 'track',
	ALL: 'all'
};

module.exports = YandexMusic;
