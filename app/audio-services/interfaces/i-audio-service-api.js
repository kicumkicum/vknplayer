/**
 * @param {string} methodName
 */
var nope = (methodName) => {
	throw 'Method' + methodName + ' not implemented'
};


/**
 * @type {IAudioServiceApi}
 */
module.exports = class IAudioServiceApi {
	constructor() {}

	/**
	 * @param {string} query
	 * @return {Array<AudioTrack>}
	 */
	search(query) {
		nope('search');
	};

	/**
	 * @param {string} query
	 * @return {Array<AudioTrack>}
	 */
	radio(query) {
		nope('radio');
	}
};
