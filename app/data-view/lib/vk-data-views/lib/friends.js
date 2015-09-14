var dataViews = require('../');



/**
 *
 * @constructor
 */
var Friends = function() {
	goog.base(this);
};
goog.inherits(Friends, dataViews.Abstract);


/**
 * @return {Promise.<Array.<dataViews.Friend>>}
 */
Friends.prototype.getChildren = function() {
	return app.api.vk
		.getFriends(300)
		.then(function(friends) {
			return friends.map(function(friend) {
				return new dataViews.Friend(friend);
			});
		});
};


/**
 * @inheritDoc
 */
Friends.prototype.toString = function() {
	return 'Friends';
};


module.exports = Friends;
