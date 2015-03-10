global.vknp = {};

vknp.api = require('./api');
vknp.ui = require('./ui').namespace;
vknp.UI = require('./ui');
vknp.service = require('./service');
vknp.models = require('./models');

module.exports = require('./lib/app');
