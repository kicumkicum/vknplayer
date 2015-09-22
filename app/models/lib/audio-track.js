/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 21.12.13
 * Time: 23:28
 * To change this template use File | Settings | File Templates.
 */

var models = require('../');



/**
 * @param {Object} data
 * @constructor
 */
var AudioTrack = function(data) {
	goog.base(this, data);
};
goog.inherits(AudioTrack, models.AbstractModel);


/**
 * @inheritDoc
 */
AudioTrack.prototype.parse = function(data) {
	goog.base(this, 'parse');

	if (data instanceof vknp.api.vk.models.AudioTrack) {
		this._parseVK(data);
		this._apiType = AudioTrack.Api.VK;

	} else if (data instanceof vknp.api.yandexMusic.models.Track) {
		this._parseYandexMusic(data);
		this._apiType = AudioTrack.Api.YANDEX_MUSIC;

	} else {
		this._parseOther(data);
	}
};


/**
 * @return {Promise.<string>}
 */
AudioTrack.prototype.getUrl = function() {
	switch (this._apiType) {
		case AudioTrack.Api.VK:
			return this._getVKUrl();
			break;
		case AudioTrack.Api.YANDEX_MUSIC:
			return this._getYandexMusicUrl();
			break;
		default:
			return this._getOtherUrl();
	}
};

/**
 * @return {string}
 */
AudioTrack.prototype.toString = function() {
	return (this.artist ? this.artist + ' - ' : '' ) + this.title;
};


AudioTrack.prototype._parseVK = function(data) {
	this._parseOther(data);

	/** @type {string} */
	this.duration = data.durationMillis || data.durationMs || 0;

	this.url = (function() {
		var index = data.url.indexOf('?');
		return data.url.substr(0, index);
	})();
};


AudioTrack.prototype._parseYandexMusic = function(data) {
	this._parseOther(data);

	/** @type {string} */
	this.duration = data.duration || 0;

	/** @type {string} */
	this.storageDir = data.storageDir;
};


AudioTrack.prototype._parseOther = function(data) {
	/** @type {string} */
	this.artist = (data.artist || '').trim();

	/** @type {string} */
	this.title = (data.title || '').trim();

	/** @type {?number} */
	this.id = data.id || null;
};


AudioTrack.prototype._getVKUrl = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve(this.url);
	}.bind(this));
};


AudioTrack.prototype._getYandexMusicUrl = function() {
	return app.api.yandexMusic.getTrackUrl(this.id, this.storageDir);
};


/**
 *
 * @return {Promise.<string>}
 * @protected
 */
AudioTrack.prototype._getOtherUrl = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve(this.url);
	}.bind(this));
};


/**
 * @enum {string}
 */
AudioTrack.Api = {
	VK: 'vk',
	YANDEX_MUSIC: 'yandex-music'
};


module.exports = AudioTrack;