var BaseUI = require('../../base-ui');
var WebSocketServer = require('ws').Server;
var connect = require('connect');
var path = require('path');



/**
 * @inheritDoc
 * @constructor
 * @extends {BaseUI}
 */
var Web = function(config, dataViews, api, player, playlist, historyManager) {
	goog.base(this, config, dataViews, api, player, playlist, historyManager);

	this._createWebSocket();
	this._createWebServer();
};
goog.inherits(Web, BaseUI);


/**
 * @protected
 */
Web.prototype._createWebSocket = function() {
	var socket = new WebSocketServer({port: 8081});
	socket.on('connection', function(ws) {
		ws.on('message', this._onMessage.bind(this));
		this._ws = ws;
	}.bind(this));
};


/**
 * @protected
 */
Web.prototype._createWebServer = function() {
	connect()
		.use(connect.static(path.join(__dirname, '..')))
		.listen(1337);
};


/**
 * @param {Web.Message} stringMessage
 * @protected
 */
Web.prototype._onMessage = function(stringMessage) {
	var message = stringMessage;
	switch (message) {
		case 'play':
			app.service.player.resume();
			break;
		case 'resume':
			app.service.player.resume();
			break;
		case 'pause':
			app.service.player.stop();
			break;
		case 'prev':
			app.service.player.prev();
			break;
		case 'next':
			app.service.player.next();
			break;
		case 'get-list':
			var list = app.service.playListManager.getActivePlaylist().toArray();
			if (list) {
				this._ws.send(JSON.stringify(list));
			}
			break;
		default:
			var mes = JSON.parse(message);
	}

	if (mes && mes.play) {
		var current = app.service.playListManager.getActivePlaylist().toArray().filter(function(item) {
			return item.id === mes.play;
		})[0];

		app.service.playListManager.getActivePlaylist().select(current);
		app.service.player.play(app.service.playListManager.getActivePlaylistId());
	}
};


/**
 * @enum {string}
 */
Web.MessageType = {
	EVENT: 'event',
	REQUEST: 'request',
	RESPONSE: 'response'
};


/**
 * @typedef {{
 *     type: Web.MessageType,
 *     name: string,
 *     data: (*|undefined)
 * }}
 */
Web.Message;


/**
 * @type {Web}
 */
module.exports = Web;
