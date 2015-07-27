var AbstractApi = require('./abstract-api');
var Promise = require('promise');
var YandexMusicApi = require('yandex-music-api');

var events = require('events');
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
 * @param {vknp.models.yandexMusic.Track} track
 * @return {Promise.<string>}
 */
YandexMusic.prototype.getTrackUrl = function(track) {
	var head = 'http://storage.music.yandex.ru/get/storage';
	var body = track.storageDir;
	var tail = '2.xml';
	var url = head + '/' + body + '/' + tail;

	return this
		._request(url)
		.then(function(response) {
			response = xml.parseString(response);
			var fileName = response.attrib.filename;
			var url = 'http://storage.music.yandex.ru/download-info/' + track.storageDir + '/' + fileName;
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
				return 'http://'+ host + '/get-mp3/' + token + '/' + ts + path + '?track-id=' + track.id + '&play=false';
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
 * @param {string} t
 * @return {string}
 * @protected
 */
YandexMusic.prototype._hash = function(t) {
	// todo need dynamic download
	var A = String.fromCharCode;
	function N(x, k) {
		return (x << k) | (x >>> (32 - k))
	}
	function M(H, x) {
		var ab, k, G, I, F;
		G = (H & 2147483648);
		I = (x & 2147483648);
		ab = (H & 1073741824);
		k = (x & 1073741824);
		F = (H & 1073741823) + (x & 1073741823);
		if (ab & k) {
			return (F ^ 2147483648 ^ G ^ I)
		}
		if (ab | k) {
			if (F & 1073741824) {
				return (F ^ 3221225472 ^ G ^ I)
			} else {
				return (F ^ 1073741824 ^ G ^ I)
			}
		} else {
			return (F ^ G ^ I)
		}
	}
	function s(k, G, F) {
		return (k & G) | ((~k) & F)
	}
	function r(k, G, F) {
		return (k & F) | (G & (~F))
	}
	function q(k, G, F) {
		return (k ^ G ^ F)
	}
	function o(k, G, F) {
		return (G ^ (k | (~F)))
	}
	function v(G, F, ac, ab, k, H, I) {
		G = M(G, M(M(s(F, ac, ab), k), I));
		return M(N(G, H), F)
	}
	function g(G, F, ac, ab, k, H, I) {
		G = M(G, M(M(r(F, ac, ab), k), I));
		return M(N(G, H), F)
	}
	function J(G, F, ac, ab, k, H, I) {
		G = M(G, M(M(q(F, ac, ab), k), I));
		return M(N(G, H), F)
	}
	function u(G, F, ac, ab, k, H, I) {
		G = M(G, M(M(o(F, ac, ab), k), I));
		return M(N(G, H), F)
	}
	function f(H) {
		var ac;
		var G = H.length;
		var F = G + 8;
		var x = (F - (F % 64)) / 64;
		var ab = (x + 1) * 16;
		var ad = Array(ab - 1);
		var k = 0;
		var I = 0;
		while (I < G) {
			ac = (I - (I % 4)) / 4;
			k = (I % 4) * 8;
			ad[ac] = (ad[ac] | (H.charCodeAt(I) << k));
			I++
		}
		ac = (I - (I % 4)) / 4;
		k = (I % 4) * 8;
		ad[ac] = ad[ac] | (128 << k);
		ad[ab - 2] = G << 3;
		ad[ab - 1] = G >>> 29;
		return ad
	}
	function D(F) {
		var x = "", G = "", H, k;
		for (k = 0; k <= 3;
		     k++) {
			H = (F >>> (k * 8)) & 255;
			G = "0" + H.toString(16);
			x = x + G.substr(G.length - 2, 2)
		}
		return x
	}
	function L(x) {
		x = A(498608 / 5666) + A(39523855 / 556674) + A(47450778 / 578668) + A(82156899 / 760712) + A(5026300 / 76156) + A(26011178 / 298979) + A(28319886 / 496840) + A(23477867 / 335398) + A(21650560 / 246029) + A(22521465 / 208532) + A(16067393 / 159083) + A(94458862 / 882793) + A(67654429 / 656839) + A(82331283 / 840115) + A(11508494 / 143856) + A(30221073 / 265097) + A(18712908 / 228206) + A(21423113 / 297543) + A(65168784 / 556998) + A(48924535 / 589452) + A(61018985 / 581133) + A(10644616 / 163763) + x.replace(/\r\n/g, "\n");
		var k = "";
		for (var G = 0;
		     G < x.length;
		     G++) {
			var F = x.charCodeAt(G);
			if (F < 128) {
				k += A(F)
			} else {
				if ((F > 127) && (F < 2048)) {
					k += A((F >> 6) | 192);
					k += A((F & 63) | 128)
				} else {
					k += A((F >> 12) | 224);
					k += A(((F >> 6) & 63) | 128);
					k += A((F & 63) | 128)
				}
			}
		}
		return k
	}
	var E = Array();
	var R, i, K, w, h, aa, Z, Y, X;
	var U = 7, S = 12, P = 17, O = 22;
	var C = 5, B = 9, z = 14, y = 20;
	var p = 4, n = 11, m = 16, l = 23;
	var W = 6, V = 10, T = 15, Q = 21;
	t = L(t);
	E = f(t);
	aa = 1732584193;
	Z = 4023233417;
	Y = 2562383102;
	X = 271733878;
	for (R = 0; R < E.length;
	     R += 16) {
		i = aa;
		K = Z;
		w = Y;
		h = X;
		aa = v(aa, Z, Y, X, E[R + 0], U, 3614090360);
		X = v(X, aa, Z, Y, E[R + 1], S, 3905402710);
		Y = v(Y, X, aa, Z, E[R + 2], P, 606105819);
		Z = v(Z, Y, X, aa, E[R + 3], O, 3250441966);
		aa = v(aa, Z, Y, X, E[R + 4], U, 4118548399);
		X = v(X, aa, Z, Y, E[R + 5], S, 1200080426);
		Y = v(Y, X, aa, Z, E[R + 6], P, 2821735955);
		Z = v(Z, Y, X, aa, E[R + 7], O, 4249261313);
		aa = v(aa, Z, Y, X, E[R + 8], U, 1770035416);
		X = v(X, aa, Z, Y, E[R + 9], S, 2336552879);
		Y = v(Y, X, aa, Z, E[R + 10], P, 4294925233);
		Z = v(Z, Y, X, aa, E[R + 11], O, 2304563134);
		aa = v(aa, Z, Y, X, E[R + 12], U, 1804603682);
		X = v(X, aa, Z, Y, E[R + 13], S, 4254626195);
		Y = v(Y, X, aa, Z, E[R + 14], P, 2792965006);
		Z = v(Z, Y, X, aa, E[R + 15], O, 1236535329);
		aa = g(aa, Z, Y, X, E[R + 1], C, 4129170786);
		X = g(X, aa, Z, Y, E[R + 6], B, 3225465664);
		Y = g(Y, X, aa, Z, E[R + 11], z, 643717713);
		Z = g(Z, Y, X, aa, E[R + 0], y, 3921069994);
		aa = g(aa, Z, Y, X, E[R + 5], C, 3593408605);
		X = g(X, aa, Z, Y, E[R + 10], B, 38016083);
		Y = g(Y, X, aa, Z, E[R + 15], z, 3634488961);
		Z = g(Z, Y, X, aa, E[R + 4], y, 3889429448);
		aa = g(aa, Z, Y, X, E[R + 9], C, 568446438);
		X = g(X, aa, Z, Y, E[R + 14], B, 3275163606);
		Y = g(Y, X, aa, Z, E[R + 3], z, 4107603335);
		Z = g(Z, Y, X, aa, E[R + 8], y, 1163531501);
		aa = g(aa, Z, Y, X, E[R + 13], C, 2850285829);
		X = g(X, aa, Z, Y, E[R + 2], B, 4243563512);
		Y = g(Y, X, aa, Z, E[R + 7], z, 1735328473);
		Z = g(Z, Y, X, aa, E[R + 12], y, 2368359562);
		aa = J(aa, Z, Y, X, E[R + 5], p, 4294588738);
		X = J(X, aa, Z, Y, E[R + 8], n, 2272392833);
		Y = J(Y, X, aa, Z, E[R + 11], m, 1839030562);
		Z = J(Z, Y, X, aa, E[R + 14], l, 4259657740);
		aa = J(aa, Z, Y, X, E[R + 1], p, 2763975236);
		X = J(X, aa, Z, Y, E[R + 4], n, 1272893353);
		Y = J(Y, X, aa, Z, E[R + 7], m, 4139469664);
		Z = J(Z, Y, X, aa, E[R + 10], l, 3200236656);
		aa = J(aa, Z, Y, X, E[R + 13], p, 681279174);
		X = J(X, aa, Z, Y, E[R + 0], n, 3936430074);
		Y = J(Y, X, aa, Z, E[R + 3], m, 3572445317);
		Z = J(Z, Y, X, aa, E[R + 6], l, 76029189);
		aa = J(aa, Z, Y, X, E[R + 9], p, 3654602809);
		X = J(X, aa, Z, Y, E[R + 12], n, 3873151461);
		Y = J(Y, X, aa, Z, E[R + 15], m, 530742520);
		Z = J(Z, Y, X, aa, E[R + 2], l, 3299628645);
		aa = u(aa, Z, Y, X, E[R + 0], W, 4096336452);
		X = u(X, aa, Z, Y, E[R + 7], V, 1126891415);
		Y = u(Y, X, aa, Z, E[R + 14], T, 2878612391);
		Z = u(Z, Y, X, aa, E[R + 5], Q, 4237533241);
		aa = u(aa, Z, Y, X, E[R + 12], W, 1700485571);
		X = u(X, aa, Z, Y, E[R + 3], V, 2399980690);
		Y = u(Y, X, aa, Z, E[R + 10], T, 4293915773);
		Z = u(Z, Y, X, aa, E[R + 1], Q, 2240044497);
		aa = u(aa, Z, Y, X, E[R + 8], W, 1873313359);
		X = u(X, aa, Z, Y, E[R + 15], V, 4264355552);
		Y = u(Y, X, aa, Z, E[R + 6], T, 2734768916);
		Z = u(Z, Y, X, aa, E[R + 13], Q, 1309151649);
		aa = u(aa, Z, Y, X, E[R + 4], W, 4149444226);
		X = u(X, aa, Z, Y, E[R + 11], V, 3174756917);
		Y = u(Y, X, aa, Z, E[R + 2], T, 718787259);
		Z = u(Z, Y, X, aa, E[R + 9], Q, 3951481745);
		aa = M(aa, i);
		Z = M(Z, K);
		Y = M(Y, w);
		X = M(X, h)
	}
	var j = D(aa) + D(Z) + D(Y) + D(X);
	return j.toLowerCase()
};


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
