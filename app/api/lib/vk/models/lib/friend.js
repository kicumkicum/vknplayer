/**
 * Created by oleg on 27.05.14.
 */
var models = require('../');



Friend = function(data) {
	data = data || {};
	if (data) {
		/** @type {number} */
		this.id = data['id'];
		/** @type {string} */
		this.firstName = data['first_name'];
		/** @type {string} */
		this.lastName = data['last_name'];
		/** @typedef{{
		*       id: number,
		*       title: string
		* }} */
		this.domain = data['domain'];
		if (this.domain) {
			/** @type {number} */
			this.domain.id = data['domain']['id'];
			/** @type {string} */
			this.domain.title = data['domain']['title'];
		}
		/** @type {number} */
		this.online = data['online'];
	}

	return this;
};
goog.inherits(Friend, models.AbstractModel);


/**
 * @return {string}
 */
Friend.prototype.toString = function() {
	return this.firstName + ' ' + this.lastName;
};


module.exports = Friend;
