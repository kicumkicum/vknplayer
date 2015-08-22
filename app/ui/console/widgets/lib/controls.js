/**
 * Created by oleg on 28.05.14.
 */
var blessed = require('blessed');
var util = require('util');

var AuthorizationPopUp = require('../../popups/lib/authorization');
var Node = require('../../lib/node');



/**
 * @constructor
 */
var Controls = function() {
	this._node = blessed.listbar({
		parent: app.ui.console.screen,
		bottom: 0,
		left: 0,
		right: 0,
		height: 3,
		width: 'shrink',
		mouse: true,
		keys: true,
		autoCommandKeys: true,
		scrollable: true,
		border: {
			type: 'line'
		},
		style: {//todo it needed
			item: {
				hover: {}
			},
			selected: {}
		},
		commands: {
			'f1': {
				keys: ['f1'],
				callback: function() {}
			},
			'Prev': {
				keys: ['f2'],
				callback: function() {
					app.service.player.prev();
				}.bind(this)
			},
			'Play': {
				keys: ['f3'],
				callback: function() {
					app.service.player.toggle();
				}.bind(this)
			},
			'Next': {
				keys: ['f4'],
				callback: function() {
					app.service.player.next();
				}.bind(this)
			},
			'f5': {
				keys: ['f5'],
				callback: function() {
					//app.ui.console.copy();
				}.bind(this)
			},
			'f6': {
				keys: ['f6'],
				callback: function() {
					//this.popup = new AuthorizationPopUp();
				}.bind(this)
			},
			'VolUp': {
				keys: ['f7'],
				callback: function() {
					this._handler(app.service.player.volumeUp.bind(app.service.player));
				}.bind(this)
			},
			'VolDown': {
				keys: ['f8'],
				callback: function() {
					this._handler(app.service.player.volumeDown.bind(app.service.player));
				}.bind(this)
			},
			'f9': {
				keys: ['f9'],
				callback: function() {}
			},
			'Exit': {
				keys: ['f10'],
				callback: function() {
					return process.exit(0);
				}
			}
		}
	});

	app.ui.console.append(this._node);

	app.ui.console._widgets.input.getNode().on('funckey', function(key) {
		var index = parseInt(key.name.substr(1), 10);
		var button = this._node.items[index - 1];
		if (button) {
			button._.cmd.callback();
		}
	}.bind(this));
};
goog.inherits(Controls, Node);


/**
 * @return {Listbar}
 */
Controls.prototype.getNode = function() {
	return this._node;
};


/**
 * @param {boolean} isLock
 */
Controls.prototype.setLock = function(isLock) {
	this._isLock = isLock;
};

/**
 * @return {boolean}
 */
Controls.prototype.getLock = function() {
	return this._isLock;
};


/**
 * @return {boolean}
 */
Controls.prototype.isLock = function() {
	return this.getLock();
};


/**
 * @param {function} callback
 * @protected
 */
Controls.prototype._handler = function(callback) {
	if (!this.isLock()) {
		callback();
		this.setLock(true);
		setTimeout(this.setLock.bind(this, false), this.LOCK_CONTROLS_TIMEOUT);
	}
};


/**
 * @type {Listbar}
 */
Controls.prototype._node;


/**
 * @type {boolean}
 */
Controls.prototype._isLock;


/**
 * @const {number} in ms
 */
Controls.prototype.LOCK_CONTROLS_TIMEOUT = 200;


module.exports = Controls;
