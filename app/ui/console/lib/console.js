BlessedConst = new (require('./blessed-const'));
var BaseUI = require('../../base-ui');
var HistoryManager = require('../../history-manager');

var blessed = require('blessed');



/**
 * @param config
 * @param dataViews
 * @param api
 * @param player
 * @param playlist
 * @param historyManager
 * @constructor
 * @implements {IUI}
 */
var Console = function(config, dataViews, api, player, playlist, historyManager) {
	goog.base(this, config, dataViews, api, player, playlist, historyManager);

	this._panels = {};
	this._widgets = {};
	this.player = this._player;// todo for compatible. need fix
	this.playlist = this._playlist;
};
goog.inherits(Console, BaseUI);


/**
 */
Console.prototype.init = function() {
	this._openPopUps = [];

	this.screen = blessed.screen({
//		grabKeys: true
	});
	this._api.vk.on(this.EVENT_ERROR, this._apiVKErrorHandler.bind(this));
	this._api.vk//todo move to app or api
		.getUserId()
		.then(function(userId) {
			this.userId = userId;
		}.bind(this));

	this._visiblePanels = {};
	this._history = [];
	this._authPopUp = null;

	this._widgets.input = this._createInput();
	this._widgets.loading = new vknp.ui.console.widgets.Loading;
	this._panels.slavePL = new vknp.ui.console.panels.SlavePL;
	this._panels.mainPL = new vknp.ui.console.panels.MainPL;
	this._widgets.playBar = new vknp.ui.console.widgets.PlayBar;
	this._widgets.infoBar = new vknp.ui.console.widgets.InfoBar;
	this._widgets.controls = new vknp.ui.console.widgets.Controls;
	this._panels.panel = new vknp.ui.console.panels.Panel(this._dataViews, new HistoryManager);

	this._visiblePanels.left = this._panels.panel;
	this._visiblePanels.right = this._panels.mainPL;
	this.activePanel = this._visiblePanels.left;
	this.show(this._panels.panel);

	this.screen.key(['tab'], this.changeFocusPanel.bind(this));
	this.screen.on(BlessedConst.event.KEY_PRESS, function(ch, key) {
		if (key.name === BlessedConst.button.MOUSE) {
			return;
		}
		if (key.name === BlessedConst.button.SPACE && this.screen.focused !== this._widgets.input.getNode()) {
			this._widgets.input.getNode().focus();
		}
	}.bind(this));

	this._api.vk.on(this._api.vk.EVENT_START_REQUEST, this._widgets.loading.load.bind(this._widgets.loading));
	this._api.vk.on(this._api.vk.EVENT_STOP_REQUEST, this._widgets.loading.stop.bind(this._widgets.loading));

	if (this._authPopUp) {
		this._authPopUp.setIndex(-1);
	}

	this.render();
	this._widgets.input.getNode().focus();
};


/**
 */
Console.prototype.changeFocusPanel = function() {
	if (this.activePanel === this._visiblePanels.left) {
		this.show(this._visiblePanels.right);
	} else {
		this.show(this._visiblePanels.left);
	}
};


/**
 * @param {Object} panel
 */
Console.prototype.show = function(panel) {
	if (panel.isHidden()) {
		this._setTopPanel(panel);
	} else {
		this.activePanel = panel;
		if (panel !== this._panels.mainPL) {
			this._visiblePanels.left = panel;
		}
		panel.focus();
	}
};


/**
 */
Console.prototype.back = function() {
	if (this.activePanel instanceof vknp.ui.console.panels.SlavePL) {
		this.show(this._panels.panel);
	}
};



/**
 */
Console.prototype.copy = function() {
	var activePanel = this.activePanel;
	var index = activePanel.getNode().selected;
	var item = activePanel.getChildData(index);
	var playlist = this._panels.mainPL.getPlaylist();

	if (activePanel === this._panels.slavePL && item) {
		playlist.addItems([new vknp.models.AudioTrack(item)]);
	}
	if (activePanel === this._panels.friends && this._panels.friends.getChild(index) && this._panels.friends.getChild(index).friend) {
		var friend = this._panels.friends.getChildData(index);
		this._api.vk
			.getAudio(friend.id, 300)
			.then(function(tracks) {
				playlist.addItems(tracks);
			});
	}
	if (activePanel === this._panels.albums && index === 1 && this._panels.albums.getChild(index)) {
		this._api.vk
			.getAudio(this._panels.albums.ownerId, 300)
			.then(function(tracks) {
				playlist.addItems(tracks);
			});
	}
	if (activePanel === this._panels.albums && this._panels.albums.getChild(index) && this._panels.albums.getChild(index).album) {
		var album = this._panels.albums.getChildData(index);
		this._api.vk
			.getAudio(album.ownerId, null, album.albumId)
			.then(function(tracks) {
				playlist.addItems(tracks);
			});
	}
	if (activePanel === this._panels.groups && this._panels.groups.getChild(index) && this._panels.groups.getChild(index).group) {
		var group = this._panels.groups.getChildData(index);
		this._api.vk
			.getAudio(group.id, 300)
			.then(function(tracks) {
				playlist.addItems(tracks);
			});
	}
};


/**
*/
Console.prototype.remove = function() {
	if (this.activePanel === this._panels.mainPL) {
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
	this.render();
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
 * @type {Screen}
 */
Console.prototype.screen;


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
 * @type {{
 *	    mainPL: console.panels.MainPL,
 *      slavePL: console.panels.SlavePL,
 *	    panel: console.panels.Panel
 * }}
 */
Console.prototype._panels;


/**
 * @type {{
 *      controls: console.widgets.Controls,
 *	    infoBar: console.widgets.InfoBar,
 *	    input: console.widgets.Input,
 *	    loading: console.widgets.Loading,
 *	    playBar: console.widgets.PlayBar
 * }}
 */
Console.prototype._widgets;


/**
 * @const {string}
 */
Console.prototype.EVENT_SET_TOP  = 'set-top';


module.exports = Console;