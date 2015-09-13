var Console = require('./console');
var HistoryManager = require('./history-manager');

var ui = {
	console: Console.namespace
};


/**
 * @param {models.Config} config
 * @param {} dataViews
 * @param {app.service} service
 * @param {vknp.api} api
 * @constructor
 */
var UI = function(config, dataViews, service, api) {
	var historyManager = new HistoryManager;
	if (config.console && config.console.enabled) {
		this.console = new Console(config.console, dataViews, api, service.player, service.playListManager, historyManager);
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
