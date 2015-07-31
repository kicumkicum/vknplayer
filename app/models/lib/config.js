/**
 * Created by oleg on 23.06.14.
 */



/**
 * @param {Object} data
 * @constructor
 * @class {models.Config}
 */
Config = function(data) {
	data = data || {};

	this.api = {};
	this.api.vk = {};
	this.api.vk.enabled = data['api']['vk']['enabled'] || false;
	this.api.vk.externalAuthServer = data['api']['vk']['externalAuthServer'];
	this.api.vk.shortAuthUrl = data['api']['vk']['shortAuthUrl'];
	this.api.vk.authServer = data['api']['vk']['authServer'];
	this.api.vk.clientId = data['api']['vk']['client_id'];
	this.api.vk.scope = data['api']['vk']['scope'];
	this.api.vk.redirectUri = data['api']['vk']['redirect_uri'];
	this.api.vk.display = data['api']['vk']['display'];
	this.api.vk.responseType = data['api']['vk']['response_type'];
	this.api.vk.token = data['api']['vk']['token'];

	this.api.yandexMusic = {};
	this.api.yandexMusic.enable = data['api']['yandexMusic']['enable'];
	this.api.yandexMusic.login = data['api']['yandexMusic']['login'];
	this.api.yandexMusic.password = data['api']['yandexMusic']['password'];

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
