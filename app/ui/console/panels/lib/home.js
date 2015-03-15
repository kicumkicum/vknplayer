/**
 * Created by oleg on 21.06.14.
 */
var pl = require('../../../../../radio/playlist.json');
var blessed = require('blessed');
var util = require('util');

var BasePanel = require('./base-panel');

/**
 * @constructor
 * @extends {BasePanel}
 */
var Home = function() {
	goog.base(this, {
		left: 0,
		top:  2,
		bottom: 4,
		width: '50%',
		hidden: false
	});

	this._playlist = app.ui.console._panels.slavePL.getPlaylist();
	this.category = {};
};
goog.inherits(Home, BasePanel);


/**
 * @private
 */
Home.prototype._init = function() {
	goog.base(this, '_init');
};

/**
 * @private
 */
Home.prototype._loadData = function() {
	this.addChild('VK');
	this.addChild('GoogleMusic');
	this.addChild('Радио');
};


/**
 */
Home.prototype.showVK = function() {
	app.ui.console.show(app.ui.console._panels.vk);
};


/**
 */
Home.prototype.showGMusic = function() {
	app.api.gmusic
		.getCollection()
		.then(function(playlist) {
			playlist = playlist.split('\n');
			var arr = this._createTracks(playlist);
			app.ui.console._panels.slavePL.setContent(tracks);
		}.bind(this));
};


/**
 * @public
 */
Home.prototype.showRadio = function() {
	var stations = pl['playlist'].map(function(station, i) {
		return new AudioTrack({
			url: station.Url,
			title: station.Title,
			duration: 0
		});
	});
	app.ui.console._panels.slavePL.setContent(stations);
};


/**
 * @param {*} select
 * @param {number} selectNumber
 * @private
 */
Home.prototype._click = function(eventName, select, selectNumber) {
	switch (selectNumber) {
		case this.CategoryType.GMUSIC:
			this.showGMusic();
			break;
		case this.CategoryType.RADIO:
			this.showRadio();
			break;
		case this.CategoryType.VK:
			this.showVK();
			break;
	}
};


/**
 * @param {string} playlist
 * @return {Array.<vknp.models.AudioTrack>}
 * @private
 */
Home.prototype._createTracks = function(playlist) {
	var arr = [];
	for (var i = 1, track, length = playlist.length, str, endPos, artistAndTitle; i < length; i += 2) {
		track = {};
		str = playlist[i].substr(playlist[i].indexOf(':') + 1);
		endPos = str.indexOf(',');
		track.duration = str.substr(0, endPos);
		str = str.substr(endPos + 1);
		artistAndTitle = str.split(' - ');
		track.artist = artistAndTitle[0];
		track.title = artistAndTitle[1];

		track.url = playlist[i + 1];
		arr.push(new AudioTrack(track));
	}
	return arr;
};


/**
 * @type {Object.<Box>}
 */
Home.prototype.category;


/**
 * @type {DataList.<vknp.models.AudioTrack>}
 */
Home.prototype._playlist;


/**
 * @enum {number}
 */
Home.prototype.CategoryType = {
	VK: 0,
	GMUSIC: 1,
	RADIO: 2
};


module.exports = Home;
