var models = require('../');



var Playlist = function(data) {
	goog.base(this, data);
};
goog.inherits(Playlist, models.AbstractModel);


/**
 * @param {Object} data
 */
Playlist.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {string} */
	this.cover = data['cover'];

	/** @type {Date} */
	this.created = data['created'];

	/** @type {number} */
	this.kind = data['kind'];

	/** @type {Date} */
	this.modified = data['modified'];

	/** @type {vknp.models.yandexMusic.Account} */
	this.owner = data['owner'];

	/** @type {number} */
	this.revision = data['revision'];

	/** @type {string} */
	this.title = data['title'];

	/** @type {number} */
	this.trackCount = data['trackCount'];

	/** @type {number} */
	this.uid = data['uid'];

	/** @type {string} */
	this.visibility = data['visibility'];
};


module.exports = Playlist;
