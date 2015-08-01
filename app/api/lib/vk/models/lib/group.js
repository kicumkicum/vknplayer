/**
 * Created by oleg on 08.06.14.
 */
var models = require('../');



/**
 * @param {Object} data
 * @constructor
 */
Group = function(data) {
	data = data || {};
	/** @type {number}*/
	this.id = data['id'] > 0 ? data['id'] * -1 :  data['id'];//id used with minus only
	/** @type {string}*/
	this.name = data['name'];
	/** @type {string}*/
	this.screenName = data['screen_name'];
	/** @type {number}*/
	this.isClosed = data['is_closed'];
	/** @type {string}*/
	this.type = data['type'];
	/** @type {number}*/
	this.isAdmin = data['is_admin'];
	/** @type {number}*/
	this.isMember = data['is_member'];
	/** @type {string}*/
	this.photo50 = data['photo_50'];
	/** @type {string}*/
	this.photo100 = data['photo_100'];
/** @type {string}*/
	this.photo200 = data['photo_200'];

	this.position = NaN;
	return this;
};
goog.inherits(Group, models.AbstractModel);


/**
 * @type {number|NaN}
 */
Group.prototype.position;


/**
 * @return {string}
 */
Group.prototype.toString = function() {
	return this.name;
};


module.exports = Group;
