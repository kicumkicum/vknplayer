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
ServiceVK.prototype.getChildren = function() {
	return new clin.Promise(function(resolve, reject) {
		resolve([
			new dataViews.Bookmarks,
			new dataViews.Friends,
			new dataViews.Groups,
			new dataViews.News,
			new dataViews.Playlists
		]);
	});
};


/**
 * @inheritDoc
 */
ServiceVK.prototype.toString = function() {
	return 'Vkontakte';
};


module.exports = ServiceVK;
