BlessedConst = new (require('./blessed-const'));

var blessed = require('blessed');
var events = require('events');
var util = require('util');



/**
 * @constructor
 */
Console = function(config) {
	this._config = config;
	this._openPopUps = [];
};
goog.inherits(Console, events.EventEmitter);


/**
 * @param {vknp.service.Player} player
 * @param {vknp.service.PlayListManager} playlist
 */
Console.prototype.init = function(player, playlist) {
	this.screen = blessed.screen({
//		grabKeys: true
	});
	app.api.vk.on('error', this._apiVKErrorHandler.bind(this));
	app.api.vk//todo move to app
		.getUserId()
		.then(function(userId) {
			this.userId = userId;
		}.bind(this));

	this._visiblePanels = {};
	this._history = [];
	this._authPopUp = null;
	this.player = player;
	this.playlist = playlist;

	this.input = this._createInput();
	this.loading = new vknp.ui.console.widgets.Loading;
	this.slaveList = new vknp.ui.console.panel.Slave;
	this.mainList = new vknp.ui.console.panel.Home;
	this.vkList = new vknp.ui.console.panel.VK;
	this.newsPanel = new vknp.ui.console.panel.News;
	this.masterList = new vknp.ui.console.panel.Master;
	this.friendList = new vknp.ui.console.panel.Friend;
	this.playBar = new vknp.ui.console.widgets.PlayBar;
	this.infoBar = new vknp.ui.console.widgets.InfoBar;
	this.controls = new vknp.ui.console.widgets.Controls;
	this.groupList = new vknp.ui.console.panel.Group;
	this.albumList = new vknp.ui.console.panel.Album;

	this._visiblePanels.left = this.mainList;
	this._visiblePanels.right = this.masterList;
	this.activePanel = this._visiblePanels.left;

	this.screen.key(['tab'], this.changeFocusPanel.bind(this));
	this.screen.on(BlessedConst.event.KEY_PRESS, function(ch, key) {
		if (key.name === BlessedConst.button.MOUSE) {
			return;
		}
		if (key.name === BlessedConst.button.SPACE && this.screen.focused !== this.input.getNode()) {
			this.input.getNode().focus();
		}
	}.bind(this));

	app.api.vk.on(app.api.vk.EVENT_START_REQUEST, this.loading.load.bind(this.loading));
	app.api.vk.on(app.api.vk.EVENT_STOP_REQUEST, this.loading.stop.bind(this.loading));

	if (this._authPopUp) {
		this._authPopUp.setIndex(-1);
	}

	this.render();
	this.input.getNode().focus();
};


/**
 */
Console.prototype.changeFocusPanel = function() {
	if (this.activePanel === this._visiblePanels.left) {
		this.setActivePanel(this._visiblePanels.right);
	} else {
		this.setActivePanel(this._visiblePanels.left);
	}
};


/**
 * @param {Object} panel
 */
Console.prototype.setActivePanel = function(panel) {
	if (panel.isHidden()) {
		this._addToHistory(this.activePanel);
	}
	this._setActivePanel(panel);
};


/**
 * @param {Object} panel
 */
Console.prototype._setActivePanel = function(panel) {
	if (panel.isHidden()) {
		this._setTopPanel(panel);
	} else {
		this.activePanel = panel;
		if (panel !== this.masterList) {
			this._visiblePanels.left = panel;
		}
		panel.focus();
	}
};


/**
 * @param {Object} panel
 */
Console.prototype._setTopPanel = function(panel) {
	this.emit(this.EVENT_SET_TOP, panel, this._visiblePanels.left);
	this._visiblePanels.left.getNode().hide();
	this._visiblePanels.left = panel;
	this.activePanel = panel;
	panel.getNode().show();
	panel.getNode().focus();
	this.render();
};


/**
 */
Console.prototype._addToHistory = function(panel) {
	if (this._history.length > 10) {
		this._history.shift();
	}
	this._history.push(panel);
};


/**
 */
Console.prototype.back = function() {
	var panel = this._history.pop();
	this._setActivePanel(panel);
};


/**
 * @param {string} cmd
 */
Console.prototype.exec = function(cmd) {
	var commandList = {
		help: ['help', 'h'],
		play: ['play'],
		pause: ['pause', 'p'],//todo not supported stupid-player
		stop: ['stop', 's'],
		search: ['search'],
		next: ['next'],
		prev: ['prev'],
		forward: ['forward', 'fwd'],//todo not supported stupid-player
		reward: ['reward', 'rwd'],//todo not supported stupid-player
		radio: ['radio', 'r'],
		exit: ['exit', 'quit', 'q']
	};

	if (cmd.indexOf('\n') > -1) {
		var position = cmd.indexOf('\n');
		cmd = cmd.substr(0, position);
	}
	var args = cmd.split(' ');
	var command = args.shift();

	args = args.join(' ');
	var currentCommand = this._searchCommand(commandList, command);

	switch (currentCommand) {
		case commandList.help:
			this.help();
			break;
		case commandList.play:
			app.play(this.masterList.getPlaylistId(), 300, args);
			break;
		case commandList.pause:
			app.pause();
			break;
		case commandList.stop:
			app.stop();
			break;
		case commandList.search:
			app.search(this.masterList.getPlaylistId(), 300, args);
			break;
		case commandList.next:
			app.next();
			break;
		case commandList.radio:
			app.radio(this.masterList.getPlaylistId(), 300, args);
			break;
		case commandList.exit:
			process.exit(0);
			break;
		default:
		//todo
	}
};


/**
 * @param {Object} commandList
 * @param {string} cmd
 * @return {string|undefined}
 * @private
 */
Console.prototype._searchCommand = function(commandList, cmd) {
	for(var i in commandList) {
		if(commandList.hasOwnProperty(i)) {
			for(var j = 0; j < commandList[i].length; j++) {
				if(cmd == commandList[i][j]) {
					return commandList[i];
				}
			}
		}
	}
};


/**
 */
Console.prototype.copy = function() {
	var activePanel = this.activePanel;
	var index = activePanel.getNode().selected;
	var item = activePanel.getChildData(index);
	var playlist = this.masterList.getPlaylist();

	if (activePanel === this.slaveList && item) {
		playlist.addItems([new vknp.models.AudioTrack(item)]);
	}
	if (activePanel === this.friendList && this.friendList.getChild(index) && this.friendList.getChild(index).friend) {
		var friend = this.friendList.getChildData(index);
		app.api.vk
			.getAudio(friend.id, 300)
			.then(function(tracks) {
				playlist.addItems(tracks);
			});
	}
	if (activePanel === this.albumList && index === 1 && this.albumList.getChild(index)) {
		app.api.vk
			.getAudio(this.albumList.ownerId, 300)
			.then(function(tracks) {
				playlist.addItems(tracks);
			});
	}
	if (activePanel === this.albumList && this.albumList.getChild(index) && this.albumList.getChild(index).album) {
		var album = this.albumList.getChildData(index);
		app.api.vk
			.getAudio(album.ownerId, null, album.albumId)
			.then(function(tracks) {
				playlist.addItems(tracks);
			});
	}
	if (activePanel === this.groupList && this.groupList.getChild(index) && this.groupList.getChild(index).group) {
		var group = this.groupList.getChildData(index);
		app.api.vk
			.getAudio(group.id, 300)
			.then(function(tracks) {
				playlist.addItems(tracks);
			});
	}
};


/**
*/
Console.prototype.remove = function() {
	if (this.activePanel === this.masterList) {
		var index = this.activePanel.getNode().selected;
		var child = this.activePanel.getChild(index);
		if (child) {
			var track = this.activePanel.getChild(index).track;
			this.activePanel.getNode().remove(child);
			this.activePanel.playlist.removeItems(track.position, 1);
			this.activePanel.getNode().select(index);
		}
	}
};


/**
*/
Console.prototype.render = function() {
	this.screen.render();
};


/**
 * @param {Node} node
 */
Console.prototype.append = function(node) {
	this.screen.append(node);
};


/**
 * @param {vknp.ui.console.popups} PopUp
 */
Console.prototype.openPopUp = function(PopUp, opt_params) {
	var popup = new PopUp(opt_params);

	this._openPopUps.push(popup);
	popup.on('close', function() {
		this._openPopUps.pop();
		if (this._openPopUps.length) {
			this._openPopUps[this._openPopUps.length - 1].focus();
			this.render();
		}
	}.bind(this));

	popup.focus();
	return popup;
};


/**
 * @return {Input}
 * @private
 */
Console.prototype._createInput = function() {
	var input = new vknp.ui.console.widgets.Input({
		'bottom': 3,
		'left': 'center',
		'width': '99%',
		'height': 1,
		'style': {
			'fg': 'white',
			'bg': 'blue'
		}
	});

	return input;
};


/**
 * @private
 */
Console.prototype._apiVKErrorHandler = function(errorCode, errorMessage) {
	var closeAuthPopUp = function() {
		this._authPopUp.removeListener('close', closeAuthPopUp);
		this._authPopUp = null;
	}.bind(this);

	if (errorCode === 5 && !this._authPopUp) {
		this._authPopUp = this.openPopUp(vknp.ui.console.popups.Authorization);
		//this._authPopUp.setIndex(-1);
		this._authPopUp.on('close', closeAuthPopUp);
		setTimeout(this._authPopUp.focus.bind(this._authPopUp), 2000);//dirty hack for set focused
	}
};


/**
 * @type {vknp.service.Player}
 */
Console.prototype.player;


/**
 * @typedef {{
 *      left: Object.<*>, dynamic
 *      right: Object.<*> static panel playlist only
 * }}
 */
Console.prototype._visiblePanels;


/**
 */
Console.prototype.activePanel;


/**
 * @type {vknp.service.PlayListManager}
 */
Console.prototype.playlist;


/**
 * @type {Screen}
 */
Console.prototype.screen;


/**
 * @type {Input}
 */
Console.prototype.input;


/**
 * @type {vknp.ui.console.panel.Master}
 */
Console.prototype.masterList;


/**
 * @type {vknp.ui.console.panel.Slave}
 */
Console.prototype.slaveList;


/**
 * @type {vknp.ui.console.panel.Home}
 */
Console.prototype.mainList;


/**
 * @type {vknp.ui.console.panel.VK}
 */
Console.prototype.vkList;


/**
 * @type {vknp.ui.console.panel.Album}
 */
Console.prototype.albumList;


/**
 * @type {vknp.ui.console.panel.Group}
 */
Console.prototype.groupList;


/**
 * @type {vknp.ui.console.panel.Friend}
 */
Console.prototype.friendList;


/**
 * @type {PlayBar}
 */
Console.prototype.playBar;


/**
 * @type {InfoBar}
 */
Console.prototype.infoBar;


/**
 * @type {Loading}
 */
Console.prototype.loading;


/**
 * @type {Controls}
 */
Console.prototype.controls;


/**
 * @type {number}
 */
Console.prototype.userId;//todo move to global scope


/**
 * @type {vknp.ui.console.popups.Authorization}
 */
Console.prototype._authPopUp;


/**
 * @type {Array.<vknp.ui.console.popups>}
 */
Console.prototype._openPopUps;



/**
 * @const {string}
 */
Console.prototype.EVENT_SET_TOP  = 'set-top';


module.exports = Console;