/**
 * Created by oleg on 26.06.14.
 */


var Promise = require('promise');
var events = require('events');
var request = require('request');
var util = require('util');


/**
 * @constructor
 */
var AbstractApi = function() {};
goog.inherits(AbstractApi, events.EventEmitter);


/**
 * @param {string} url
 * @return {Deferred.<Array.<*>>}
 * @protected
 */
AbstractApi.prototype._request = function(url) {
	return new Promise(function(resolve, reject) {
		this.emit('start-request');
		request(url, function(error, response, body) {
			this.emit('stop-request');
			if (error) {
				return reject(error);
			} else {
				return resolve(body);
			}
		}.bind(this));
	}.bind(this));
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
