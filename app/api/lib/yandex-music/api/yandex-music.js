var AbstractApi = require('../../../lib/abstract-api');
var Promise = require('promise');
var YandexMusicApi = require('yandex-music-api');

var events = require('events');
var models = require('../models');
var xml = require('node-xml-lite');

/**
 * @params {{
 *      login: string,
 *      password: string
 * }}
 * @constructor
 */
var YandexMusic = function(params) {
	this._api = new YandexMusicApi;

	this.init({username: params.login, password: params.password}).then(function() {
		// place code here
	});

	this._getMagicScript()
		.then(function(func) {
			eval(this.getMagicHash.functionName + ' = ' + func);
		}.bind(this));
};
goog.inherits(YandexMusic, AbstractApi);


/**
 * Authentication
 * @return {Promise}
 */
YandexMusic.prototype.init = function(user) {
	return this._api.init(user);
};


/**
 * @param {string} query
 * @param {YandexMusic.SearchOptions} options
 * @return {Promise.<models.SearchResults>}
 */
YandexMusic.prototype.search = function(query, options) {
	return this._api
		.search(query, options)
		.then(function(response) {
			return new models.SearchResults(response);
		}, function(error) {
			console.log(error);
		});
};


/**
 * Get the user's feed
 * @return {Promise}
 */
YandexMusic.prototype.getFeed = function() {
	return this._api
		.getFeed()
		.then(function(response) {
			return new models.Feed(response);
		}, function(error) {
			console.log(error);
		});
};


/**
 * Get a user's playlists.
 * @param {String} userId The user ID, if null then equal to current user id
 * @return {Promise}
 */
YandexMusic.prototype.getUserPlaylists = function(userId) {
	return this._api
		.getUserPlaylists(userId)
		.then(function(userPlaylists) {
			return userPlaylists.map(function(userPlaylist) {
				return new models.Playlist(userPlaylist);
			});
		});
};


/**
 * Get a playlist without tracks
 * @param {?string} userId The user ID, if null then equal to current user id
 * @param {string} playlistKind The playlist ID.
 * @return {Promise}
 */
YandexMusic.prototype.getPlaylist = function(userId, playlistKind) {
	return this._api
		.getPlaylist(userId, playlistKind)
		.then(function(playlist) {
			return new models.Playlist(playlist);
		});
};


/**
 * Get an array of playlists with tracks
 * @param {String} userId The user ID, if null then equal to current user id
 * @param {Array.<String>} playlistsKind The playlist ID.
 * @param {Object} [options] Options: mixed {Boolean}, rich-tracks {Boolean}
 * @return {Promise}
 */
YandexMusic.prototype.getPlaylists = function(userId, playlistsKind, options) {
	return this._api
		.getPlaylists(userId, playlistsKind, options)
		.then(function(a) {
			debugger;
		});
};


/**
 * Create a new playlist
 * @param {String} name The name of the playlist
 * @param {Object} [options] Options: visibility {String} (public|private)
 * @return {Promise}
 */
YandexMusic.prototype.createPlaylist = function(name, options) {
	return this._api
		.createPlaylist(name, options)
		.then(function(a) {
			debugger
		});
};


/**
 * Remove a playlist
 * @param {String} playlistKind The playlist ID.
 * @return {Promise}
 */
YandexMusic.prototype.removePlaylist = function(playlistKind) {
	return this._api
		.removePlaylist(playlistKind)
		.then(function(a) {
			debugger;
		});
};


/**
 * Change playlist name
 * @param {String} playlistKind The playlist ID.
 * @param {String} name New playlist name.
 * @return {Promise}
 */
YandexMusic.prototype.renamePlaylist = function(playlistKind, name) {
	return this._api
		.renamePlaylist(playlistKind, name)
		.then(function(a) {
			debugger;
		});
};


/**
 * Add tracks to the playlist
 * @param {String} playlistKind The playlist's ID.
 * @param {Object[]} tracks An array of objects containing a track info:
 * track id and album id for the track.
 * Example: [{id:'20599729', albumId:'2347459'}]
 * @param {String} revision Operation id for that request
 * @param {Object} [options] Options: at {Int}
 * @return {Promise}
 */
YandexMusic.prototype.addTracksToPlaylist = function(playlistKind, tracks, revision, options) {
	return this._api
		.addTracksToPlaylist(playlistKind, tracks, revision, options)
		.then(function(a) {
			debugger;
		});
};


/**
 * Remove tracks from the playlist
 * @param {String} playlistKind The playlist's ID.
 * @param {Object[]} tracks An array of objects containing a track info:
 * track id and album id for the track.
 * Example: [{id:'20599729', albumId:'2347459'}]
 * @param {String} revision Operation id for that request
 * @param {Object} [options] Options: from {Int}, to {Int}
 * @return {Promise}
 */
YandexMusic.prototype.removeTracksFromPlaylist = function(playlistKind, tracks, revision, options) {
	return this._api
		.removeTracksFromPlaylist(playlistKind, tracks, revision, options)
		.then(function(a) {
			debugger;
		});
};


/**
 * Get account status for current user
 * @return {Promise.<models.AccountStatus>}
 */
YandexMusic.prototype.getAccountStatus = function() {
	return this._api
		.getAccountStatus()
		.then(function(status) {
			return new models.AccountStatus(status);
		});
};


/**
 * GET: /genres
 * Get a list of music genres
 * @return {Promise.<Array.<models.Genre>>}
 */
YandexMusic.prototype.getGenres = function() {
	return this._api
		.getGenres()
		.then(function(genres) {
			return genres.map(function(genre) {
				return new models.Genre(genre);
			});
		});
};


/**
 * @param {number} id
 * @param {string} storageDir
 * @return {Promise.<string>}
 */
YandexMusic.prototype.getTrackUrl = function(id, storageDir) {
	var head = 'http://storage.music.yandex.ru/get/storage';
	var body = storageDir;
	var tail = '2.xml';
	var url = head + '/' + body + '/' + tail;

	return this
		._request(url)
		.then(function(response) {
			response = xml.parseString(response);
			var fileName = response.attrib.filename;
			var url = 'http://storage.music.yandex.ru/download-info/' + storageDir + '/' + fileName;
			return this._request(url);
		}.bind(this))
		.then(function(response) {
			response = xml.parseString(response);
			var childs = response.childs;

			var host = childs[0].childs[0];
			var path = childs[1].childs[0];
			var ts = childs[2].childs[0];
			var s = childs[4].childs[0];
			var token = this.getMagicHash(path.substr(1) + s);

			if (token) {
				return 'http://'+ host + '/get-mp3/' + token + '/' + ts + path + '?track-id=' + id + '&play=false';
			} else {
				return null;
			}
		}.bind(this));
};


/**
 * @param {string} path
 */
YandexMusic.prototype.getMagicHash = function(path) {};


/**
 * @type {string}
 */
YandexMusic.prototype.getMagicHash.functionName = 'YandexMusic.prototype.getMagicHash';


/**
 * @return {Promise|*}
 * @protected
 */
YandexMusic.prototype._getMagicScript = function() {
	var rxp = /(?:"player\/helpers\/md5\.js"\:function\(d,a,b,e\){)([\s\S]*)(?:;d\.exports=c)/;
	var url = 'https://music.yandex.ru/api/v1.6/index.js?v=0.1.5hotfix05';

	return this._request(url)
		.then(function(response) {
			var result = rxp.exec(response)[1];
			return result.substr(6).replace(/\n/g,  '').replace(/"/g, '\'');
		});

};


/**
 * @type {YandexMusicApi}
 */
YandexMusic.prototype._api;


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
