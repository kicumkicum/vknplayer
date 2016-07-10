const IDataView = require('../../interfaces/i-data-view');
const dataViews = require('./vk-data-views');
const VKApi = require('../api');


/**
 * @type {ServiceVK}
 * @implements {IDataView}
 */
module.exports = class ServiceVK extends IDataView {
	constructor() {
		super();

		/**
		 * @type {IAudioServiceApi}
		 * @private
		 */
		this._vkApi = new VKApi;
	}

	/**
	 * @override
	 */
	getChildren() {
		return new clin.Promise(function(resolve, reject) {
			resolve([
				new dataViews.Bookmarks(this._vkApi),
				new dataViews.Friends,
				new dataViews.Groups,
				new dataViews.News,
				new dataViews.Playlists
			]);
		});
	}

	/**
	 * @override
	 */
	toString() {
		return 'VK.COM';
	}
};
