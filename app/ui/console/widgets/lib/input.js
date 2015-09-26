/**
 * Created by oleg on 21.07.14.
 */
var blessed = require('blessed');
var util = require('util');

var BlessedConst = new (require('../../lib/blessed-const'));
var Node = require('../../lib/node');



/**
 * @param {Input.params} params
 * @constructor
 * @extends {Node}
 */
var Input = function(params) {
	this._node = this._createNode(params);
	this._history = [];
	this._offset = 0;
	if (!params.parent) {
		app.ui.console.append(this._node);
	}

	this._node.key(BlessedConst.button.ENTER, function(ch, key) {
		this._offset = 0;
		var command = this._node.getText().trim();
		this._history.push(command);

		this._node.clearValue();
		app.ui.console.render();
		this.exec(command);
	}.bind(this));

	this._node.key(BlessedConst.button.ESCAPE, function(ch, key) {
		app.ui.console.show(app.ui.console.activePanel);
	});

	this._node.on(BlessedConst.event.FOCUS, function() {
		this._node.readInput(function(err, value) {});
	}.bind(this));

	this._node.on(BlessedConst.event.KEY_PRESS, function(ch, key) {
		if (this._isFunctionKey(key)) {
			this._node.emit('funckey', key);
		} else if (this._isArrow(key)) {
			this._commandHistory(key);
		} else if (this._isBreak(key)) {
			this._node.clearValue();
			app.ui.console.render();
		}
	}.bind(this));
};
goog.inherits(Input, Node);


/**
 * @return {Textarea}
 */
Input.prototype.getNode = function() {
	return this._node;
};

/**
 * @param {Input.params} params
 * @private
 */
Input.prototype._init = function(params) {
};


/**
 * @param {Input.params} params
 * @return {Textarea}
 * @private
 */
Input.prototype._createNode = function(params) {
	params.style = params.style || {};
	return blessed.textarea({
		'parent': params.parent,
		'keys': true,
		'mouse': true,
		'bottom': params.bottom,
		'left': params.left,
		'width': params.width,
		'height': params.height,
		'style': {
			'fg': params.style.fg,
			'bg': params.style.bg
		}
	});
};


/**
 * @param key
 * @return {boolean}
 * @private
 */
Input.prototype._isFunctionKey = function(key) {
	return key.name && key.name.indexOf('f') > -1 && key.name.length > 1;
};


/**
 * @param key
 * @return {boolean}
 * @private
 */
Input.prototype._isArrow = function(key) {
	return key.name === 'up' || key.name === 'down' || key.name === 'left' || key.name === 'right';
};


/**
 * @param key
 * @return {boolean}
 * @private
 */
Input.prototype._isBreak = function(key) {
	return key.ctrl && key.name === 'c';
};


/**
 * @param {string} cmd
 */
Input.prototype.exec = function(cmd) {
	var commandList = {//todo add clear
		clear: ['clear'],
		exit: ['exit', 'quit', 'q'],
		forward: ['forward', 'fwd'],//todo not supported stupid-player
		help: ['help', 'h'],
		next: ['next'],
		pause: ['pause', 'p'],//todo not supported stupid-player
		play: ['play'],
		radio: ['radio', 'r'],
		reward: ['reward', 'rwd'],//todo not supported stupid-player
		prev: ['prev'],
		search: ['search', 's'],
		stop: ['stop'],
		shuffle: ['shuffle', 'sh']
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
		case commandList.clear:
			app.ui.console._visiblePanels.right.clear();
			app.ui.console.render();
			break;
		case commandList.help:
			app.ui.console.help();
			break;
		case commandList.play:
			app.play(app.ui.console._panels.mainPL.getPlaylistId(), 300, args);
			break;
		case commandList.pause:
			app.pause();
			break;
		case commandList.stop:
			app.stop();
			break;
		case commandList.search:
			app.search(app.ui.console._panels.mainPL.getPlaylistId(), 300, args);
			break;
		case commandList.shuffle:
			var panel = app.ui.console.activePanel;
			if (panel instanceof vknp.ui.console.panels.PlayList) {
				var id = panel.getOpenPlaylistId();
				app.service.playListManager.shufflePlaylist(id);
			}
			break;
		case commandList.next:
			app.next();
			break;
		case commandList.radio:
			app.radio(app.ui.console._panels.mainPL.getPlaylistId(), 300, args);
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
Input.prototype._searchCommand = function(commandList, cmd) {
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
 * @param key
 * @private
 */
Input.prototype._commandHistory = function(key) {
	var historyLength = this._history.length;

	if (key.name === 'up') {
		this._offset++;
	} else if (key.name === 'down') {
		this._offset--;
	}

	var index = historyLength - this._offset;
	if (index < 0) {
		index = 0;
		this._offset--;
	} else if (index >= historyLength) {
		index = historyLength;
		this._offset++;
	}

	var command = this._history[index];
	if (command) {
		this._node.setValue(command);
		app.ui.console.render();
	}

};


/**
 * @type {Textarea}
 */
Input.prototype._node;

/**
 * @typedef {{
*   parent: (*|undefined),
*   bottom: (number|string|undefined),
*   top: (number|string|undefined),
*   left: (number|string|undefined),
*   right: (number|string|undefined),
*   width: (number|string|undefined),
*   height: (number|string|undefined),
*   style: {
*       fg: (string|undefined),
*       bg: (string|undefined)
*   }
* }}
 */
Input.params;

module.exports = Input;
