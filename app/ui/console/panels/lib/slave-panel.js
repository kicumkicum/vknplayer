/**
 * Created by oleg on 01.06.14.
 */
var PlayList = require('./playlist');

/**
 * @extends {PlayList}
 * @constructor
 */
var SlaveList = function() {
	this._playlistPack = [];

	goog.base(this, {
		left: 0,
		top:  2,
		bottom: 4,
		width: '50%',
		hidden: true
	});

	this._playedPlaylistId = this._playlistId;
	this._openPlaylistId = this._playlistId;
};
goog.inherits(SlaveList, PlayList);


/** @inheritDoc */
SlaveList.prototype.setContent = function(tracks) {
	if (this._playedPlaylistId === this._playlistPack[0]) {
		this._playlistId = this._playlistPack[1];
	} else {
		this._playlistId = this._playlistPack[0];
	}
	this._openPlaylistId = this._playlistId;

	goog.base(this, 'setContent', tracks);
	this._playlistId = this._playedPlaylistId;
};


/** @inheritDoc */
SlaveList.prototype._loadData = function() {
	goog.base(this, '_loadData');
	this._playlistPack.push(this._playlistId);

	var playlistId = app.service.playListManager.createEmpty();
	var playlist = app.service.playListManager.getPlayList(playlistId);
	playlist.on(playlist.EVENT_ITEMS_ADDED, this._updatePlayList.bind(this));

	this._playlistPack.push(playlistId);
};


/** @inheritDoc */
SlaveList.prototype._click = function(eventName, select, selectNumber) {
	if (selectNumber === 0) {
		this._back();
		return;
	}

	this._playlistId = this._openPlaylistId;
	this._playedPlaylistId = this._playlistId;
	goog.base(this, '_click', eventName, select, selectNumber);
};


/**
 *
 */
SlaveList.prototype.backPanel;


/**
 * @type {Array.<number>}
 */
SlaveList.prototype._playlistPack;


/**
 * @type {number}
 */
SlaveList.prototype._openPlaylistId;


/**
 * @type {number}
 */
SlaveList.prototype._playedPlaylistId;


module.exports = SlaveList;
