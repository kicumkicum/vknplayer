/**
 * Created by oleg on 28.05.14.
 */

var blessed = require('blessed');
var util = require('util');

var Node = require('../../lib/node');


/**
 * @return {InfoBar}
 * @constructor
 */
var InfoBar = function() {
	this._playlist = app.ui.console._panels.mainPL.playlist;

	this._node = blessed.box({
		left: 0,
		top: 0,
		height: 3,
		width: '50%',

		border: {
			type: 'line'
		}
	});
	app.ui.console.append(this._node);

	app.service.player.on('play', function(currentTrack) {
		var message = currentTrack.position + '. ' + currentTrack.track.toString();
		this._node.setText(message);
		app.ui.console.render();
	}.bind(this));
};
goog.inherits(InfoBar, Node);


/**
 * @return {*}
 */
InfoBar.prototype.getNode = function() {
	return this._node;
};


/**
 */
InfoBar.prototype._node;


/**
 * @type {PlayListItem}
 */
InfoBar.prototype._playlist;


module.exports = InfoBar;
