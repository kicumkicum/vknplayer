/**
 * @param config
 * @param api
 * @param player
 * @param playlist
 * @constructor
 * @interface
 */
var IUI = function(config, api, player, playlist) {};


/**
 * Some work
 */
IUI.prototype.init = function() {};


/**
 * Show any page
 * @param {IDataView} dataView
 */
IUI.prototype.show = function(dataView) {};


/**
 * Show prev page
 */
IUI.prototype.back = function() {};
