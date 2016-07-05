/**
 * @type {IAudioService}
 */
module.exports = (function() {
	return {
		api: require('./api'),
		dataView: require('./data-view')
	};
})();
