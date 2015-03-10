/**
 * Created by oleg on 03.06.14.
 */


/**
 * @constructor
 */
var Vknp = function() {
	this._initService();
	var config = this.service.config.getConfig();

	this._config = config;
	this._initApi(config.api);
	this._initUI(config.ui);
};


/**
 * @param {Array.<string>} prop
 * @param {*} param
 * @return {boolean}
 */
Vknp.prototype.setConfig = function(prop, param) {
	var result = this.service.config.setValue(prop, param);
	return result !== null;
};


/**
 * @param {Array.<string>} prop
 * @return {*}
 */
Vknp.prototype.getConfig = function(prop) {
	return this._config.getConfigValue(prop);
};

/**
 *
 */
Vknp.prototype.play = function(playlistId, count, opt_artist) {
	if (opt_artist) {
		this.search(playlistId, count, opt_artist)
			.then(this.service.player.play.bind(this));
	}
	this.service.player.play(playlistId);
};


/**
 */
Vknp.prototype.pause = function() {};


/**
 */
Vknp.prototype.resume = function() {};


/**
 */
Vknp.prototype.stop = function() {
	this.service.player.stop();
};


/**
 */
Vknp.prototype.toggle = function() {
	this.service.player.toggle();
};


/**
 *
 */
Vknp.prototype.radio = function(playListId, count, opt_artist) {
	if (opt_artist) {
		return this.api.vk.getRadio(opt_artist, count)
			.then(function(tracks) {
				return this.service.playListManager.addItems(playListId, tracks, true);
			}.bind(this));
	} else {
		return this.api.vk.getRecomendationMusic(this.MAX_AUDIO_COUNT)
			.then(function(tracks) {
				return this.service.playListManager.addItems(playListId, tracks, true);
			}.bind(this));
	}
};


/**
 * @param {number} playlistId
 * @param {string|Array.<string>} query
 * @param {number} count
 * @return {Deferred.<number|null>}
 */
Vknp.prototype.search = function(playlistId, count, query) {
	if (query instanceof Array) {
		query = query.join(' ');
	}
	return this.api.vk.audioSearch(query, count)
		.then(function(tracks) {
			tracks = this._scythe(tracks, query);
			return this.service.playListManager.addItems(playlistId, tracks, true);
		}.bind(this));
};


/**
 * @param {number} playlistId
 * @param {number} ownerId
 * @param {number} newsId
 * @param {boolean} replace
 * @return {Deferred.<number|null>}
 */
Vknp.prototype.addAudioFromNews = function(playlistId, ownerId, newsId, replace) {
	return this.api.vk.getAudioFromNews(ownerId, newsId)
		.then(function(tracks) {
			return this.service.playListManager.add(playlistId, tracks, replace);
		}.bind(this));
};


/**
 * @return {boolean}
 */
Vknp.prototype.isFirstStart = function() {
	return ;
};


/**
 */
Vknp.prototype.next = function() {
	this.service.player.next();
};


/**
 */
Vknp.prototype.prev = function() {
	this.service.player.prev();
};


/**
 */
Vknp.prototype.forward = function() {};


/**
 */
Vknp.prototype.reward = function() {};


/**
 */
Vknp.prototype.help = function() {};


Vknp.prototype._initApi = function(config) {
	this.api = {};
	if (config.vk.enabled) {
		this.api.vk = new vknp.api.VK(config.vk)
	}
	if (config.gmusic.enabled) {
		//todo add gmusic api
	}
	if (config.soundcloud.enabled) {
		//todo add soundcloud api
	}
};


Vknp.prototype._initService = function() {
	this.service = {
		player: new vknp.service.Player,
		playListManager: new vknp.service.PlayListManager,
		config: new vknp.service.Config
	};
};


Vknp.prototype._initUI = function(config) {
	this.ui = new vknp.UI(config);
};


/**
 * @param {Array.<AudioTrack>} tracks
 * @param {string} query
 * @private
 */
Vknp.prototype._scythe = function(tracks, query) {
	var tracksObj = {};
	tracks = tracks.filter(function(track) {
		if (query.toLowerCase() != track.artist.toLowerCase()) {
			return false;
		}
		track.title = track.title.toLowerCase();
		if (!tracksObj[track.title]) {
			tracksObj[track.title] = track.url;
			return true;
		}
	});

	tracks.forEach(function(track) {
		track.title = this._prettyTitle(track.title);
	}, this);
	return tracks;
};


/**
 * @param {string} title
 * @return {string}
 * @private
 */
Vknp.prototype._prettyTitle = function(title) {
	var phrase = title.split(' ');
	phrase = phrase.map(function(word) {
		if (word.length > 1) {
			var capital = word.charAt(0).toUpperCase();
			word = capital + word.substr(1);
		}
		return word;
	});

	return phrase.join(' ');
};


/**
 * @type {vknp.Player}
 */
Vknp.prototype.player;


/**
 * @type {PlayListManager}
 */
Vknp.prototype.playlist;


/**
 * @typedef {{
 *      vk: VK
 * }}
 */
Vknp.prototype.api;


/**
 * @typedef {{
 *      console: Console
 * }}
 */
Vknp.prototype.ui;


/**
 * @type {Server}
 */
Vknp.prototype.server;


/**
 * @type {Config}
 */
Vknp.prototype._config;


/**
 * @const {number}
 */
Vknp.prototype.MAX_AUDIO_COUNT = 300;


module.exports = Vknp;
