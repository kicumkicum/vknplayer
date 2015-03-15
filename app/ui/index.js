var Console = require('./console');

var ui = {
	console: Console.namespace
};


/**
 * @param {models.Config} config
 * @param {vknp.service} service
 * @param {vknp.api} api
 * @constructor
 */
var UI = function(config, service, api) {
	if (config.console && config.console.enabled) {
		this.console = new Console(config.console, service, api);
	}
};


UI.prototype.init = function() {
	if (this.console) {
		this.console.init();
	}
};


/**
 * @type {Console}
 * @public
 */
UI.prototype.console;


module.exports = UI;
module.exports.namespace = ui;
