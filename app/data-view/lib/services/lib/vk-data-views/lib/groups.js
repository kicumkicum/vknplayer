var dataViews = require('../');



/**
 * @constructor
 */
var Groups = function() {};
goog.inherits(Groups, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Groups.prototype.getChild = function() {
	return app.api.vk
		.getGroups()
		.map(function(group) {
			return new dataViews.Group(group);
		});
};


/**
 * @inheritDoc
 */
Groups.prototype.toString = function() {
	return 'Groups';
};


module.exports = Groups;
