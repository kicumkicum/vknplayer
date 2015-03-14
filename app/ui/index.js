var Console = require('./console');

var ui = {
	console: Console.namespace
};


/**
 * @param config
 * @constructor
 */
var UI = function(config, service, api) {
	if (config.console && config.console.enabled) {
		this.console = new Console(config.console, service, api);
	}
};


module.exports = UI;
module.exports.namespace = ui;
