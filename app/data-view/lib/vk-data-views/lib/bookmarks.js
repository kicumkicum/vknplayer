var dataViews = require('../');



/**
 *
 * @constructor
 */
var Bookmarks = function() {
	goog.base(this);
};
goog.inherits(Bookmarks, dataViews.Abstract);


/**
 * @return {Promise.<Array.<>>}
 */
Bookmarks.prototype.getChildren = function() {
	return app.api.vk
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
