/**
 * Created by oleg on 18.10.14.
 */
var models = require('../');



/**
 * @param {Object} data
 * @constructor
 */
Attachment = function(data) {
	data = data || {};

    /** @type {} */
	this.type = data['type'];

	/** @type {} */
	this.photo = data['photo'];
	/** @type {} */
	this.postedPhoto = data['posted_photo'];
	/** @type {} */
	this.video = data['video'];
	/** @type {AudioTrack} */
	this.audio = data['audio'] ? new models.AudioTrack(data['audio']) : void 0;
	/** @type {} */
	this.doc = data['doc'];
	/** @type {} */
	this.graffiti = data['graffiti'];
	/** @type {} */
	this.link = data['link'];
	/** @type {} */
	this.note = data['note'];
	/** @type {} */
	this.app = data['app'];
	/** @type {} */
	this.poll = data['poll'];
	/** @type {} */
	this.page = data['page'];
	/** @type {} */
	this.album = data['album'];
	/** @type {} */
	this.photosList = data['photos_list'];
};
goog.inherits(Attachment, models.AbstractModel);


/**
 * @enum {string}
 */
Attachment.Type = {
    AUDIO: 'audio'
    //etc
};


module.exports = Attachment;
