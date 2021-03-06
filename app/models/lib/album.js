/**
 * Created by oleg on 08.06.14.
 */



/**
 * @param {Object} data
 * @constructor
 */
Album = function(data) {
	data = data || {};
	/** @type {number}*/
	this.ownerId = data['owner_id'] || data.ownerId;
	/** @type {number}*/
	this.albumId = data['id'] || data['album_id'] || data.id || data.albumId;//в апи написано album_id, но приходит id
	/** @type {string}*/
	this.title = data['title'] || data.title;

	return this;
};


/**
 * @return {string}
 */
Album.prototype.toString = function() {
	return this.title;
};


module.exports = Album;
