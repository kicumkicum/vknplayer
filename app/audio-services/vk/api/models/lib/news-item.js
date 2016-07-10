/**
 * Created by oleg on 18.10.14.
 */
var models = require('../index');



/**
 * @param {Object} data
 * @constructor
 */
NewsItem = function(data) {
	goog.base(this, data);
};
goog.inherits(NewsItem, models.AbstractModel);


/**
 * @param {Object} data
 */
NewsItem.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {NewsItem.Types} */
	this.type = data['type'];

	/** @type {} */
	this.sourceId = data['source_id'];

	/** @type {} */
	this.date = data['date'];

	/** @type {} */
	this.postId = data['post_id'];

	/** @type {} */
	this.postType = data['post_type'];

	/** @type {} */
	this.finalPost = data['final_post'];

	/** @type {} */
	this.copyOwnerId = data['copy_owner_id'];

	/** @type {} */
	this.copyPostId = data['copy_post_id'];

	/** @type {Array.<NewsItem>} */
	this.copyHistory = (data['copy_history'] || []).map(function(newsItem) {
		return new models.NewsItem(newsItem);
	});

	/** @type {} */
	this.copyPostDate = data['copy_post_date'];

	/** @type {} */
	this.text = data['text'];

	/** @type {} */
	this.can_edit = data['can_edit'];

	/** @type {} */
	this.can_delete = data['can_delete'];

	/** @type {} */
	this.comments = data['comments'];

	/** @type {} */
	this.likes = data['likes'];

	/** @type {} */
	this.reposts = data['reposts'];

	/** @type {Array.<Attachment>} */
	this.attachments = (data['attachments'] || []).map(function(attachment) {
		return new models.Attachment(attachment);
	});

	/** @type {} */
	this.geo = data['geo'];

	/** @type {} */
	this.photos = data['photos'];

	/** @type {} */
	this.photoTags = data['photo_tags'];

	/** @type {} */
	this.notes = data['notes'];

	/** @type {} */
	this.friends = data['friends'];
};


/**
 * @return {Array.<models.Attachment>}
 */
NewsItem.prototype.getAttachments = function() {
	var attachments = [];

	attachments = attachments.concat(this.attachments);
	this.copyHistory.forEach(function(newsItem) {
		attachments = attachments.concat(newsItem.attachments);
	});

	return attachments;
};


/**
 * @return {Array.<models.AudioTrack>}
 */
NewsItem.prototype.getAudioAttachments = function() {
	var attachments = this.getAttachments();
	return attachments
		.filter(function(attachment) {
			return attachment.type === models.Attachment.Type.AUDIO;
		})
		.map(function(attachment) {
			return attachment.audio;
		});
};


/**
 * @enum {string}
 */
NewsItem.Types = {
	POST: 'post',// новые записи со стен
	PHOTO: 'photo',//новые фотографии
	PHOTO_TAG: 'photo_tag'//новые отметки на фотографиях
	//etc.
};


module.exports = NewsItem;
