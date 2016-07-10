const IDataView = require('../../interfaces/i-data-view');
const YandexMusicApi = require('../api');


/**
 * @type {YandexMusicService}
 */
module.exports = class YandexMusicService extends IDataView {
	constructor() {
		super();


		/**
		 * @type {YandexMusic}
		 * @private
		 */
		this._api = new YandexMusicApi();
	}


	/**
	 * @override
	 */
	getChildren() {
		return Promise.resolve([]);
	}


	/**
	 * @override
	 */
	toString() {
		return 'Yandex Music';
	}
};
