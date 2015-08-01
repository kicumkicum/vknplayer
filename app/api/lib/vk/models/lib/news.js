/**
 * Created by oleg on 22.08.14.
 */
var models = require('../');



var News = function(data) {
	goog.base(this, data);
};
goog.inherits(News, models.AbstractModel);


/**
 * @param {Object} data
 */
News.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {Array.<NewsItem>} */
	this.items = data['items'].map(function(item) {
		return new models.NewsItem(item);
	});

	/** @type {} */
	this.profiles = data['profiles'];

	/** @type {} */
	this.groups = data['groups'];

	/** @type {} */
	this.newOffset = data['new_offset'];

	/** @type {} */
	this.nextFrom = data['next_from'];
};


module.exports = News;
