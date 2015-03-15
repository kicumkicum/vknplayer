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
	this.category = {
		vk: {
			name: 'VK',
			type: 'vk',
			toString: function() {
				return this.name;
			}
		},
		gmusic: {
			name: 'GMusic',
			type: 'gmusic',
			toString: function() {
				return this.name;
			}
		},
		radio: {
			name: 'Радио',
			type: 'radio',
			toString: function() {
				return this.name;
			}
		}
	};

	goog.base(this, {
		left: 0,
		top:  2,
		bottom: 4,
		width: '50%',
		hidden: false
	});

	this._playlist = app.ui.console._panels.slavePL.getPlaylist();
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
	var items = [];
	if (app.isVkEnabled()) {
		items.push(this.category.vk);
	}
	if (app.isGmusicEnabled()) {
		items.push(this.category.gmusic);
	}
	items.push(this.category.radio);
	this.setData(items);
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
		return new vknp.models.AudioTrack({
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
Home.prototype._clickHandler = function(eventName, select, selectNumber) {
	var item = this._data.itemAt(selectNumber - this._getOffset());
	switch (item.type) {
		case Home.Category.GMUSIC:
			this.showGMusic();
			break;
		case Home.Category.RADIO:
			this.showRadio();
			break;
		case Home.Category.VK:
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
		arr.push(new vknp.models.AudioTrack(track));
	}
	return arr;
};

Home.prototype._recoveryDefaultState = function() {
	this._setOffset(0);
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
Home.Category = {
	VK: 'vk',
	GMUSIC: 'gmusic',
	RADIO: 'radio'
};


module.exports = Home;
