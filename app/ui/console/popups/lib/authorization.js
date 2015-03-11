var blessed = require('blessed');
var request = require('request');
var util = require('util');

var BasePopUp = require('./base');
var Input = require('../../widgets/lib/universal-input');
var SimplePopUp = require('./simple');

var AuthPopUp = function() {
	this._openSimpleAuth = this._openSimpleAuth.bind(this);
	this._openHardAuth = this._openHardAuth.bind(this);
	this._openDirectAuth = this._openDirectAuth.bind(this);

	this._init({
		title: 'Authorization VK.COM',
		message: '\n{center}Для авторизации выберите один из вариантов{/center}',
		left: 25,
		top: 25,
		width: 50,
		height: 50
	});

	this._addButtons();
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
	this._simpleAuthBtn = this._createButton('simple', {
		left: 1,
		bottom: 7
	});
	this._hardAuthBtn = this._createButton(' hard ', {
		left: 1,
		bottom: 4
	});
	this._directAuthBtn = this._createButton('direct', {
		left: 1,
		bottom: 1
	});

	this._simpleAuthBtn.on(BlessedConst.event.BUTTON_PRESS, this._openSimpleAuth);
	this._hardAuthBtn.on(BlessedConst.event.BUTTON_PRESS, this._openHardAuth);
	this._directAuthBtn.on(BlessedConst.event.BUTTON_PRESS, this._openDirectAuth);
};


AuthPopUp.prototype._openSimpleAuth = function() {
	app.ui.console.openPopUp(vknp.ui.console.popups.SimpleAuth);
};


AuthPopUp.prototype._openHardAuth = function() {
	app.ui.console.openPopUp(vknp.ui.console.popups.HardAuth);
};


AuthPopUp.prototype._openDirectAuth = function() {
	app.ui.console.openPopUp(vknp.ui.console.popups.Simple, {
		title: 'Authorization VK.COM',
		message: '\n{center}dont use it{/center}',
		left: 30,
		top: 30,
		width: 50,
		height: 50
	});
};


module.exports = AuthPopUp;
