/**
 * Created by oleg on 11.10.14.
 */
var blessed = require('blessed');
var util = require('util');

var BaseNode = require('./base-node');


/**
 * @constructor
 * @extends {BaseNode}
 */
var List = function() {};
goog.inherits(List, BaseNode);


/**
 * @type {List}
 * @protected
 */
List.prototype._node;

module.exports = List;

