var console = {
	panel: require('./panels/index'),
	popups: require('./popups/index'),
	widgets: require('./widgets/index')
};


module.exports = require('./lib/console');
module.exports.namespace = console;
