var models = require('../');



/**
 * @param {*} data
 * @constructor
 */
var Event = function(data) {
	goog.base(this, data);
};
goog.inherits(Event, models.AbstractModel);


/**
 * @param {Object} data
 */
Event.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {models.Artist} */
	this.artist = data['artist'];

	/** @type {string} */
	this.id = data['id'];

	/** @type {Object} */
	this.title = data['title'];

	/** @type {Array.<models.Track>} */
	this.tracks = this.parseArray(data['tracks'], models.Track);
};


module.exports = Event;
