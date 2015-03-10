#!/usr/bin/env node
/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 21.12.13
 * Time: 23:33
 * To change this template use File | Settings | File Templates.
 */

require('nclosure').nclosure();
goog.require('goog.structs.Trie');
var App = require('./app/');

global.appPath = __dirname;
global.app = new App;

app.ui.console.init(app.service.player, app.service.playListManager);
