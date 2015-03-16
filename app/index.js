global.vknp = {};

vknp.api = require('./api');
vknp.UI = require('./ui');
vknp.ui = vknp.UI.namespace;
vknp.service = require('./service');
vknp.models = require('./models');

module.exports = require('./lib/app');
