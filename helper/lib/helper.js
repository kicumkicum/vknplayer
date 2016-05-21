/**
 * Created by oleg on 05.06.14.
 */

var Helper = function() {
	return this;
};


/**
 * @param {*} item
 * @return {*}
 */
Helper.prototype.clone = function(item) {
	if (!item) {
		return item;
	} // null, undefined values check

	var types = [Number, String, Boolean];
	var result;

	// normalizing primitives if someone did new String('aaa'), or new Number('444');
	types.forEach(function(type) {
		if (item instanceof type) {
			result = type(item);
		}
	});

	if (typeof result == 'undefined') {
		if (Object.prototype.toString.call(item) === '[object Array]') {
			result = [];
			item.forEach(function(child, index, array) {
				result[index] = this.clone(child);
			}, this);
		} else if (typeof item == 'object') {
			// testing that this is DOM
			if (item.nodeType && typeof item.cloneNode == 'function') {
				result = item.cloneNode(true);
			} else if (!item.prototype) { // check that this is a literal
				if (item instanceof Date) {
					result = new Date(item);
				} else {
					// it is an object literal
					result = {};
					for (var i in item) {
						result[i] = this.clone(item[i]);
					}
				}
			} else {
				// depending what you would like here,
				// just keep the reference, or create new object
				/*if (false && item.constructor) {
				 // would not advice to do that, reason? Read below
				 result = new item.constructor();
				 } else {*/
				result = item;
				/*}*/
			}
		} else {
			result = item;
		}
	}
	return result;
};


/**
 * @param {Array.<Object>} array
 * @param {function(...*):TYPE} itemClass
 * @return {Array.<TYPE>}
 */
Helper.prototype.parseArray = function(array, itemClass) {
	return (array || []).map(function(item) {
		return new itemClass(item);
	});
};


/**
 * @param {Array.<*>} array
 */
Helper.prototype.shuffleArray = function(array) {
	for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};


module.exports = Helper;