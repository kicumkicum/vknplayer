/**
 * Created by oleg on 27.05.14.
 */
var models = require('../');



Friend = function(data) {
	goog.base(this, data);
};
goog.inherits(Friend, models.AbstractModel);


/**
 * @param {Object} data
 */
Friend.prototype.parse = function(data) {
	goog.base(this, 'parse', data);

	/** @type {number} */
	this.id = data['id'];

	/** @type {string} */
	this.firstName = data['first_name'];

	/** @type {string} */
	this.lastName = data['last_name'];

	/** @type {{
	 *       id: number,
	 *       title: string
	 * }}
	 */
	this.domain = {
		id: data['domain'] ? data['domain']['id'] : null,
		title: data['domain'] ? data['domain']['title'] : ''
	};

	/** @type {number} */
	this.online = data['online'];
};


/**
 * @return {string}
 */
Friend.prototype.toString = function() {
	return this.firstName + ' ' + this.lastName;
};


module.exports = Friend;
