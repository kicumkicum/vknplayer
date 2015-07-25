var yandexMusicModels = {
	Album: require('./lib/album'),
	Artist: require('./lib/artist'),
	Cover: require('./lib/cover'),
	SearchResults: require('./lib/search-results'),
	Tracks: require('./lib/tracks')
};


/**
 * @type {yandexMusicModels}
 */
module.exports = yandexMusicModels;
