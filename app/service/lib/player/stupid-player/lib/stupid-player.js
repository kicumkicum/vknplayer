var lame = require('lame');
var Speaker = require('speaker');

var events = require("events");
var fs = require('fs');
var http = require('http');
var https = require('https');

var util = require('util');


/**
 * @param {string} urlOrPath
 * @constructor
 */
StupidPlayer = function(urlOrPath) {
	this._playBinded = this._play.bind(this);
	this._stopBinded = this.stop.bind(this);
	this.decoder = null;
	this.speaker = null;
	this._src = urlOrPath;
	this.play(urlOrPath);
	events.EventEmitter.call(this);
};
goog.inherits(StupidPlayer, events.EventEmitter);

/**
 * @param {string} src
 */
StupidPlayer.prototype.play = function(src) {
	if (this._isStream()) {
		this.playStream(src);
	} else {
		this.playFile(src);
	}
};


/**
 * @param {string} url
 */
StupidPlayer.prototype.playStream = function(url) {
	var request = url.indexOf('https') === 0 ? https : http;
	var r = request.get(url, this._makeDecoder.bind(this));
	r.on('error', function(error) {
		this._emit('error', error);
	}.bind(this));
};


/**
 * @param {string} file
 */
StupidPlayer.prototype.playFile = function(file) {
	var readStream = fs.createReadStream(file);
	readStream.on('error', function(error) {
		this._emit('error', error);
	}.bind(this));
	this._makeDecoder(readStream);
};


StupidPlayer.prototype.stop = function() {
	if (this._state !== this.state.STOP) {
		this._emit(this.EVENT_STOP);
		this._state = this.state.STOP;
		this.deinit();
	}
};


StupidPlayer.prototype.deinit = function() {
	if (this.speaker instanceof Speaker) {
		this.decoder.removeListener('format', this._playBinded);
		this.decoder.pipe(this.speaker).removeListener('close', this._stopBinded);
		this.decoder.unpipe();
		this.speaker.end();
		this.speaker = null;
	}
};


StupidPlayer.prototype._isStream = function() {
	var src = this._src;
	return src.indexOf('http') === 0 || src.indexOf('https') === 0;
};


StupidPlayer.prototype._makeDecoder = function(res) {
	if (!this._isStream() || this._checkConnect(res, function() {})) {
		this.decoder = new lame.Decoder();
		res.pipe(this.decoder);
		this.decoder.on('format', this._playBinded);
		this.decoder.on('error', function(error) {
			this._emit(this.EVENT_ERROR, error)
		}.bind(this));
	} else {
		this._state = this.state.STOP;
		this._emit(this.EVENT_STOP);
	}
};


StupidPlayer.prototype._play = function(format) {
	if (this._state !== this.state.STOP) {
		this.speaker = new Speaker(format);
		this._emit(this.EVENT_START, this._isStream());
		this._state = this.state.PLAY;
		this.decoder.pipe(this.speaker).on('close', this._stopBinded);
	}
};

StupidPlayer.prototype._checkConnect = function(res, callback) {
	var isOk = (res.statusCode === 200);
	var isAudio = (res.headers['content-type'].indexOf('audio/mpeg') > -1);
	if (!isOk) {
		callback(new Error('resource invalid'));
		return false;
	}
	if (!isAudio) {
		callback(new Error('resource type is unsupported'));
		return false;
	}
	return true;
};


/**
 * @param {string} event
 * @param {*?} opt_data
 * @private
 */
StupidPlayer.prototype._emit = function(event, opt_data) {
//	console.log('stupid-player emit', event);
	this.emit(event, opt_data);
};


/**
 *
 */
StupidPlayer.prototype.decoder;


/**
 *
 */
StupidPlayer.prototype.speaker;


/**
 * @type {string}
 */
StupidPlayer.prototype._src;


/**
 * @const {string}
 */
StupidPlayer.prototype.EVENT_START = 'start';


/**
 * @const {string}
 */
StupidPlayer.prototype.EVENT_STOP = 'stop';


/**
 * Fired with: string
 * @const {string}
 */
StupidPlayer.prototype.EVENT_ERROR = 'error';


/**
 * @enum {string}
 */
StupidPlayer.prototype.state = {
	PLAY: 'play',
	STOP: 'stop',
	PAUSE: 'pause'
};


module.exports = StupidPlayer;