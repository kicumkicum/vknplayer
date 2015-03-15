/**
 * Created by oleg on 27.05.14.
 */

var blessed = require('blessed');
var events = require("events");
var util = require('util');

var BasePanel = require('./base-panel');

/**
 * @extends {BasePanel}
 * @constructor
 */
var FriendList = function() {
	goog.base(this);
};
goog.inherits(FriendList, BasePanel);


/**
 * @inheritDoc
 */
FriendList.prototype._loadData = function() {
	app.api.vk
		.getFriends(30)
		.then(function(friends) {
			this._setData(friends);
			friends.forEach(function(friend) {
				this._addFriend(friend);
			}, this);
		}.bind(this));
};


/**
 * @param {vknp.models.Friend} friend
 */
FriendList.prototype._addFriend = function(friend) {
	this.addChild(friend.toString());
};


/**
 * @inheritDoc
 */
FriendList.prototype._click = function(eventName, item, position) {
	if (position === 0) {
		this._back();
		return;
	}

	var friend = this._getDataItem(position);
	if (!friend) {
		return;
	}

	var ownerId = friend.id;
	app.api.vk
		.getAudioAlbums(ownerId, 100)
		.then(function(albums) {
			app.ui.console._panels.albumList.updatePanel(albums, ownerId);
		});
};


module.exports = FriendList;
