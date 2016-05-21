/**
 * Created by oleg on 27.05.14.
 */

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
		.getFriends(300)
		.then(function(friends) {
			this.setData(friends);
		}.bind(this));
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
