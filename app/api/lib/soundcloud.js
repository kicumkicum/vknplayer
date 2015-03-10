/**
 * Created by oleg on 27.06.14.
 */


var util = require('util');
var events = require('events');

var SoundCloud = function() {};
goog.inherits(SoundCloud, events.EventEmitter);


SoundCloud.prototype._requestWrapper = function(body) {
	var header = 'https://soundcloud.com/';
	var tail = '.json?client_id=' + this._clientId;
	var url = header + body + tail;

	return this._request(url)
		.then(function(response) {
			response = JSON.parse(response);
			if (response['error']) {
				return this._errorHandler(response);
			}
			return response['response']['items'] || response['response'];
		}.bind(this));
};


SoundCloud.prototype.connect = function(clientId, redirectUri, responseType, scope, display, state) {

};


SoundCloud.prototype.oauth2Token = function() {

};


SoundCloud.prototype.users = function() {

};


SoundCloud.prototype.tracks = function() {

};


SoundCloud.prototype.playlists = function() {

};


SoundCloud.prototype.groups = function() {

};


SoundCloud.prototype.comments = function() {

};


SoundCloud.prototype.me = function() {

};


SoundCloud.prototype.meConnections = function() {

};


SoundCloud.prototype.meActivities = function() {

};


SoundCloud.prototype.apps = function() {

};


SoundCloud.prototype.resolve = function() {

};


SoundCloud.prototype.oembed = function() {

};


module.exports = SoundCloud;
