/**
 * Created by oleg on 08.06.14.
 */
var models = require('../');



/**
 * @param {Object} data
 * @constructor
 */
Album = function(data) {
	goog.base(this, data);
};
goog.inherits(Album, models.AbstractModel);


/**
 * @param {Object} data
 */
Album.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {number}*/
	this.ownerId = data['owner_id'];

	/** @type {number}*/
	this.albumId = data['id'] || data['album_id'];//в апи написано album_id, но приходит id

	/** @type {string}*/
	this.title = data['title'];
};


/**
 * @return {string}
 */
Album.prototype.toString = function() {
	return this.title;
};


module.exports = Album;
