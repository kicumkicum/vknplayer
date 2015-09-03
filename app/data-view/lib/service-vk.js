var dataViews = require('../');



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
			new dataViews.Playlists,
			new dataViews.Friends,
			new dataViews.Publics,
			new dataViews.News,
			new dataViews.Bookmarks
		]);
	});
};


module.exports = ServiceVK;
