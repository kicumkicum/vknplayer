/**
 * Created by oleg on 22.08.14.
 */
var models = require('../index');



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


/**
 * @return {Array.<models.Attachment>}
 */
News.prototype.getAttachments = function() {
	return this.items.map(function(item) {
		return item.getAttachments();
	});
};


/**
 * @return {Array.<models.Attachment>}
 */
News.prototype.getAudioAttachments = function() {
	var audioAttachments = [];

	this.items.forEach(function(item) {
		audioAttachments = audioAttachments.concat(item.getAudioAttachments());
	});

	return audioAttachments.filter(function(attachment) {
		return attachment;
	});
};


module.exports = News;
