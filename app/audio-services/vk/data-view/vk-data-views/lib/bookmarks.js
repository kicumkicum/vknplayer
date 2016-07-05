var dataViews = require('../');



/**
 *
 * @constructor
 */
var Bookmarks = function(vkApi) {
	goog.base(this);

	this._vkApi = vkApi;
};
goog.inherits(Bookmarks, dataViews.Abstract);


/**
 * @return {Promise.<Array.<>>}
 */
Bookmarks.prototype.getChildren = function() {
	return this._vkApi
		.getListNewsFeed({count: 100})
		.then(function(feed) {// todo check result
			return feed
				.getAudioAttachments()
				.map(function(track) {
					return new vknp.api.vk.models.AudioTrack(track);
				});
		});
};


/**
 * @inheritDoc
 */
Bookmarks.prototype.toString = function() {
	return 'Bookmarks';
};


module.exports = Bookmarks;
