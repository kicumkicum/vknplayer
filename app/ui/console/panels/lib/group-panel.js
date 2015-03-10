/**
 * Created by oleg on 08.06.14.
 */

var blessed = require('blessed');
var BasePanel = require('./base-panel');



/**
 * @extends {BasePanel}
 * @constructor
 */
var GroupList = function() {
	goog.base(this);
};
goog.inherits(GroupList, BasePanel);


/**
 * @inheritDoc
 */
GroupList.prototype._loadData = function() {
	app.api.vk
		.getGroups()
		.then(function(groups) {
			this._setData(groups);
			groups.forEach(function(group) {
				this._addGroup(group);
			}, this);
		}.bind(this));
};


/**
 * @param {Group} group
 * @private
 */
GroupList.prototype._addGroup = function(group) {
	this.addChild(group.name);
};


/**
 * @inheritDoc
 */
GroupList.prototype._click = function(eventName, item, position) {
	if (position === 0) {
		this._back();
		return;
	}
	var ownerId = this._getDataItem(position).id;
	app.api.vk
		.getAudioAlbums(ownerId, 100)
		.then(function(albums) {
			app.ui.console.albumList.updatePanel(albums, ownerId);
		});
};


/**
 *
 */
GroupList.prototype.id;


module.exports = GroupList;
