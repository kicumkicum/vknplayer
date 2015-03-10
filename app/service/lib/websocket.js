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
 * @param {string} stringMessage
 * @private
 */
Server.prototype._onMessage = function(stringMessage) {
	var message = /** @type {Server.Message} */(JSON.parse(stringMessage));

	if (message.type === Server.MessageType.EVENT) {
		switch (message.name) {
			case 'play':
				break;
			case 'resume':
				break;
			case 'stop':
				break;
			case 'prev':
				break;
			case 'next':
				break;
		}
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
