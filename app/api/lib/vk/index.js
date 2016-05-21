/**
 * @type {{
 *      Api: VK,
 *      constants: *,
 *      models: *
 * }}
 */
var vk = {
	Api: require('./api/vk'),
	constants: require('./const/vk-errors'),
	models: require('./models')
};


module.exports = vk;
