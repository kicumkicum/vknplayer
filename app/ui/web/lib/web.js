var BaseUI = require('../../base-ui');
var path = require('path');
var express = require('express');
var http = require('http');
/**
 * @inheritDoc
 * @constructor
 * @extends {BaseUI}
 */
var Web = function(config, dataViews, api, player, playlist, historyManager) {
	goog.base(this, config, dataViews, api, player, playlist, historyManager);

	var app = express();

	http.createServer(app)
		.listen(1337, function() {
			console.log('Server listening on: http://localhost:%s', 1337);
		}.bind(this));

	app.use('/', express.static(path.join(__dirname, '..')));

	var ws = new vknp.service.WebSocket;

};
goog.inherits(Web, BaseUI);


module.exports = Web;
