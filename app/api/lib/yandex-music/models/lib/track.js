var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Track = function(data) {
	goog.base(this, data);
};
goog.inherits(Track, models.AbstractModel);


/**
 * @param {Object} data
 */
Track.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {models.Album} */
	this.album = new models.Album(data['album']);

	/** @type {Array.<models.Album>} */
	this.albums = (data['albums'] && data['albums']['results'] || []).map(function(album) {
		return new models.Album(album);
	});

	/** @type {Array.<models.Artist>} */
	this.artists = (data['artists']['results'] || []).map(function(artist) {
		return new models.Artist(artist);
	});

	/** @type {boolean} */
	this.available = data['available'];

	/** @type {Array.<Track>|undefined} */
	this.duplicates = (data['duplicates'] || []).map(function(duplicat) {
		return new models.Track(duplicat);
	});

	/** @type {number} */
	this.durationMillis = data['durationMillis'];

	/** @type {number} */
	this.durationMs = data['durationMs'];

	/** @type {boolean} */
	this.explicit = data['explicit'];

	/** @type {number} */
	this.id = data['id'];

	/** @type {Array.<string>} */
	this.regions = data['regions'];

	/** @type {string} */
	this.storageDir = data['storageDir'];

	/** @type {string} */
	this.title = data['title'];
};


/**
 * @return {Promise.<string>}
 */
Track.prototype.getUrl = function() {
	return app.api.yandexMusic.getTrackUrl(this);
};


/**
 * @type {models.Track}
 */
module.exports = Track;
