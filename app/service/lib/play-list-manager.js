var DataList = require('../../../helper/data-list');

var events = require("events");
var util = require('util');

/**
 * @constructor
 */
var PlayListManager = function() {
	this._pack = [];
	this._activePlaylistId = NaN;
};
goog.inherits(PlayListManager, events.EventEmitter);

/**
 * @type {Array.<vknp.models.AudioTrack>} tracks
 * @return {number}
 */
PlayListManager.prototype.create = function(tracks) {
	var playList = new DataList(tracks);
	return this._push(playList);
};


/**
 * @return {number}
 */
PlayListManager.prototype.createEmpty = function() {
	return this.create([]);
};


/**
 * @param {DataList} playlist
 * @return {number}
 */
PlayListManager.prototype._push = function(playlist) {
	this._pack.push(playlist);
	var id = this._pack.length - 1;
	this.emit(this.EVENT_ADD_PLAYLIST, id);
	return id;
};


/**
 * @param {number} id
 * @return {DataList}
 */
PlayListManager.prototype.getPlayList = function(id) {
	return this._pack[id];
};


/**
 * @param {DataList.<vknp.models.AudioTrack>} playlist
 * @return {number}
 */
PlayListManager.prototype.getId = function(playlist) {
	return this._pack.indexOf(playlist);
};


/**
 * @param {number} id
 * @return {DataList}
 */
PlayListManager.prototype.clear = function(id) {
	this._pack[id].clear();
	this.emit(this.EVENT_CHANGE_PLAYLIST, id);
};


/**
 * @param {number} playlistId
 * @return {boolean}
 */
PlayListManager.prototype.playlistIsEmpty = function(playlistId) {
	return !this._pack[playlistId] && this._pack[playlistId].playlistIsEmpty();
};


/**
 * @param {number} id
 * @param {Array.<vknp.models.AudioTrack>} tracks
 * @return {?number}
 */
PlayListManager.prototype.addItems = function(id, tracks) {
	if (this._pack[id]) {
		this._pack[id].addItems(tracks);
		this.emit(this.EVENT_ITEMS_ADDED, id, tracks);
		if (isNaN(this._activePlaylistId)) {
			this.setActivePlaylist(id);
		}
		return id;
	} else {
		return null;
	}
};



/**
 * @param {number} id
 * @param {number} start
 * @param {number} howMany
 * @return {number}
 */
PlayListManager.prototype.removeItems = function(id, start, howMany) {
	if (this._pack[id]) {
		this._pack[id].removeItems(start, howMany);//todo нужно адаптировать под datalist

		this.emit(this.EVENT_CHANGE_PLAYLIST, id);
		return id;
	} else {
		return null;
	}
};


/**
 * @param {number} id
 * @param {Array.<vknp.models.AudioTrack>} tracks
 * @return {number}
 */
PlayListManager.prototype.concat = function(id, tracks) {//todo нужно адаптировать под datalist
	if (this._pack[id]) {
		this._pack[id].tracks.concat(tracks);
		this._numeration();

		this.emit(this.EVENT_CHANGE_PLAYLIST, id);
		return id;
	} else {
		return null;
	}
};



/**
 * @param {number} playlistId
 * @return {boolean}
 */
PlayListManager.prototype.setActivePlaylist = function(playlistId) {
	if (this._isId(playlistId)) {
		this._activePlaylistId = playlistId;
		return true;
	} else {
		return false;
	}
};


/**
 * @return {number|NaN}
 */
PlayListManager.prototype.getActivePlaylistId = function() {
	return this._activePlaylistId;
};


/**
 * @return {?DataList}
 */
PlayListManager.prototype.getActivePlaylist = function() {
	var id = this._activePlaylistId;
	return this._pack[id] || null;
};


/**
 * @return {?vknp.models.AudioTrack}
 */
PlayListManager.prototype.getCurrentTrack = function() {
	var playlist = this.getActivePlaylist();
    if (playlist) {
        var track = playlist.current();
        return track || null;
    }
};


/**
 * @return {?vknp.models.AudioTrack}
 */
PlayListManager.prototype.next = function() {
	var activePlaylist = this.getActivePlaylist();
	if (activePlaylist) {
		return this._prevNext(activePlaylist, true);
	} else {
		return null;
	}
};


/**
 * @return {?vknp.models.AudioTrack}
 */
PlayListManager.prototype.prev = function() {
	var activePlaylist = this.getActivePlaylist();
	if (activePlaylist) {
		return this._prevNext(activePlaylist, false);
	} else {
		return null;
	}
};


/**
 * @param {number} position
 * @return {vknp.models.AudioTrack}
 */
PlayListManager.prototype.select = function(position) {
	var playlist = this.getActivePlaylist();
	if (position < playlist.size() && position >= 0) {
		if (playlist.selectAt(position)) {
			return playlist.current();
		}
	} else {
		return this.select(0);
	}
};


///**
// * @param playlist
// * @param track
// * @return {vknp.models.AudioTrack}
// * @private
// */
//PlayListManager.prototype._setTrackActive = function(playlist, track) {
//	playlist.position = track.position;
//	playlist.currentTrack = track;
//	return playlist.currentTrack;
//};


/**
 * @param {number} playlistId
 * @return {boolean}
 * @private
 */
PlayListManager.prototype._isId = function(playlistId) {
	return !!(this._pack[playlistId] && this._pack[playlistId].size());
};


/**
 * @param {DataList} playlist
 * @param {boolean} isNext
 * @return {?vknp.models.AudioTrack}
 */
PlayListManager.prototype._prevNext = function(playlist, isNext) {
	//todo сделать очередб для DataList
	//var queue = playlist.getQueue();
	//if (queue.length) {
	//	var track = playlist.removeFromQueue(0);
	//	return this._setTrackActive(playlist, track);
	//}
	isNext ? playlist.selectNextItem() : playlist.selectPrevItem();
	return playlist.current();
};


/**
 * @type {number}
 */
PlayListManager.prototype._activePlaylistId;


/**
 * @type {Array.<DataList>}
 */
PlayListManager.prototype._pack;


/**
 * Fired with: {number} id
 * @type {string}
 */
PlayListManager.prototype.EVENT_CHANGE_PLAYLIST = 'change-playlist';


/**
 * Fired with: {number} id
 * @type {string}
 */
PlayListManager.prototype.EVENT_ADD_PLAYLIST = 'add-playlist';


module.exports = PlayListManager;
