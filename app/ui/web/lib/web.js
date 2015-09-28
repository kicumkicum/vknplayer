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

	this._createWebSocket(config.ports.webSocket);
	this._createWebServer(config.ports.webServer);
};
goog.inherits(Web, BaseUI);


/**
 * @param {number} port
 * @protected
 */
Web.prototype._createWebSocket = function(port) {
	var socket = new WebSocketServer({port: port});
	socket.on('connection', function(ws) {
		ws.on('message', this._onMessage.bind(this));
		this._ws = ws;
	}.bind(this));
};


/**
 * @param {number} port
 * @protected
 */
Web.prototype._createWebServer = function(port) {
	connect()
		.use(connect.static(path.join(__dirname, '..')))
		.listen(port);
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
			var currentPlaylist = app.service.playListManager.getActivePlaylist();
			if (currentPlaylist) {
				var list = currentPlaylist.toArray();
				this._ws.send(JSON.stringify(list));
			}
			break;
		default:
			var mes = JSON.parse(message);
	}

	if (mes && mes.play) {
		var current = app.service.playListManager
			.getActivePlaylist()
			.toArray()
			.filter(function(item) {
				return item.id === mes.play;
			})[0];

		app.service.playListManager.getActivePlaylist().select(current);
		app.service.player.play(app.service.playListManager.getActivePlaylistId());
	}
};


/**
 * @type {WebSocket}
 */
Web.prototype._ws;


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
