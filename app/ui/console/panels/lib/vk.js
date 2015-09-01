/**
 * Created by oleg on 08.06.14.
 */
goog.provide('VK');
//goog.require('Node');
var Node = require('../../lib/node');//todo for inherits. check it

var blessed = require('blessed');
var BasePanel = require('./base-panel');


/**
 * @constructor
 * @extends {BasePanel}
 */
var VK = function() {
	this._category = [];
	goog.base(this, {
		mouse: true,
		keys: true,
		scrollable: true,
		hidden: true,

		left: 0,
		top:  2,
		bottom: 4,
		width: '50%',

		border: {
			type: 'line'
		},

		style: {
			selected: {
				fg: 'black'
			}
		}
	});
};
goog.inherits(VK, BasePanel);


/**
 * @private
 */
VK.prototype._init = function() {
	goog.base(this, '_init');

	for (var i in VK.Category) {
		this._category.push(VK.Category[i]);
	}

	this.setData(this._category);
};


/**
 * @param {*} select
 * @param {number} selectNumber
 * @private
 */
VK.prototype._clickHandler = function(eventName, select, selectNumber) {
	if (selectNumber === 0) {
		this._back();
		return;
	}

	var item = this._getDataItem(selectNumber);
	if (!item) {
		return;
	}
	switch (item.toString()) {
		case VK.Category.GROUPS:
			this._showGroups();
			break;
		case VK.Category.FRIENDS:
			this._showFriends();
			break;
		case VK.Category.ALBUMS:
			this._showAlbums();
			break;
		case VK.Category.NEWS:
			this._showNews(null);
			break;
		case VK.Category.BOOKMARKS:
			this._showBookmarks();
			break;
		default :
			this._back();
	}
};


/**
 * @type {Object.<Box>}
 */
VK.prototype.category;


/**
 * @private
 */
VK.prototype._showGroups = function() {
	var groupList = app.ui.console._panels.groups;
	app.ui.console.show(groupList);
};


/**
 * @private
 */
VK.prototype._showFriends = function() {
	var friendList = app.ui.console._panels.friends;
	app.ui.console.show(friendList);
};


/**
 * @private
 */
VK.prototype._showAlbums = function() {
	app.api.vk
		.getAudioAlbums(null, 100)
		.then(function(albums) {
			albums = albums.map(function(album) {
				return new vknp.models.Album(album);
			});
			app.ui.console._panels.albums.updatePanel(albums, app.ui.console.userId);
		});
};


/**
 * @param {number} ownerId
 * @public
 */
VK.prototype.showMusic = function(ownerId) {
	app.api.vk
		.getAudio(ownerId, 300)
		.then(function(tracks) {
			app.ui.console._panels.slavePL.setContent(tracks);
		}.bind(this));
};


/**
 * @param {number} ownerId
 * @public
 */
VK.prototype._showNews = function(ownerId) {
	app.ui.console.show(app.ui.console._panels.news);
};


/**
 * @public
 */
VK.prototype._showBookmarks = function() {
	app.api.vk
		.getListNewsFeed({
			count: 100
		})
		.then(function(feed) {
			var tracks = feed.getAudioAttachments();
			app.ui.console._panels.slavePL.setContent(tracks);
		});
};


/**
 * @type {Array.<VK.Category>}
 */
VK.prototype._category;


/**
 * @enum {string}
 */
VK.Category = {
	ALBUMS: 'Плейлисты',
	FRIENDS: 'Друзья',
	GROUPS: 'Сообщества',
	NEWS: 'Новости',
	BOOKMARKS: 'Закладки'
};


module.exports = VK;
