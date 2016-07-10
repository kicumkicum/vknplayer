global.clin = {};

clin.api = require('./api');
clin.dataViews = require('./data-view');
clin.UI = require('./ui');
clin.ui = clin.UI.namespace;
clin.service = require('./service');
clin.models = require('./models');
clin.helper = require('../helper');

clin.Promise = require('promise');

module.exports = require('./lib/app');
