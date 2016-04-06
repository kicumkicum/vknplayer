global.vknp = {};

vknp.api = require('./api');
vknp.dataViews = require('./data-view');
vknp.UI = require('./ui');
vknp.ui = vknp.UI.namespace;
vknp.service = require('./service');
vknp.models = require('./models');
vknp.helper = require('../helper');

vknp.Promise = require('promise');

module.exports = require('./lib/app');
