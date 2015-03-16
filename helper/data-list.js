var util = require('util');
var events = require('events');


/**
 * @param {Array.<!ItemType>=} items
 * @constructor
 * @extends {EventEmitter}
 * @template ItemType
 */
var DataList = function (items) {
	this._items = [];
	this._currentIndex = NaN;
	this._autoSelect = true;
	if (items) {
		this.setItems(items);
	}
};
goog.inherits(DataList, events.EventEmitter);


/**
 * @param {boolean} value
 */
DataList.prototype.setAutoSelect = function(value) {
	this._autoSelect = value;
};


/**
 * Empty data
 */
DataList.prototype.clear = function () {
	this.selectAt(NaN);
	this._items.splice(0, this._items.length);
	this.emit(this.EVENT_CLEAR);
};


/**
 * @return {number}
 */
DataList.prototype.size = function () {
	return this._items.length;
};


/**
 * @param {Array.<!ItemType>} items
 */
DataList.prototype.addItems = function (items) {
	for (var i = 0; i < items.length; i++) {
		this.add(items[i]);
	}
	this.emit(this.EVENT_ITEMS_ADDED, items);
};


/**
 * @param {Array.<!ItemType>} items
 * @param {number} index
 */
DataList.prototype.addItemsAt = function (items, index) {
	for (var i = 0; i < items.length; i++) {
		this.addAt(items[i], index + i);
	}
	this.emit(this.EVENT_ITEMS_ADDED, items);
};


/**
 * @param {Array.<!ItemType>} items
 */
DataList.prototype.removeItems = function (items) {
	var reallyRemovedItems = [];
	for (var i = 0; i < items.length; i++) {
		if (this.remove(items[i])) {
			reallyRemovedItems.push(items[i]);
		}
	}
	this.emit(this.EVENT_ITEMS_REMOVED, reallyRemovedItems);
};


/**
 * @param {Array.<!ItemType>} items
 */
DataList.prototype.setItems = function (items) {
	this.clear();
	this.addItems(items);
};


/**
 * @param {!ItemType} item
 */
DataList.prototype.add = function (item) {
	this.addAt(item, this.size());
};


/**
 * @param {!ItemType} item
 * @param {number} index
 */
DataList.prototype.addAt = function (item, index) {
	var currentIndex = this.currentIndex();
	var changedIndex = null;
	var fireSelectAt = false;

	this._items.splice(index, 0, item);

	if (this._autoSelect && isNaN(currentIndex)) {
		fireSelectAt = true;

		changedIndex = 0;
	} else if (!isNaN(currentIndex) && currentIndex >= index) {
		if (currentIndex === index) {
			fireSelectAt = true;
		}

		changedIndex = currentIndex + 1;
	}

	this.emit(this.EVENT_ITEM_ADDED, item, index);

	if (this.size() == 1) {
		this.emit(this.EVENT_FIRST_ITEM_ADDED, item);
	}

	if (changedIndex !== null) {
		if (fireSelectAt) {
			this.selectAt(changedIndex);
		} else {
			this._currentIndex = changedIndex;
		}
	}
};


/**
 * @param {!ItemType} item
 * @return {boolean}
 */
DataList.prototype.remove = function (item) {
	return this.removeAt(this.indexOf(item));
};


/**
 * @param {number} index
 * @return {boolean}
 */
DataList.prototype.removeAt = function (index) {
	if (!this.isValidIndex(index)) {
		return false;
	}

	var currentIndex = this.currentIndex();
	var removedItem = this._items.splice(index, 1)[0];

	var changedIndex = null;
	var fireSelectAt = false;

	if (!isNaN(currentIndex)) {
		if (currentIndex === index) {

			this._currentIndex = NaN;
			changedIndex = NaN;

			if (this.isValidIndex(index)) {
				changedIndex = currentIndex;
			} else if (this.isValidIndex(index - 1)) {
				changedIndex = index - 1;
			}

			fireSelectAt = true;

		} else if (currentIndex > index) {
			changedIndex = currentIndex - 1;
		}
	}

	this.emit(this.EVENT_ITEM_REMOVED, removedItem, index);

	if (changedIndex !== null) {
		if (fireSelectAt) {
			this.selectAt(changedIndex);
		} else {
			this._currentIndex = changedIndex;
		}
	}

	if (this.size() == 0) {
		this.emit(this.EVENT_CLEAR);
	}

	return true;
};


/**
 * @param {!ItemType} item
 * @return {boolean}
 */
DataList.prototype.select = function (item) {
	return this.selectAt(this.indexOf(item));
};


/**
 * @param {number} index
 * @return {boolean}
 */
DataList.prototype.selectAt = function (index) {
	if (this.isValidIndex(index) || isNaN(index)) {
		if (index !== this._currentIndex) {
			var prevItem = this.current();
			var prevIndex = this.currentIndex();
			this._currentIndex = index;
			this.emit(this.EVENT_ITEM_SELECTED, this.current(), this.currentIndex(), prevItem, prevIndex);
		}
		return true;
	}
	return false;
};


/**
 * @param {!ItemType} item
 * @return {number} -1 if not found
 */
DataList.prototype.indexOf = function (item) {
	return this._items.indexOf(item);
};


/**
 * @param {number} index
 * @return {boolean}
 */
DataList.prototype.isValidIndex = function (index) {
	return index >= 0 && index < this._items.length;
};


/**
 * @return {?ItemType}
 */
DataList.prototype.current = function () {
	return this.itemAt(this.currentIndex());
};


/**
 * @return {number}
 */
DataList.prototype.currentIndex = function () {
	return this._currentIndex;
};


/**
 * @param {number} index
 * @return {?ItemType}
 */
DataList.prototype.itemAt = function (index) {
	if (!this.isValidIndex(index)) {
		return null;
	}
	return this._items[index];
};


/**
 * @param {number=} step Default 1.
 * @return {boolean}
 */
DataList.prototype.selectNextItem = function (step) {
	step = isNaN(step) ? 1 : (step < 1 ? 1 : step);
	return this.selectAt(this.currentIndex() + step);
};


/**
 * @param {number=} step Default 1.
 * @return {boolean}
 */
DataList.prototype.selectPrevItem = function (step) {
	step = isNaN(step) ? 1 : (step < 1 ? 1 : step);
	return this.selectAt(this.currentIndex() - step);
};


/**
 * @returns {Array.<ItemType>}
 */
DataList.prototype.toArray = function () {
	return this._items;
};


/**
 * @type {Array.<ItemType>}
 * @protected
 */
DataList.prototype._items;


/**
 * @type {number}
 */
DataList.prototype._currentIndex;


/**
 * @type {boolean}
 */
DataList.prototype._autoSelect;


/**
 * @const Fired with args: item, index, prevItem, prevIndex
 */
DataList.prototype.EVENT_ITEM_SELECTED = 'item-selected';


/**
 * @const Fired without args.
 */
DataList.prototype.EVENT_CLEAR = 'clear';


/**
 * @const Fired with args: item
 */
DataList.prototype.EVENT_FIRST_ITEM_ADDED = 'first-item-added';


/**
 * @const Fired with args: item, index
 */
DataList.prototype.EVENT_ITEM_ADDED = 'item-added';


/**
 * @const Fired with args: Array.<!ItemType>
 */
DataList.prototype.EVENT_ITEMS_ADDED = 'items-added';


/**
 * @const Fired with args: item, index
 */
DataList.prototype.EVENT_ITEM_REMOVED = 'item-removed';


/**
 * @const Fired with args: Array.<!ItemType>
 */
DataList.prototype.EVENT_ITEMS_REMOVED = 'items-removed';


module.exports = DataList;
