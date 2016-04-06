/**
 * @type {{
 *      Api: Api,
 *      vk: vk,
 *      Gmusik: GMusic,
 *      yandexMusic: yandexMusic
 * }}
 */
var api = {};

module.exports = api;

api.Api = require('./lib/api');
api.vk = require('./lib/vk');
api.Gmusik = require('./lib/gmusic');
api.yandexMusic = require('./lib/yandex-music');
