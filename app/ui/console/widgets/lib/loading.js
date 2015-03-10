/**
 * Created by oleg on 24.06.14.
 */

var blessed = require('blessed');
var util = require('util');

var Node = require('../../lib/node');

/**
 * @constructor
 * @extends {Node}
 */
var Loading = function() {
	this._node = blessed.text({
		bottom: 3,
		right: 1,
		height: 1,
		content: '|',
		bg: 'blue'

	});

	app.ui.console.append(this._node);
};
goog.inherits(Loading, Node);


/**
 * @return {*}
 */
Loading.prototype.getNode = function() {
	return this._node;
};


Loading.prototype.load = function() {
	this._node.show();

	if (this.timer) {
		this.stop();
	}

	this.timer = setInterval(function() {
		if (this._node.content === '|') {
			this._node.setContent('/');
		} else if (this._node.content === '/') {
			this._node.setContent('-');
		} else if (this._node.content === '-') {
			this._node.setContent('\\');
		} else if (this._node.content === '\\') {
			this._node.setContent('|');
		}
		app.ui.console.render();
	}.bind(this), 200);
};

Loading.prototype.stop = function() {
	this._node.hide();
	if (this.timer) {
		clearInterval(this.timer);
		this.timer = null;
	}
	app.ui.console.render();
};

module.exports = Loading;