var dataViews = require('../');



/**
 *
 * @constructor
 * @implements {IDataView}
 */
var Radio = function(data) {
	goog.base(this, data);
};
goog.inherits(Radio, dataViews.Abstract);


/**
 * @return {Promise.<Array.<Main>>}
 */
Radio.prototype.getChild = function() {
	return app.service.radio.parse('http://2kom.tv/channels/radio.m3u');
};


/**
 * @return {string}
 */
Radio.prototype.toString = function() {
	return 'Radio';
};


module.exports = Radio;
