/**
 * Created by oleg on 17.06.14.
 */

var WebSocketServer = require('ws').Server;
var connect = require('connect');



/**
 * @constructor
 */
var Server = function() {
	this._setupWebSocket();
	this._setupWebServer();
};


/**
 * @private
 */
Server.prototype._setupWebSocket = function() {
	var socket = new WebSocketServer({port: 8081});
	socket.on('connection', function(ws) {
		this._ws = ws;
		ws.on('message', this._onMessage.bind(this));
	}.bind(this));
};


/**
 * @private
 */
Server.prototype._setupWebServer = function() {
	connect()
		.use(connect.static(__dirname + '/ui'))
		.listen(8082);
};

/**
 * @param {Server.Message} stringMessage
 * @private
 */
Server.prototype._onMessage = function(stringMessage) {
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
			this._ws.send(JSON.stringify(list));
			console.log(list[0].toString())
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
Server.MessageType = {
	EVENT: 'event',
	REQUEST: 'request',
	RESPONSE: 'response'
};


/**
 * @typedef {{
 *     type: Server.MessageType,
 *     name: string,
 *     data: (*|undefined)
 * }}
 */
Server.Message;


module.exports = Server;
