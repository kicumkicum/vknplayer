var service = {
	Config: require('./lib/config'),
	Player: require('./lib/player/index'),
	PlayListManager: require('./lib/play-list-manager'),
	WebSocket: require('./lib/websocket')
};

module.exports = service;