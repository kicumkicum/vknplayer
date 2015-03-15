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
	this._catalog = {};
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
	this.addChild(this.CategoryName.GROUPS);
	this.addChild(this.CategoryName.FRIENDS);
	this.addChild(this.CategoryName.ALBUMS);
	this.addChild(this.CategoryName.NEWS);
	this.addChild(this.CategoryName.MUSIC);
	this.addChild(this.CategoryName.BOOKMARKS);
};


/**
 * @param {*} select
 * @param {number} selectNumber
 * @private
 */
VK.prototype._click = function(eventName, select, selectNumber) {
	var index = selectNumber - this._getOffset();
	switch (index) {
		case this.CategoryType.GROUPS:
			this._showGroups();
			break;
		case this.CategoryType.FRIENDS:
			this._showFriends();
			break;
		case this.CategoryType.ALBUMS:
			this._showAlbums();
			break;
		case this.CategoryType.NEWS:
			this._showNews(null);
			break;
		case this.CategoryType.BOOKMARKS:
			this._showBookmarks();
			break;
		case this.CategoryType.MUSIC:
			this.showMusic(null);
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
	var groupList = app.ui.console._panels.groupList;
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
	app.api.vk.getAudioAlbums(null, 100)
		.then(function(albums) {
			app.ui.console._panels.albumList.updatePanel(albums, app.ui.console.userId);
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
			app.ui.console._panels.slaveList.setContent(tracks);
		}.bind(this));
};


/**
 * @param {number} ownerId
 * @public
 */
VK.prototype._showNews = function(ownerId) {
	app.ui.console.show(app.ui.console._panels.newsPanel);
};


/**
 * @public
 */
VK.prototype._showBookmarks = function() {
	app.api.vk
		.getListNewsFeed({
			count: 100
		})
		.then(function(list) {
			var tracks = [];
			var news = list.items;
			news.forEach(function(item) {
				if (item.attachments) {
					item.attachments.forEach(function(attachment) {
						if (attachment.audio) {
							tracks.push(attachment.audio);
						}
					})
				}
			});
			app.ui.console._panels.slaveList.setContent(tracks);

		})
};


/**
 * @enum {number}
 */
VK.prototype.CategoryType = {
	GROUPS: 0,
	FRIENDS: 1,
	ALBUMS: 2,
	NEWS: 3,
	BOOKMARKS: 5,
	MUSIC: 4
};


/**
 * @enum {string}
 */
VK.prototype.CategoryName = {
	GROUPS: 'Группы',
	FRIENDS: 'Друзья',
	ALBUMS: 'Альбомы',
	NEWS: 'Музыкальные новости',
	BOOKMARKS: 'Закладки',
	MUSIC: 'Вся музыка'
};


module.exports = VK;
