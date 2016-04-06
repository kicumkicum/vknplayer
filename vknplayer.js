#!/usr/bin/env node
/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 21.12.13
 * Time: 23:33
 * To change this template use File | Settings | File Templates.
 */

global.goog = require('./polyfill').goog;

var App = require('./app/');

global.appPath = __dirname;
global.app = new App;

app.start();
