/**
 * Created by oleg on 08.06.14.
 */

var blessed = require('blessed');
var events = require("events");
var BasePanel = require('./base-panel');


/**
 * @constructor
 * @extends {BasePanel}
 */
var AlbumList = function() {
	goog.base(this);
	this._playlist = app.ui.console._panels.slaveList.getPlaylist();
	this._currentOwnerId = NaN;
	this._children = {};

	app.ui.console.on(app.ui.console.EVENT_SET_TOP, function(newPanel, oldPanel) {
		if (newPanel === this && oldPanel !== app.ui.console._panels.slaveList) {
			this.backPanel = oldPanel;
		}
	}.bind(this));
};
goog.inherits(AlbumList, BasePanel);


/**
 * @param {Array.<vknp.models.Album>} albums
 * @param {number} ownerId
 */
AlbumList.prototype.updatePanel = function(albums, ownerId) {
	goog.base(this, 'updatePanel', arguments);
	this._currentOwnerId = ownerId;

	this.addChild('Вся музыка');
	var offset = this._getOffset();
	this._setOffset(offset + 1);

	this._setData(albums);
	albums.forEach(function(album) {
		this._addAlbum(album);
	}.bind(this));
	app.ui.console.setActivePanel(this);
};


/**
 * @param {vknp.models.Album} album
 */
AlbumList.prototype._addAlbum = function(album) {
	this.addChild(album.title);
};



/**
 * @inheritDoc
 */
AlbumList.prototype._click = function(eventName, item, position) {
	if (position === 0) {
		this._back();
		return;
	}
	if (position === 1) {
		app.ui.console._panels.vkList.showMusic(this._currentOwnerId);
	}
	var album = this._getDataItem(position);
	if (album instanceof vknp.models.Album) {
		app.api.vk
			.getAudio(album.ownerId, 300, album.albumId)
			.then(function(tracks) {
				app.ui.console._panels.slaveList.setContent(tracks);
			}.bind(this));
	}
};


/**
 * @type {DataList.<vknp.models.AudioTrack>}
 */
AlbumList.prototype._playlist;


/**
 * @type {number}
 */
AlbumList.prototype._currentOwnerId;


/**
 * @type {Object}
 */
AlbumList.prototype._children;


module.exports = AlbumList;
