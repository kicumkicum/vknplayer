/**
 * Created by oleg on 18.10.14.
 */
var models = require('../');



/**
 * @param {Object} data
 * @constructor
 */
NewsItem = function(data) {
	data = data || {};

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
	/** @type {} */
	this.copyHistory = data['copy_history'];
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
	this.attachments = data['attachments'] ? data['attachments'].map(function(attachment) {
		return new models.Attachment(attachment);
	}) : void 0;
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
 * @enum {string}
 */
NewsItem.Types = {
	POST: 'post',// новые записи со стен
	PHOTO: 'photo',//новые фотографии
	PHOTO_TAG: 'photo_tag'//новые отметки на фотографиях
	//etc.
};

module.exports = NewsItem;
