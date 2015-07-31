/**
 * Created by oleg on 02.05.14.
 */


var AbstractApi = require('../../../lib/abstract-api');

var util = require('util');
var events = require('events');
var models = require('../models');
//"authUrl": "https://oauth.vk.com/authorize?client_id=4072914&scope=audio,offline&redirect_uri=http://109.227.206.91:8888&display=popup&v=5.21&response_type=token",
//"authUrl": "https://oauth.vk.com/authorize?client_id=4072914&scope=audio,offline&redirect_uri=https://oauth.vk.com/blank.htm&display=popup&v=5.21&response_type=token",


/**
 * @constructor
 * @extends {AbstractApi}
 */
var VK = function(config) {
	goog.base(this);
	this._config = config;
	this._token = config.token;
	//todo exec stats.trackVisitor for start statistic
};
goog.inherits(VK, AbstractApi);


/**
 * @param {string} body
 * @return {?Promise.<Array.<*>>}
 */
VK.prototype._requestWrapper = function(body) {
	if (!this._token) {
		this.emit('error', 5);
	}
	var header = 'https://api.vk.com/method/';
	var tail = (this.VERSION ? '&v=' + this.VERSION : '') + (this._token ? '&access_token=' + this._token : '');
	var url = header + body + tail;

	return this
		._request(url)
		.then(function(response) {
			response = JSON.parse(response);
			if (response['error']) {
				this.emit('error', response['error']);
			}
			return response['response'];
		}.bind(this));
};


/**
 * @param {string} exec
 */
VK.prototype.execute = function(exec) {
	var body = 'execute?' +
		'code=' + exec;
	return this._requestWrapper(body);
};


/**
 * @param {boolean} isShot
 * @return {string}
 */
VK.prototype.getAuthUrl = function(isShot) {
	var cfg = this._config;
	if (isShot) {
		return cfg.shortAuthUrl;
	} else {
		return cfg.authServer +
			'?client_id=' + cfg.clientId +
			'&scope=' + cfg.scope +
			'&redirect_uri=' + cfg.redirectUri +
			'&display=' + cfg.display +
			'&response_type=' + cfg.responseType;
	}
};


/**
 * @return {string}
 */
VK.prototype.getExternalAuthUrl = function() {
	return this._config.externalAuthServer;
};


/**
 * @return {Promise.<number>}
 */
VK.prototype.getUserId = function() {
	var body = 'users.get?';
	return this._requestWrapper(body)
		.then(function(user) {
			return user[0]['id'];
		});
};


/**
 * @param artist
 * @param count
 * @return {Promise.<Array.<models.AudioTrack>>}
 */
VK.prototype.audioSearch = function(artist, count) {
	var body = 'audio.search?q=' + artist +
		'&performer_only=1' +
		'&count=' + count;

	return this._requestWrapper(body)
		.then(function(response) {
			var tracks = response['items'] || [];
			return tracks.map(function(track) {
				return new models.AudioTrack(track);
			});
		});
};


/**
 * @param {number=} opt_ownerId
 * @param {number=} opt_count
 * @param {number=} opt_albumId
 * @return {Promise.<Array.<models.AudioTrack>>}
 */
VK.prototype.getAudio = function(opt_ownerId, opt_count, opt_albumId) {
	var body = 'audio.get?' +
		(opt_ownerId ? 'owner_id=' + opt_ownerId : '') +
		(opt_count ? '&count=' + opt_count : '') +
		(opt_albumId ? '&album_id=' + opt_albumId : '');

	return this._requestWrapper(body)
		.then(function(response) {
			var tracks = response['items'];
			return tracks.map(function(track) {
				return new models.AudioTrack(track);
			});
		});
};

/**
 * @param {?number} ownerId
 * @param {number=} opt_count
 * @return {Promise.<Array.<models.Album>>}
 */
VK.prototype.getAudioAlbums = function(ownerId, opt_count) {
	var body = 'audio.getAlbums?' +
		(ownerId ? '&owner_id=' + ownerId : '') +
		(opt_count ? '&count=' + opt_count : '');

	return this._requestWrapper(body)
		.then(function(response) {
			var albums = response['items'];
			return albums.map(function(album) {
				return new models.Album(album);
			});
		});
};


/**
 * @param {string} title
 * @return {?Promise.<number>}
 */
VK.prototype.createAudioAlbum = function(title) {
	if (title) {
		var body = 'audio.addAlbum?' +
			'title=' + title;
		return this._requestWrapper(body)
			.then(function(albumId) {
				this.emit(this.EVENT_ADD_ALBUM, albumId);
				return albumId;
			}.bind(this));
	} else {
		return null;//todo good it?
	}

};


/**
 * @param {number} albumId
 * @return {Promise.<boolean>}
 */
VK.prototype.deleteAudioAlbum = function(albumId) {
	var body = 'audio.deleteAlbum?' +
		'album_id=' + albumId;
	return this._requestWrapper(body)
		.then(function(result) {
			if (!!result) {
				this.emit(this.EVENT_REMOVE_ALBUM, albumId)
			}
			return !!result;
		}.bind(this));
};


/**
 * @param {number} albumId
 * @param {string} title
 * @return {*|Promise}
 */
VK.prototype.renameAudioAlbum = function(albumId, title) {
	var body = 'audio.editAlbum?' +
		'album_id=' + albumId +
		'&title=' + title;
	return this
		._requestWrapper(body)
		.then(function(result) {
			if (!!result) {
				this.emit(this.EVENT_RENAME_ALBUM, albumId)
			}
			return !!result;
		}.bind(this));
};


/**
 * @param {number} albumId
 * @param {string} audioIds number split comma
 * @return {Promise.<boolean>}
 */
VK.prototype.moveAudioToAlbum = function(albumId, audioIds) {
	var body = 'audio.moveToAlbum?' +
		 'album_id=' + albumId +
		 '&audio_ids=' + audioIds;
	return this
		._requestWrapper(body)
		.then(function(result) {
			if (!!result) {
				this.emit(this.EVENT_ADD_AUDIO_TO_ALBUM, albumId)
			}
			return !!result;
		}.bind(this));
};


/**
 * @param {number} ownerId
 * @param {number} newsId
 * @return {Promise.<Array.<models.AudioTrack>>}
 */
VK.prototype.getAudioFromNews = function(ownerId, newsId) {
	var body = 'wall.getById' +
		'?posts=' + ownerId + '_' + newsId;
	return this
		._requestWrapper(body)
		.then(function(response) {
			var items = response['items'];
			if (items[0]['attachments']) {
				return this._getAudioFromNews(items[0]['attachments']);
			} else if (items[0]['copy_history'] && items[0]['copy_history'][0]['attachments']) {
				return this._getAudioFromNews(items[0]['copy_history'][0]['attachments']);
			}
		}.bind(this));
};


/**
 * @param {string} artist
 * @param {number} count
 * @return {Promise.<Array.<models.AudioTrack>>}
 */
VK.prototype.getRadio = function(artist, count) {
	return this
		._checkArtist(artist)
		.then(function(trackOrOwnerId) {
			if (trackOrOwnerId instanceof Array || trackOrOwnerId instanceof models.AudioTrack) {
				return trackOrOwnerId;
			} else {
				return this._addRemoveAudio(trackOrOwnerId, artist, count);
			}
		}.bind(this))
		.then(function(track) {
			if (track instanceof Array) {
				return track;
			} else {
				return this._getRadio(track, count);
			}
		}.bind(this))
		.then(function(tracks) {
			return tracks.map(function(track) {
				return new models.AudioTrack(track);
			})
		});
};


/**
 * @param {number} count
 * @return {Promise.<Array.<models.AudioTrack>>}
 */
VK.prototype.getRecomendationMusic = function(count) {
	var body = 'audio.getRecommendations?' +
			'&count=' + count +
			'&shuffle=' + 0;
	return this
		._requestWrapper(body)
		.then(function(response) {
			var tracks = response['items'] || [];
			return tracks.map(function(track) {
				return new models.AudioTrack(track);
			})
		});
};


/**
 * @param {number} count
 * @return {Promise.<Array.<models.Friend>>}
 */
VK.prototype.getFriends = function(count) {
	var body = 'friends.get?' +
		'order=hints' +
		'&count=' + count +
		'&fields=online';

	return this
		._requestWrapper(body)
		.then(function(response) {
			var friends = response['items'];
			return friends.map(function(item) {
				return new models.Friend(item);
			});
		});
};


/**
 * @return {Promise.<models.Group>}
 */
VK.prototype.getGroups = function() {
	var body = 'groups.get?' +
		'extended=' + 1;

	return this
		._requestWrapper(body)
		.then(function(response) {
			var groups = response['items'];
			return groups.map(function(group) {
				return new models.Group(group);
			})
		});
};


/**
 * @param {{
 *      listIds: (string|undefined),
 *      filter: (string|undefined),
 *      count: (string|undefined)
 * }} params
 * @return {Promise.<models.Group>}
 */
VK.prototype.getNews = function(params) {
	var body = 'newsfeed.get' +
		(params.listIds ? '?source_ids=' + 'list{' + params.listIds + '}' : '?') +
		'&filters=' + params.filter +
		'&count=' + params.count;

	return this
		._requestWrapper(body)
		.then(function(response) {
			var news = response['items'];//todo work with time
			news = news.map(function(newsItem) {
				return new models.NewsItem(newsItem);
			});
			return {
				startFrom: response['start_from'],
				news: news
			}
		});
};


/**
 * @return {Promise.<{
 *      title: string,
 *      id: number
 * }>}
 */
VK.prototype.getListNews = function() {
	var body = 'newsfeed.getLists?';

	return this
		._requestWrapper(body)
		.then(function(response) {
			var list = response['items'];
			return list.map(function(item) {
				return {
					title: item['title'],
					id: item['id']
				};
			})
		});
};


/**
 * @param {{
 *      offset: (number|undefined),
 *      count: (number|undefined)
 *      extended: (number|undefined),
 * }} params
 * @return {Promise.<>}
 */
VK.prototype.getListNewsFeed = function(params) {
	var body = 'fave.getPosts?' +
		(params.offset ? '&offset=' + params.offset : '') +
		(params.count ? '&count=' + params.count : '') +
		(params.extended ? '&extended=' + params.extended : '');

	return this
		._requestWrapper(body)
		.then(function(response) {
			var items = response['items'];
			items = items.map(function(item) {
				return new models.NewsItem(item);
			});
			return {
				count: response['count'],
				items: items
			};
		});
};


/**
 * @param {number} ownerId
 * @param {number} trackId
 * @return {Promise.<number>}
 */
VK.prototype.addAudio = function(ownerId, trackId) {
	var body = 'audio.add' +
		'?audio_id=' + trackId +
		'&owner_id=' + ownerId;
	return this._requestWrapper(body);
};


/**
 * @param {number} ownerId
 * @param {number} trackId
 * @return {Promise.<number>}
 */
VK.prototype.deleteAudio = function(ownerId, trackId) {
	var body = 'audio.delete' +
		'?audio_id=' + trackId +
		'&owner_id=' + ownerId;
	return this._requestWrapper(body);
};


/**
 * @return {Promise.<number>}
 */
VK.prototype.initStats = function() {
	var body = 'stats.trackVisitor';
	return this._requestWrapper(body);
};


/**
 * @param {AudioTrack} track
 * @param {number} count
 * @return {Promise.<Array.<*>>}
 * @private
 */
VK.prototype._getRadio = function(track, count) {
	if (track) {
		var targetAudio = track.ownerId + '_' + track.id;
		var body = 'audio.getRecommendations?' +
			'target_audio=' + targetAudio +
			'&count=' + count +
			'&shuffle=' + 0;

		return this._requestWrapper(body)
			.then(function(response) {
				return response['items'];
			});
	}
};


/**
 * @param {string} artist
 * @return {Promise.<AudioTrack|number>}
 * @private
 */
VK.prototype._checkArtist = function(artist) {
	return this
		.getAudio()
		.then(function(tracks) {
			var arr = tracks.filter(function(track) {
				if (track.artist.toLowerCase() === artist.toLowerCase()) {
					return true;
				}
			});
			if (arr && arr.length) {
				return arr[0];
			} else {
				return tracks[0].ownerId;
			}
		});
};


/**
 * @param {number} ownerId
 * @param {string} artist
 * @param {count} count
 * @return {Promise.<Array.<models.AudioTrack>>}
 * @private
 */
VK.prototype._addRemoveAudio = function(ownerId, artist, count) {
	var resultTracks = [];
	var addedTrack;
	return this
		.audioSearch(artist, 50)
		.then(function(tracks) {
			return this.addAudio(tracks[0].ownerId, tracks[0].id)
		}.bind(this))
		.then(function(trackId) {
			if (trackId) {
				addedTrack = {
					ownerId: ownerId,
					id: trackId
				};
				return this._getRadio(addedTrack, count);
			}
		}.bind(this))
		.then(function(tracks) {
			resultTracks = tracks;
			return this.deleteAudio(addedTrack.ownerId, addedTrack.id)
		}.bind(this))
		.then(function() {
			return resultTracks;
		})
};


/**
 * @param error
 * @return {undefined}
 * @private
 */
VK.prototype._errorHandler = function(error) {
	console.log(error['error']['error_code']);
	console.log(error['error']['error_msg']);
	if (error['error']['error_code'] == 5) {
		console.log(this.getAuthUrl());
	}
	return;
};


/**
 * @param {Array.<*>} items
 * @return {Promise.<models.AudioTrack>}
 * @private
 */
VK.prototype._getAudioFromNews = function(items) {
	return items
		.map(function(item) {
			if (item['audio']) {
				return new models.AudioTrack(item['audio']);
			}
		})
		.filter(function(item) {
			return !!item;
		});
};


/**
 * @type {string}
 */
VK.prototype._token;


/**
 * @type {models.Config}
 */
VK.prototype._config;


/**
 * Fired with: albumId
 * @const {string}
 */
VK.prototype.EVENT_ADD_ALBUM = 'add-album';


/**
 * Fired with: albumId
 * @const {string}
 */
VK.prototype.EVENT_REMOVE_ALBUM = 'remove-album';


/**
 * Fired with: albumId
 * @const {string}
 */
VK.prototype.EVENT_RENAME_ALBUM = 'rename-album';


/**
 * Fired with: albumId
 * @const {string}
 */
VK.prototype.EVENT_ADD_AUDIO_TO_ALBUM = 'add-audio-to-album';


/**
 * Fired with: albumId
 * @const {string}
 */
VK.prototype.EVENT_STOP_REQUEST = 'stop-request';


/**
 * Fired with: albumId
 * @const {string}
 */
VK.prototype.EVENT_START_REQUEST = 'start-request';


/**
 * Fired with: none
 * @const {string}
 */
VK.prototype.EVENT_AUTHORIZATION_FAILED = 'authorization-failed';


/**
 * @const {string}
 */
VK.prototype.VERSION = '5.21';


module.exports = VK;
