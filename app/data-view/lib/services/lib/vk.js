var dataViews = require('./vk-data-views');



/**
 *
 * @constructor
 */
var ServiceVK = function() {};
goog.inherits(ServiceVK, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
ServiceVK.prototype.getChilds = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve([
			new dataViews.Bookmark,
			new dataViews.Bookmarks,
			new dataViews.Friend,
			new dataViews.Friends,
			new dataViews.Group,
			new dataViews.Groups,
			new dataViews.News,
			new dataViews.NewsItem,
			new dataViews.Playlist,
			new dataViews.Playlists
		]);
	});
};


module.exports = ServiceVK;
