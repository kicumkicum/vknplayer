/**
 * @param {*} data
 * @constructor
 */
var Cover = function(data) {
	data = data || {};
	/** @type {string} */
	this.prefix = data['prefix'];

	/** @type {string} */
	this.type = data['type'];

	/** @type {string} */
	this.uri = data['uri'];
};


module.exports = Cover;
