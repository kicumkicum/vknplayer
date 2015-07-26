var Promise = require('promise');
var YandexMusicApi = require('yandex-music-api');
var events = require('events');


/**
 * @constructor
 */
var YandexMusic = function() {
	this._api = new YandexMusicApi;
	this.init({username: 'kicumkicum@yandex.ru', password: '11zhlm5a'}).then(function() {
		// place code here
	});
};


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
 * @return {Promise.<vknp.models.yandexMusic.SearchResults>}
 */
YandexMusic.prototype.search = function(query, options) {
	return this._api
		.search(query, options)
		.then(function(response) {
			return new vknp.models.yandexMusic.SearchResults(response);
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
			debugger;
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
			debugger;
			return userPlaylists.map(function(userPlaylist) {
				debugger;
			})
		});
};


/**
 * Get a playlist without tracks
 * @param {String} userId The user ID, if null then equal to current user id
 * @param {String} playlistKind The playlist ID.
 * @return {Promise}
 */
YandexMusic.prototype.getPlaylist = function(userId, playlistKind) {
	return this._api
		.getPlaylist(userId, playlistKind)
		.then(function(a) {
			debugger;
		})
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
 * @return {Promise.<vknp.models.yandexMusic.AccountStatus>}
 */
YandexMusic.prototype.getAccountStatus = function() {
	return this._api
		.getAccountStatus()
		.then(function(status) {
			return new vknp.models.yandexMusic.AccountStatus(status);
		});
};


/**
 * GET: /genres
 * Get a list of music genres
 * @return {Promise.<Array.<vknp.models.yandexMusic.Genre>>}
 */
YandexMusic.prototype.getGenres = function() {
	return this._api
		.getGenres()
		.then(function(genres) {
			return genres.map(function(genre) {
				return new vknp.models.yandexMusic.Genre(genre)
			});
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
