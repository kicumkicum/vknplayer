var m3u8 = require('m3u8');
var fs   = require('fs');
var Promise = require('promise-polyfill');


var Radio = function() {
	this.parse('/home/oleg/Projects/rest/vknplayer/app/service/lib/playlist.m3u8');
};


Radio.prototype.parse = function(pathOrUrl) {
	return new Promise(function(resolve, reject) {
		if (!this._isStream(pathOrUrl)) {
			var parser = m3u8.createStream();
			var file = fs.createReadStream(pathOrUrl);
			file.pipe(parser);

			parser.on('m3u', function(m3u) {
				var arr = m3u['items']['PlaylistItem'].map(function(item) {
					return new vknp.models.AudioTrack(item.properties);
				});
				resolve(arr);
			});
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


module.exports = Radio;
