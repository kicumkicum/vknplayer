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
var Friends = function() {
	goog.base(this);
};
goog.inherits(Friends, BasePanel);


/**
 * @inheritDoc
 */
Friends.prototype._loadData = function() {
	app.api.vk
		.getFriends(30)
		.then(function(friends) {
			this.setData(friends);
			friends.forEach(function(friend) {
				this._addFriend(friend);
			}, this);
		}.bind(this));
};


/**
 * @param {vknp.models.Friend} friend
 */
Friends.prototype._addFriend = function(friend) {
	this.addChild(friend.toString());
};


/**
 * @inheritDoc
 */
Friends.prototype._clickHandler = function(eventName, item, position) {
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
			app.ui.console._panels.albums.updatePanel(albums, ownerId);
		});
};


module.exports = Friends;
