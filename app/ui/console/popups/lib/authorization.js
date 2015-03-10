var blessed = require('blessed');
var request = require('request');
var util = require('util');

var BasePopUp = require('./base');
var Input = require('../../widgets/lib/universal-input');
var SimplePopUp = require('./simple');

var AuthPopUp = function() {
	this._getId = this._getId.bind(this);

	this._init({
		title: 'Authorization VK.COM',
		message: '\n{center}Для авторизации выролните эти простые шаги{/center}' + '\n\n' +
			'1. получите ID\n' +
			'2. откойте в браузере ' + app.api.vk.getAuthUrl() + '\n' +
			'3. получите токен\n' +
			'4. когда закроется это окно - перезапустите приложение',
		left: 25,
		top: 25,
		width: 50,
		height: 50
	});

	this._addButtons();
	this._textbox = this._addInfoBox();
	this._idButton.on(BlessedConst.event.BUTTON_PRESS, this._getId);
};
goog.inherits(AuthPopUp, BasePopUp);


/**
 * @return {*}
 */
AuthPopUp.prototype.getNode = function() {
	return this._node;
};


AuthPopUp.prototype._getId = function() {
	var url = app.api.vk.getAuthUrl();
	request(url + 'id', function(err, res, body) {
		var id = body;
		this._textbox.setText('You id ' + id);
		app.ui.console.render();
		if (id) {
			this._getTokenById(id);
		}
	}.bind(this));
};


AuthPopUp.prototype._getTokenById = function(id) {
	var url = app.api.vk.getAuthUrl();
	var interval = setInterval(function() {
		request(url + 'token-by-id/' + id, function(err, res, body) {
			var token = body;
			if (token && token.indexOf('\n') === -1) {
				clearInterval(interval);
				app.setConfig(['api', 'vk', 'token'], token);
				this.close();
			}
		}.bind(this));
	}.bind(this), 10 * 1000);
};


AuthPopUp.prototype._addButtons = function() {
	this._idButton = this._createButton('get id', {
		left: 1,
		bottom: 1
	});
};


AuthPopUp.prototype._addInfoBox = function() {
	var node = blessed.box({
		parent: this._node,
		left: 10,
		bottom: 1,
		width: '25%',
		height: 3,

		border: {
			type: 'line'
		}
	});

	return node;
};


module.exports = AuthPopUp;
