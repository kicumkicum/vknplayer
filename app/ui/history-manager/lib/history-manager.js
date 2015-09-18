var events = require('events');


var HistoryManager = function() {
	this._history = [];
};
goog.inherits(HistoryManager, events.EventEmitter);


/**
 * @param {HistoryManager.Item} data
 */
HistoryManager.prototype.add = function(data) {
	this._history.push(data);
};


/**
 * @return {HistoryManager.Item}
 */
HistoryManager.prototype.back = function() {
	return this._history.pop();
};


/**
 * @type {Array.<HistoryManager.Item>}
 */
HistoryManager.prototype._history;


/**
 * @typedef {{
 *      dataView: dataView.Abstract,
 *      children: Array.<dataView.Abstract>,
 *      selected: number
 * }}
 */
HistoryManager.Item;


module.exports = HistoryManager;
