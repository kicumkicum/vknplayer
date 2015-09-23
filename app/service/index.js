var service = {
	Config: require('./lib/config'),
	Player: require('./lib/player/index'),
	PlayListManager: require('./lib/play-list-manager'),
	Radio: require('./lib/radio'),
	WebSocket: require('./lib/websocket')
};


/**
 *
 * @type {{Config: (Config|exports|module.exports), Player: Player, PlayListManager: (PlayListManager|exports|module.exports), Radio: (Radio|exports|module.exports), WebSocket: (Server|exports|module.exports)}}
 */
module.exports = service;