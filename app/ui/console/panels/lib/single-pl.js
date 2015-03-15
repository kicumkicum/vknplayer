var PlayList = require('./playlist');


/**
 * @extends {PlayList}
 * @constructor
 */
var SinglePL = function() {
	goog.base(this, {
		left: '50%',
		top: 2,
		bottom: 4,
		right: 0,
		hidden: false
	});
	this._setOffset(0);
};
goog.inherits(SinglePL, PlayList);


module.exports = SinglePL;
