//
//var qrcode = require('qrcode-terminal');
//
//var AuthPopUp = function() {
//	this._openQRPopUp = this._openQRPopUp.bind(this);
//
//	this._init({
//		title: 'Authorization VK.COM',
//		message: '\n{center}Для авторизации на сайте VK.COM пройдите по ссылке{/center}' + '\n\n' + '{center}' + app.api.vk.getAuthUrl(true) + '{/center}',
//		left: 25,
//		top: 25,
//		width: 50,
//		height: 50
//	});
//
//	this._input = this._createInput();
//	this._addButtons();
//
//	this._qrButton.on(BlessedConst.event.BUTTON_PRESS, this._openQRPopUp);
//	this._showFullUrlButton.on(BlessedConst.event.BUTTON_PRESS, this._openFullUrlPopUp);
//};
//goog.inherits(AuthPopUp, BasePopUp);
//
//
///**
// * @return {*}
// */
//AuthPopUp.prototype.getNode = function() {
//	return this._node;
//};
//
//
//AuthPopUp.prototype._openQRPopUp = function() {
//	qrcode.generate(app.api.vk.getAuthUrl(true), function (qrcode) {
//		new SimplePopUp({
//			title: 'QR-CODE',
//			message: '{center}' + qrcode + '{/center}',
//			left: 20,
//			top: 20,
//			width: 60,
//			height: 60
//		});
//		app.ui.console.render();
//	});
//};
//
//
//AuthPopUp.prototype._openFullUrlPopUp = function() {
//	new SimplePopUp({
//		title: 'FULL URL',
//		message: app.api.vk.getAuthUrl(false),
//		left: 2,
//		top: 30,
//		width: 96,
//		height: 40
//	});
//};
//
//
//AuthPopUp.prototype._addButtons = function() {
//	this._submit = this._createButton('{bold}submit{/bold}', {
//		right: 10,
//		bottom: 1
//	});
//	this._qrButton = this._createButton('показать QR-code', {
//		left: 1,
//		bottom: 4
//	});
//	this._showFullUrlButton = this._createButton('показать полный адрес', {
//		left: 1,
//		bottom: 1
//	});
//};
//
//
//
//AuthPopUp.prototype._createInput = function() {
//	var input = new Input({
//		parent: this._node,
//		top: 17,
//		left: 1,
//		width: '98%',
//		height: 2,
//		style: {
//			fg: 'white',
//			bg: 'blue'
//		}
//	});
//
//	input._node.key(BlessedConst.button.ENTER, function(ch, key) {
//		var a = this._input.getNode().getValue();
//		var token;
//		input._node.clearValue();
//		app.ui.console.render();
//		token = this._parseToken(a);
//		app.setConfig(['api', 'vk', 'token'], token);
//	}.bind(this));
//
//	return input;
//};
//
//
//AuthPopUp.prototype._parseToken = function(query) {
//	var startPos = query.indexOf('access_token');
//	var endPos = query.indexOf('&');
//	query = query.substring(startPos, endPos);
//	return query.substr(query.indexOf('=') + 1);
//};
//
//
//module.exports = AuthPopUp;

