/**
 * Created by oleg on 03.06.14.
 */


/**
 * @constructor
 */
var Vknp = function() {};


Vknp.prototype.start = function() {
	this.helper = new clin.helper;
	this._initService();
	this._config = this.service.config.getConfig();

	this._initApi(this._config.api);
	this._initDataView(this._config.api);
	this._initUI(this._config.ui);

	this.api.vk.initStats();
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
				return this.service.playListManager.addItems(playListId, this.makeAudioModels(tracks), true);
			}.bind(this));
	} else {
		return this.api.vk.getRecomendationMusic(this.MAX_AUDIO_COUNT)
			.then(function(tracks) {
				return this.service.playListManager.setItems(playListId, this.makeAudioModels(tracks), true);
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
			return this.service.playListManager.setItems(playlistId, this.makeAudioModels(tracks), true);
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
	return this.api.vk
		.getAudioFromNews(ownerId, newsId)
		.then(function(tracks) {
			return this.service.playListManager.add(playlistId, this.makeAudioModels(tracks), replace);
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


/**
 * @return {boolean}
 */
Vknp.prototype.isVkEnabled = function() {
	return !!this._config.api.vk.enabled;
};


/**
 * @return {boolean}
 */
Vknp.prototype.isYandexMusicEnabled = function() {
	return !!this._config.api.yandexMusic.enable;
};


/**
 * @return {boolean}
 */
Vknp.prototype.isGmusicEnabled = function() {
	return !!this._config.api.gmusic.enabled;
};


/**
 * @param {Array} tracks
 */
Vknp.prototype.makeAudioModels = function(tracks) {
	return tracks.map(function(track) {
		return new clin.models.AudioTrack(track);
	});
};


Vknp.prototype._initApi = function(config) {
	this.api = {};

	if (config.vk.enabled) {
		this.api.vk = new clin.api.vk.Api(config.vk);
	}
	if (config.gmusic.enabled) {
		//todo add gmusic api
	}
	if (config.soundcloud.enabled) {
		//todo add soundcloud api
	}
	if (config.yandexMusic.enable) {
		this.api.yandexMusic = new clin.api.yandexMusic.Api(config.yandexMusic);
	}

};


Vknp.prototype._initService = function() {
	this.service = {
		config: new clin.service.Config,
		player: new clin.service.Player,
		playListManager: new clin.service.PlayListManager,
		radio: new clin.service.Radio
	};
};


/**
 * @param config
 * @protected
 */
Vknp.prototype._initDataView = function(config) {
	this._dataViews = new clin.dataViews.Root(config);
};


Vknp.prototype._initUI = function(config) {
	this.ui = new clin.UI(config, this._dataViews, this.service, this.api);
	this.ui.init();
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
 * @type {clin.Player}
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
 * @typedef {{
 *      player: Player,
 *      playListManager: PlayListManager,
 *      config: Config,
 *      radio: Radio
 * }}
 */
Vknp.prototype.service;


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
