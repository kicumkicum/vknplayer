/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 22.12.13
 * Time: 0:45
 * To change this template use File | Settings | File Templates.
 */

var StupidPlayer = require('stupid-player');
var events = require('events');
var util = require('util');

/**
 * @constructor
 */
Player = function() {
	this._player = new StupidPlayer;

	this._state = this.state.STOP;
	this._realStop = false;
	this._volume = 100;

	this._afterStop = this._afterStop.bind(this);
	this._player.on(this._player.EVENT_STOP, this._afterStop);
	this._player.on(this._player.EVENT_ERROR, this._afterStop);
};
goog.inherits(Player, events.EventEmitter);


/**
 * @param {number} playlistId
 */
Player.prototype.play = function (playlistId) {
    app.service.playListManager.setActivePlaylist(playlistId);
    this._play();
};


/**
 * @param {number} playlistId
 * @param {number} position
 */
Player.prototype.playPosition = function(playlistId, position) {
	app.service.playListManager.setActivePlaylist(playlistId);
    app.service.playListManager.select(position);
	this._play();
};


Player.prototype.pause = function() {
	this._player.pause();
	this._state = this.state.PAUSE;
};


Player.prototype.stop = function() {
//	console.log('STOP');
	if (this._state !== this.state.STOP) {
		this._realStop = true;
		this._state = this.state.STOP;
		this._player.stop();
	}
};


Player.prototype.resume = function() {
	if (this._state === this.state.PAUSE || this._state === this.state.STOP) {
        this._play();
	}
};


Player.prototype.toggle = function() {
	if (this._state !== this.state.PLAY) {
		this.resume();
	} else {
		this.stop();
	}
};


/**
 * @return {PlayListManager}
 */
Player.prototype.getPlayListObject = function() {
	return app.service.playListManager;
};


/**
 * @return {DataList.<vknp.models.AudioTrack>}
 */
Player.prototype.getActivePlayList = function() {
	return app.service.playListManager.getActivePlaylist();
};


/**
 * @return {DataList.<vknp.models.AudioTrack>}
 */
Player.prototype.getPlayList = function(id) {
	return app.service.playListManager.getPlayList(id);
};


/**
 * @param {string} commandList
 */
Player.prototype.help = function(commandList) {
	var helpMessage = 'This is vkNplayer\'s help. List of commands:\n' + helpMessageCommandList(commandList);
	function helpMessageCommandList(cmdList) {
		var str = '';
		for(var i in cmdList) {
			if(cmdList.hasOwnProperty(i)) {
				str += cmdList[i] + ' ';
			}
		}
		return str;
	}

	console.log(helpMessage);
};


Player.prototype.next = function() {
	app.service.playListManager.next();
    this._play();
};


Player.prototype.prev = function() {
	app.service.playListManager.prev();
    this._play();
};


Player.prototype.forward = function() {};


Player.prototype.reward = function() {};


/**
 * @param {number} value 0..100
 */
Player.prototype.setVolume = function(value) {
	value = value < 0 ? 0 :
		(value > 100 ? 100 : value);
	if (this._player) {
		this._volume = value;
		return this._player.setVolume(value / 100);
	} else {
		return vknp.Promise.reject();
	}
};


/**
 * @return {number} 0..100
 */
Player.prototype.getVolume = function() {
	return this._volume;
};


/**
 */
Player.prototype.volumeUp = function() {
	var volume = this.getVolume() + 10;
	if (volume > 100) {
		volume = 100;
	}
	return this.setVolume(volume);
};


/**
 */
Player.prototype.volumeDown = function() {
	var volume = this.getVolume() - 10;
	if (volume < 0) {
		volume = 0;
	}
	return this.setVolume(volume);
};


/**
 * @return {Promise.<undefined>|undefined}
 * @protected
 */
Player.prototype._play = function() {
	if (global.gc) {
		global.gc();
	}

    var track = app.service.playListManager.getCurrentTrack();
    var playlist = app.service.playListManager.getActivePlaylist();
    if (!track) {
        return;
    }

	return track.getUrl()
		.then(function(url) {
			this._state = this.state.PLAY;
			this.emit(this.EVENT_PLAY, {
				track: playlist.current(),
				position: playlist.currentIndex(),
				playlistId: app.service.playListManager.getActivePlaylistId(),
				isStream: true
			});
			return this._player.play(url);
		}.bind(this))
		.then(function() {
			return this.setVolume(this._volume);
		}.bind(this));
};


Player.prototype._afterStop = function() {
	if (this._realStop) {
		this._realStop = false;
	} else {
		this._state = this.state.STOP;
		this.next();
	}
};


/**
 * @type {StupidPlayer}
 */
Player.prototype._player;


/**
 * @type {PlayListManager}
 */
Player.prototype.playlistManager;


/**
 * @type {?Player.state}
 */
Player.prototype._state;


/**
 * @param {boolean}
 */
Player.prototype._realStop;


/**
 * @type {number}
 */
Player.prototype._volume;


/**
 * @enum {number}
 */
Player.prototype.state = {
	PLAY: 'play',
	PAUSE: 'pause',
	STOP: 'stop'
};


/**
 * Fired with: {{
 *      track: vknp.models.AudioTrack,
 *      position: number,
 *      playlistId: number,
 *		isStream: boolean
 * }}
 * @const {string}
 */
Player.prototype.EVENT_PLAY = 'play';



/**
 * Fired with: none
 * @const {string}
 */
Player.prototype.EVENT_STOP = 'stop';



/**
 * Fired with: Array.<vknp.models.AudioTrack>
 * @const {string}
 */
Player.prototype.EVENT_ADD_TRACKS = 'add-tracks';


module.exports = Player;