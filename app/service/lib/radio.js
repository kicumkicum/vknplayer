var fs   = require('fs');
var http = require('http');
var https = require('https');
var Promise = require('promise');

var Parser = require('../../../helper/parser');
var parser = Parser.createM3u8();



/**
 * @constructor
 */
var Radio = function() {};


/**
 * @param {string} pathOrUrl
 * @return {Promise}
 */
Radio.prototype.parse = function(pathOrUrl) {
	return new Promise(function(resolve, reject) {
		var readStream = null;

		if (!this._isStream(pathOrUrl)) {
			readStream = fs.createReadStream(pathOrUrl);
			this._parse(resolve, reject, readStream);
		} else {
			var request = pathOrUrl.indexOf('https') === 0 ? https : http;
			request.get(pathOrUrl, function(res) {
				this._parse(resolve, reject, res);
			}.bind(this));
		}
	}.bind(this));
};


/**
 * @param {string} pathOrUrl
 * @return {boolean}
 * @private
 */
Radio.prototype._isStream = function(pathOrUrl) {
	return pathOrUrl.indexOf('http://') === 0 || pathOrUrl.indexOf('https://') === 0;
};


Radio.prototype._parse = function(resolve, reject, readStream) {
	readStream.pipe(parser);
	parser.on(Parser.EVENT_DONE, this._makeAudioTracks.bind(null, resolve));
	parser.on('error', reject);
};


Radio.prototype._makeAudioTracks = function(resolve, m3uItems) {
	var audioTracks = m3uItems['PlaylistItem'].map(function(item) {
		return new clin.models.AudioTrack({
			title: item.properties.title,
			url: item.properties.uri
		});
	});
	resolve(audioTracks);
};


module.exports = Radio;
