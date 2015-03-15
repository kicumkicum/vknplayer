var PlayList = require('./playlist');


/**
 * @extends {PlayList}
 * @constructor
 */
var MasterList = function() {
	goog.base(this, {
		left: '50%',
		top: 2,
		bottom: 4,
		right: 0,
		hidden: false
	});
	this._setOffset(0);
};
goog.inherits(MasterList, PlayList);


module.exports = MasterList;
