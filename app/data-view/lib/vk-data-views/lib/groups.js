var dataViews = require('../');



/**
 * @constructor
 */
var Groups = function() {
	goog.base(this);
};
goog.inherits(Groups, dataViews.Abstract);


/**
 * @return {Promise.<Array>}
 */
Groups.prototype.getChildren = function() {
	return app.api.vk
		.getGroups()
		.then(function(groups) {
			return groups.map(function(group) {
				return new dataViews.Group(group);
			});
		})

};


/**
 * @inheritDoc
 */
Groups.prototype.toString = function() {
	return 'Groups';
};


module.exports = Groups;
