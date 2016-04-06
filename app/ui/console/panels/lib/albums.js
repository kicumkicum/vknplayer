/**
 * Created by oleg on 08.06.14.
 */

var events = require("events");
var BasePanel = require('./base-panel');


/**
 * @constructor
 * @extends {BasePanel}
 */
var Albums = function() {
	goog.base(this);
	this._playlist = app.ui.console._panels.slavePL.getPlaylist();
	this._currentOwnerId = NaN;
	this._children = {};

	app.ui.console.on(app.ui.console.EVENT_SET_TOP, function(newPanel, oldPanel) {
		if (newPanel === this && oldPanel !== app.ui.console._panels.slavePL) {
			this.backPanel = oldPanel;
		}
	}.bind(this));
};
goog.inherits(Albums, BasePanel);


/**
 * @param {Array.<vknp.models.Album>} albums
 * @param {number} ownerId
 */
Albums.prototype.updatePanel = function(albums, ownerId) {
	this._recoveryDefaultState();
	this._currentOwnerId = ownerId;

	this.setData(albums);
	app.ui.console.show(this);
};


/**
 * @inheritDoc
 */
Albums.prototype._clickHandler = function(eventName, item, position) {
	if (position === 0) {
		this._back();
		return;
	}
	if (position === 1) {
		app.ui.console._panels.vk.showMusic(this._currentOwnerId);
	}
	var album = this._getDataItem(position);
	if (album instanceof vknp.models.Album) {
		app.api.vk
			.getAudio(album.ownerId, 300, album.albumId)
			.then(function(tracks) {
				app.ui.console._panels.slavePL.setContent(tracks);
			}.bind(this));
	}
};


Albums.prototype._recoveryDefaultState = function() {
	goog.base(this, '_recoveryDefaultState');
	this.addChild('Вся музыка');
	var offset = this._getOffset();
	this._setOffset(offset + 1);
};


/**
 * @type {DataList.<vknp.models.AudioTrack>}
 */
Albums.prototype._playlist;


/**
 * @type {number}
 */
Albums.prototype._currentOwnerId;


/**
 * @type {Object}
 */
Albums.prototype._children;


module.exports = Albums;
