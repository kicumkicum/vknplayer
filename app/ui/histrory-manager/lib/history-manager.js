var events = require('events');


var HistoryManager = function() {
	this._history = [];
};
goog.inherits(HistoryManager, events.EventEmitter);


/**
 * @param {HistoryManager.Item} item
 */
HistoryManager.prototype.add = function(item) {
	this._history.push(item);
};


/**
 * @return {HistoryManager.Item}
 */
HistoryManager.prototype.back = function() {
	return this._history.shift();
};


/**
 * @type {Array.<HistoryManager.Item>}
 */
HistoryManager.prototype._history;


/**
 * @typedef {{
 *      data: *
 * }}
 */
HistoryManager.Item;


module.exports = HistoryManager;
