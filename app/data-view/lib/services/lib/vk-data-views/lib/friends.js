var dataViews = require('../');



/**
 *
 * @constructor
 */
var Friends = function() {};
goog.inherits(Friends, dataViews.Abstract);


/**
 * @return {Promise.<Array.<dataViews.Friend>>}
 */
Friends.prototype.getChild = function() {
	return app.api.vk
		.getFriends(30)
		.then(function(friends) {
			return friends.map(function(friend) {
				return new dataViews.Friend(friend);
			});
		});
};


/**
 * @return {string}
 */
Friends.prototype.toString = function() {
	return 'Friends';
};


module.exports = Friends;
