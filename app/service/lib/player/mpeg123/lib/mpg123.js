/**
 * Created by oleg on 06.07.14.
 */
var mpg123n = require('mpg123n');
var child_process = require('child_process');
var encoder = child_process.spawn('node', [])


var Mpg123 = function(url) {
	this._url = url;
	this._player = new mpg123n.Player();
	this.play(url);
};



Mpg123.prototype.play = function(url) {
	this._player.play(url);
};



Mpg123.prototype.stop = function() {
	this._player.stop();
};



Mpg123.prototype.pause = function() {
	this._player.pause();
};



module.exports = Mpg123;
