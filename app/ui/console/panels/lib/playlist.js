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
 * @param {Array.<vknp.api.yandexMusic.models.Track|vknp.api.vk.models.AudioTrack>} tracks
 */
PlayList.prototype.setContent = function(tracks) {
	tracks = tracks.map(function(track) {
		return new vknp.models.AudioTrack(track);
	});

	var playlist = this.getPlaylist();
	if (playlist) {
		playlist.setItems(tracks);
		app.ui.console.show(this);
	}
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
 * @protected
 */
PlayList.prototype._updatePlayList = function(tracks) {
	this.setData(tracks);
	app.ui.console.render();
};


/**
 * @protected
 */
PlayList.prototype._update = function() {
	this._data.toArray().forEach(function(item, i) {
		this.addChild(i + '. ' + item.toString())
	}, this);
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


/**
 * @param ch
 * @param key
 * @private
 */
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
		var index = this._highlight();
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
 * @return {number}
 * @private
 */
PlayList.prototype._highlight = function() {
	var index = this._node.selected;

	this.highlightList.chunk.push(index);
	this.highlightList.offset = 0;
	this._node.marker = this._node.items[index];
	this.selectElement(index + 1);

	app.ui.console.render();
	return index;
};


/**
 * @return {*}
 * @private
 */
PlayList.prototype._inverseColor = function() {
	return this._marker;
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
 * @param {number} position
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
 * @param {Object} child
 * @param {AudioTrack} track
 * @return {boolean}
 * @private
 */
PlayList.prototype._isActivePlaylist = function(child, track) {
	//todo is huewiy check. need good check
	return child.content.indexOf(track.toString()) !== -1;
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
