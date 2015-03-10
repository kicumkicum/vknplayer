/**
 * Created by oleg on 23.06.14.
 */


/**
 * @param {Object} data
 * @constructor
 */
Config = function(data) {
	data = data || {};

	this.api = {};
	this.api.vk = {};
	this.api.vk.enabled = data['api']['vk']['enabled'] || false;
	this.api.vk.authServer = data['api']['vk']['authServer'];
	this.api.vk.token = data['api']['vk']['token'];

	this.api.gmusic = {};
	this.api.gmusic.enabled = data['api']['gmusic']['enabled'] || 0;
	this.api.gmusic.login = data['api']['gmusic']['login'] || '';
	this.api.gmusic.password = data['api']['gmusic']['password'] || '';
	this.api.gmusic.deviceId = data['api']['gmusic']['device-id'] || '';
	this.api.gmusic.host = data['api']['gmusic']['host'];
	this.api.gmusic.port = data['api']['gmusic']['port'];

	this.api.soundcloud = {};
	this.api.soundcloud.enabled = data['api']['soundcloud']['enabled'] || 0;
	this.api.soundcloud.clientId = data['api']['soundcloud']['client-id'];

	this.ui = {};
	this.ui.console = {};
	this.ui.console.enabled = data['ui']['console']['enabled'] || 0;
	this.ui.console.mode = data['ui']['console']['mode'] || 'full';
	this.ui.web = {};
	this.ui.web.enabled = data['ui']['web']['enabled'] || 0;
};


module.exports = Config;
