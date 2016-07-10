var BasePopUp = require('./base');
var request = require('request');
var util = require('util');



/**
 * @constructor
 * @extends {BasePopUp}
 */
var AuthPopUp = function() {
	this._openSimpleAuth = this._openSimpleAuth.bind(this);
	this._openHardAuth = this._openHardAuth.bind(this);

	this._init({
		title: 'Authorization VK.COM',
		message: '\n{center}Для авторизации выберите один из вариантов{/center}',
		left: 5,
		top: 5,
		width: 80,
		height: 80
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


/**
 * @protected
 */
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


/**
 * @param {string} id
 * @protected
 */
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


/**
 * @protected
 */
AuthPopUp.prototype._addButtons = function() {
	this._pingAuthServer()
		.then(function() {
			this._addSimple();
			this._addHard();
		}.bind(this), function() {
			this._addHard();
		}.bind(this))
		.then(app.ui.console.render.bind(app.ui.console));
};


/**
 * @protected
 */
AuthPopUp.prototype._addSimple = function() {
	var simpleMessage = 'Light\nПростая авторизация. Требует минимум усилий,\nно часть функционала не доступно';
	this._simpleAuthBtn = this._createButton(simpleMessage, {
		left: 3,
		bottom: 7,
		width: '40%',
		height: '40%'
	});
	this._simpleAuthBtn.on(BlessedConst.event.BUTTON_PRESS, this._openSimpleAuth);
};


/**
 * @protected
 */
AuthPopUp.prototype._addHard = function() {
	var hardMessage = '{center}Full\nЧуть менее удобный способ,\nно доступен весь функционал приложения{/center}';
	this._hardAuthBtn = this._createButton(hardMessage, {
		right: 3,
		bottom: 7,
		width: '40%',
		height: '40%'
	});
	this._hardAuthBtn.on(BlessedConst.event.BUTTON_PRESS, this._openHardAuth);
};


/**
 * @protected
 */
AuthPopUp.prototype._openSimpleAuth = function() {
	app.ui.console.openPopUp(clin.ui.console.popups.SimpleAuth);
};


/**
 * @protected
 */
AuthPopUp.prototype._openHardAuth = function() {
	app.ui.console.openPopUp(clin.ui.console.popups.HardAuth);
};


/**
 * @return {Promise.<number>}
 * @protected
 */
AuthPopUp.prototype._pingAuthServer = function() {
	return new clin.Promise(function(resolve, reject) {
		var timeout = 4 * 1000;
		var timeoutId = setTimeout(function() {
			reject('Auth server not allowed');
		}, timeout);

		var url = app.api.vk.getExternalAuthUrl();
		var startPing = Date.now();
		request(url, function(err, res, body) {
			clearTimeout(timeoutId);
			resolve(Date.now() - startPing);
		}.bind(this));
	});
};


/**
 * @type {AuthPopUp}
 */
module.exports = AuthPopUp;
