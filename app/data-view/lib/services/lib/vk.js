var dataViewsVK = require('./');



/**
 *
 * @constructor
 */
var ServiceVK = function() {};
goog.inherits(ServiceVK, dataViewsVK.Abstract);


/**
 * @return {Promise.<Array>}
 */
ServiceVK.prototype.getChilds = function() {
	return new vknp.Promise(function(resolve, reject) {
		resolve([
			new dataViewsVK.Playlists,
			new dataViewsVK.Friends,
			new dataViewsVK.Publics,
			new dataViewsVK.News,
			new dataViewsVK.Bookmarks
		]);
	});
};


module.exports = ServiceVK;
