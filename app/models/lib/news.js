/**
 * Created by oleg on 22.08.14.
 */
var NewsItem = require('./news-item');



var News = function(data) {
	data = data || {};

	/** @type {Array.<NewsItem>} */
	this.items = data['items'].map(function(item) {
		return new NewsItem(item);
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
