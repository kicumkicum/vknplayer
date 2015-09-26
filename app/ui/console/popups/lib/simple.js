var util = require('util');
var BasePopUp = require('./base');


/**
 * @param {SimplePopUp.param} param
 * @extends {BasePopUp}
 * @constructor
 */
var SimplePopUp = function(param) {
	this._init({
		title: param.title || '',
		message: '\n{center}' + param.message || '' + '{center}',
		left: param.left || 5,
		top: param.top || 5,
		width: param.width || 80,
		height: param.height || 80
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
