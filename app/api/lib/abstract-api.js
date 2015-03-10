/**
 * Created by oleg on 26.06.14.
 */


var Q = require('q');
var request = require('request');
var util = require('util');
var events = require('events');



var AbstractApi = function() {};
goog.inherits(AbstractApi, events.EventEmitter);

/**
 * @param {string} url
 * @return {Deferred.<Array.<*>>}
 * @protected
 */
AbstractApi.prototype._request = function(url) {
	var d = Q.defer();
	this.emit('start-request');
	request(url, function(error, response, body) {
		this.emit('stop-request');
		return d.resolve(body);
	}.bind(this));
	return d.promise;
};


/**
 * Fired with: albumId
 * @const {string}
 */
AbstractApi.prototype.EVENT_STOP_REQUEST = 'stop-request';


/**
 * Fired with: albumId
 * @const {string}
 */
AbstractApi.prototype.EVENT_START_REQUEST = 'start-request';


module.exports = AbstractApi;
