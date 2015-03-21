var service = {
	Config: require('./lib/config'),
	Player: require('./lib/player/index'),
	PlayListManager: require('./lib/play-list-manager'),
	Radio: require('./lib/radio'),
	WebSocket: require('./lib/websocket')
};

module.exports = service;