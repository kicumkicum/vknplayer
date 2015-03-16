/**
 * Created by oleg on 02.06.14.
 */
var blessed = require('blessed');
var helper = new (require('../../../../../helper/index'));
var util = require('util');

var BasePanel = require('./base-panel');
var BlessedConst = new (require('../../lib/blessed-const'));



/**
 * @extends {BasePanel}
 * @constructor
 */
var PlayList = function(params) {
	goog.base(this, {
		mouse: true,
		keys: true,
		scrollable: true,
		hidden: params.hidden,

		left: params.left,
		top: params.top,
		bottom: params.bottom,
		right: params.right,
		width: params.width,
		height: params.height,

		border: {
			type: 'line'
		},

		style: {
			selected: {
				fg: 'black'
			}
		}
	});
};
goog.inherits(PlayList, BasePanel);


/**
 * @param {DataList.<AudioTrack>} tracks
 */
PlayList.prototype.setContent = function(tracks) {
	this.getPlaylist().clear();
	this.getPlaylist().addItems(tracks);
	app.ui.console.show(this);
};


/**
 * @return {number}
 */
PlayList.prototype.getPlaylistId = function() {
	return this._playlistId;
};


/**
 * @return {DataList.<AudioTrack>}
 */
PlayList.prototype.getPlaylist = function() {
	return app.service.playListManager.getPlayList(this._playlistId);
};


/**
 * @inheritDoc
 */
PlayList.prototype._loadData = function() {
	this._prevSelected = NaN;
	this._markering = {};

	this.highlightList = {
		chunk: [],
		offset: 0
	};

	this._playlistId = app.service.playListManager.createEmpty();
	var playlist = app.service.playListManager.getPlayList(this._playlistId);

	//this.on(this.EVENT_SCROLL, function() {});
	//this.on(this.EVENT_KEY_PRESS, this._keyPressListener.bind(this));
	playlist.on(playlist.EVENT_ITEMS_ADDED, this._updatePlayList.bind(this));
	//this._playlist.on(this._playlist.EVENT_ITEM_REMOVED, this._updatePlayList.bind(this));
	app.service.player.on(app.service.player.EVENT_PLAY, this._afterPlay.bind(this));
};


/**
 * @param select
 * @param {number} selectNumber
 * @protected
 */
PlayList.prototype._clickHandler = function(eventName, select, selectNumber) {
	if (selectNumber === 0 && select === this.ROOT_ELEMENT) {
		this._back();
		return;
	}
	var offset = this._getOffset();
	app.service.player.playPosition(this._playlistId, selectNumber - offset);
};


PlayList.prototype.highlight = function() {
	var index = this._node.selected;
	this.highlightList.chunk.push(index);
	this.highlightList.offset = 0;
	this._node.marker = this._node.items[index];
	this.selectElement(index + 1);
	app.ui.console.render();
	return index;
};


PlayList.prototype.inverseColor = function() {
	return this._marker;
};


/**
 * @param {PlayList.currentTrack} currentTrack
 * @protected
 */
PlayList.prototype._afterPlay = function(currentTrack) {
	if (currentTrack.playlistId !== this._playlistId) {
		return;
	}
	var track = currentTrack.track;
	var position = currentTrack.position + this._getOffset();
	this._colorizePlayingTrack(track, position);
	app.ui.console.render();
};


/**
 * @param {number} chunkStart
 * @param {number} chunkHowMany
 * @param {number} offset
 * @param {boolean} goUp
 * @private
 */
PlayList.prototype._move = function(chunkStart, chunkHowMany, offset, goUp) {
	this.getChildren().forEach(function(child) {
		child.marker = false;
	});
	this._markering = {};
	var extreme;
	if (goUp) {
		extreme = chunkStart + chunkHowMany === this.getChildrenLength() - 1 ? 0 : 1;
	} else {
		extreme = chunkStart + chunkHowMany === 0 ? 1 : -1;
	}
	for (var head = chunkStart - offset - extreme, count = 0; count < chunkHowMany; count++) {
		this._markering[head + count] = true;
	}

	this.getPlaylist().move(chunkStart - offset, chunkHowMany, goUp);//todo adapt to datalist
};


/**
 * @param track
 * @protected
 */
PlayList.prototype._colorizePlayingTrack = function(track, position) {
	if (this._prevSelected && this.getPlaylist().itemAt(this._prevSelected)) {
		this.getChild(this._prevSelected).style = helper.clone(this.defaultStyle);
	}

	var child = this.getChild(position);
	if (child && this._isActivePlaylist(child, track)) {
		this.defaultStyle = helper.clone(child.style);
		this._prevSelected = position;
		child.style.fg = this.activeTrackColor;
		this.selectElement(position);
	}
};


/**
 * @param {Object} child
 * @param {AudioTrack} track
 * @return {boolean}
 * @private
 */
PlayList.prototype._isActivePlaylist = function(child, track) {
	//todo is huewiy check. need good check
	return child.content.indexOf(track.artist) > -1 && child.content.indexOf(track.title) > -1;
};

/**
 * @protected
 */
PlayList.prototype._updatePlayList = function() {
	this.clear();
	var tracks = this.getPlaylist().toArray();
	var offset = 0;

	tracks.forEach(function(track, index) {
		var artist = track.artist || '';
		var title = track.title || '';
		if (this === app.ui.console._panels.mainPL) {
			var duration = track.duration.toString() || '';
		} else {
			duration = '';
		}

		/** @type {Element} */
		var node = this._node;
		var space = this._makeSpace(node, track, index.toString());
		this.addChild(index + '. ' + (artist ? artist + '-' : '') + title + space + duration);
		this.getChild(index + offset).style.inverse = this.inverseColor.bind(this.getChild(index));
		this.getChild(index + offset).marker = this._markering[index + offset];
	}, this);
	this.selectElement(this.getPlaylist().currentIndex());
	app.ui.console.render();
};


PlayList.prototype._keyPressListener = function(ch, key) {
	if (key.name === 'mouse') {
		return;
	}
	var chunk = {
		start: this.highlightList.chunk[0],
		howMany: this.highlightList.chunk.length
	};
	chunk.end = this.highlightList.chunk[chunk.howMany - 1];

	if (key.name === BlessedConst.button.UP && key.ctrl && (chunk.start - this.highlightList.offset) >= 0) {
		this._move(chunk.start, chunk.howMany, this.highlightList.offset, true);
		this.highlightList.offset++;
		return;
	}

	if (key.name === BlessedConst.button.DOWN && key.ctrl && (chunk.end + this.highlightList.offset) < this._node.children.length) {
		this._move(chunk.start, chunk.howMany, this.highlightList.offset, false);
		this.highlightList.offset--;
		return;
	}

	if (key.name === BlessedConst.button.INSERT) {
		var index = this.highlight();
		var element = this._node.children[index];
		element.marker = true;
		this._markering[index] = true;
		app.ui.console.render();
		return;
	}

	this._node.children.forEach(function(child) {
		child.marker = false;
	});
	this.highlightList = {
		chunk: [],
		offset: 0
	};
	this._markering = {};

};


/**
 * @param {Element} node
 * @param {AudioTrack} track
 * @param {string} index
 * @return {string}
 * @protected
 */
PlayList.prototype._makeSpace = function(node, track, index) {
	if (node.lpos && node.lpos.xi && node.lpos.xl) {
		var spaceLength = node.lpos.xl - node.lpos.xi;
	}
	if (spaceLength) {
		spaceLength = spaceLength - track.artist.length - track.title.length - track.duration.toString().length - index.length - 3 - 5;
	}
	var space = '';
	for (var j = 0; j < spaceLength; j++) {
		space = space + ' ';
	}
	return space;
};


/**
 * @typedef {{
 *      left: (number|string),
 *      top: (number|string),
 *  	bottom: (number|string),
 *  	right: (number|string),
 *      width: (number|string),
 *  	height: (number|string),
 *      hidden: boolean
 * }}
 */
PlayList.option;


/**
 * @typedef {{
 *      track: (AudioTrack),
 *      position: (number),
 *  	playlistId: (number)
 * }}
 */
PlayList.currentTrack;


/**
 * @type {number}
 * @protected
 */
PlayList.prototype._playlistId;


/**
 * @type {List}
 */
PlayList.prototype._node;


/**
 * @type {Object}
 */
PlayList.prototype.defaultStyle;


/**
 * @type {Object}
 */
PlayList.prototype._markering;


/**
 * @type {number}
 */
PlayList.prototype.prevSelected;


/**
 * @type {Object.<{
 *      highlightList: array.<number>,
 *      offset: number
 * }>}
 */
PlayList.prototype.highlightList;


/**
 * @const {string}
 */
PlayList.prototype.activeTrackColor = 'blue';


module.exports = PlayList;
