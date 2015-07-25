var models = {
	Album: require('./lib/album'),
	Attachment: require('./lib/attachment'),
	AudioTrack: require('./lib/audio-track'),
	Config: require('./lib/config'),
	Friend: require('./lib/friend'),
	Group: require('./lib/group'),
	News: require('./lib/news'),
	NewsItem: require('./lib/news-item'),

	yandexMusic: require('./yandex-music')
};

module.exports = models;
