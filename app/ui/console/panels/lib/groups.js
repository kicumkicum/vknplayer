/**
 * Created by oleg on 08.06.14.
 */

var blessed = require('blessed');
var BasePanel = require('./base-panel');



/**
 * @extends {BasePanel}
 * @constructor
 */
var Groups = function() {
	goog.base(this);
};
goog.inherits(Groups, BasePanel);


/**
 * @inheritDoc
 */
Groups.prototype._loadData = function() {
	app.api.vk
		.getGroups()
		.then(function(groups) {
			this.setData(groups);
		}.bind(this));
};


/**
 * @param {Group} group
 * @private
 */
Groups.prototype._addGroup = function(group) {
	this.addChild(group.name);
};


/**
 * @inheritDoc
 */
Groups.prototype._clickHandler = function(eventName, item, position) {
	if (position === 0) {
		this._back();
		return;
	}
	var group = this._getDataItem(position);
	if (!group) {
		return;
	}

	var id = group.id;
	app.api.vk
		.getAudioAlbums(id, 100)
		.then(function(albums) {
			app.ui.console._panels.albums.updatePanel(albums, id);
		});
};


/**
 *
 */
Groups.prototype.id;


module.exports = Groups;
