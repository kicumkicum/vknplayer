var dataViews = require('../');



/**
 *
 * @constructor
 */
var News = function() {
	goog.base(this);
};
goog.inherits(News, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
News.prototype.getChild = function() {
	return app.api.vk
		.getListNews()
		.then(function(news) {
			return news.map(function(newsItem) {
				return new dataViews.NewsItem(newsItem);
			});
		});
};


/**
 * @inheritDoc
 */
News.prototype.toString = function() {
	return 'News';
};


module.exports = News;
