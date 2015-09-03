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
ServiceVK.prototype.getChild = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve([
			new dataViews.Bookmarks,
			new dataViews.Friends,
			new dataViews.Groups,
			new dataViews.News,
			new dataViews.Playlists
		]);
	});
};


module.exports = ServiceVK;
