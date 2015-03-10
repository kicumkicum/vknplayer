var Console = require('./console');

var ui = {
	console: require('./console').namespace
};


/**
 * @param config
 * @constructor
 */
var UI = function(config) {
	if (config.console && config.console.enabled) {
		this.console = new Console(config.console);
	}
};


module.exports = UI;
module.exports.namespace = ui;
