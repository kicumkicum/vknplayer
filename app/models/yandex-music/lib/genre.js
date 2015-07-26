/**
 * @param {*} data
 * @constructor
 */
var Genre = function(data) {
	/** @type {boolean} */
	this.composerTop = data['composerTop'];

	/** @type {string} */
	this.fullTitle = data['fullTitle'] || '';

	/** @type {string} */
	this.color = data['color'] || '';

	/** @type {Object} */
	this.images = (function() {
		var images = {};
		images[Genre.ImagesSize.s_208x208] = data['images'][Genre.ImagesSize.s_208x208];
		images[Genre.ImagesSize.s_300x300] = data['images'][Genre.ImagesSize.s_300x300];
		return images;
	})();

	/** @type {string} */
	this.id = data['id'];

	/** @type {vknp.models.yandexMusic.Genre} */
	this.subGenres = (data['subGenres'] || []).map(function(subGenre) {
		return new vknp.models.yandexMusic.Genre(subGenre);
	});

	/** @type {string} */
	this.title = data['title'];

	/** @type {Object} */
	this.titles = (function() {
		var titles = {};
		titles[Genre.Locale.BE] = data['titles'][Genre.Locale.BE];
		titles[Genre.Locale.EN] = data['titles'][Genre.Locale.EN];
		titles[Genre.Locale.KK] = data['titles'][Genre.Locale.KK];
		titles[Genre.Locale.RU] = data['titles'][Genre.Locale.RU];
		titles[Genre.Locale.UK] = data['titles'][Genre.Locale.UK];
	})();

	/** @type {number} */
	this.tracksCount = data['tracksCount'];

	/** @type {string} */
	this.urlPart = data['urlPart'];

	/** @type {number} */
	this.weight = data['weight'];


};


/**
 * @enum {string}
 */
Genre.ImagesSize = {
	s_208x208: '208x208',
	s_300x300: '300x300'
};


/**
 * @enum {string}
 */
Genre.Locale = {
	BE: 'be',
	EN: 'en',
	KK: 'kk',
	RU: 'ru',
	UK: 'uk'
};


module.exports = Genre;
