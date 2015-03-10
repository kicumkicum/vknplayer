var util = require('util');
var BasePopUp = require('./base');


/**
 * @param {SimplePopUp.param} param
 * @extends {BasePopUp}
 * @constructor
 */
var SimplePopUp = function(param) {
	this._init({
		title: param.title,
		message: param.message,
		left: param.left,
		top: param.top,
		width: param.width,
		height: param.height
	});
};
goog.inherits(SimplePopUp, BasePopUp);


/**
 * @typedef {{
 *      title: string,
 *      message: string,
 *      left: number,
 *      top: number,
 *      width: number,
 *      height: number
 * }}
 */
SimplePopUp.param;


module.exports = SimplePopUp;
