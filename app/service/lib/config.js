var fs = require('fs');


/**
 * @constructor
 */
var Config = function() {
	this._config = this._configure();
};


/**
 * @return {models.Config|*}
 */
Config.prototype.getConfig = function() {
	return this._config;
};


/**
 * @param {Array.<string>} prop
 * @param {*} param
 * @return {NaN|undefined}
 */
Config.prototype.setValue = function(prop, param) {
	var result = this._checkProp(this._config, prop, param);
	if (result !== null) {
		this.saveConfig();
	}
};


/**
 * @param {Array.<string>} prop
 * @return {*}
 */
Config.prototype.getConfigValue = function(prop) {
	return this._checkProp(this._config, prop);
};


Config.prototype.saveConfig = function() {
	//todo. this tmp code
	var outputFilename = this.CONFIG_DIR + this.CONFIG_FILE;
	fs.writeFile(outputFilename, JSON.stringify(this._config, null, 4), function(err) {
		if(err) {
			console.log('error', err);
		} else {
			//console.log("JSON saved to " + outputFilename);
		}
	});
};


/**
 * @return {models.Config}
 * @private
 */
Config.prototype._configure = function() {
	var defaultConfig = fs.readFileSync(appPath + '/config/.config.json.default', 'utf-8');

	try {
		fs.readdirSync(this.CONFIG_DIR);
	} catch(e) {
		try {
			console.log('not read dir', e);
			console.log('mkdir');
			fs.mkdirSync(this.CONFIG_DIR);
		} catch(e) {
			console.log('not make dir', e);
			throw e;
		}
	}

	try {
		return this._readConfig();
	} catch(e) {
		console.log('not read file', e);
		try {
			fs.writeFileSync(this.CONFIG_DIR + this.CONFIG_FILE, defaultConfig);
			return this._readConfig();
		} catch(e) {
			console.log('not write config', e);
			return new vknp.models.Config(JSON.parse(defaultConfig));
		}
	}
};


/**
 * @param {Object|*} obj
 * @param {Array.<string>} props
 * @param {*=} opt_value
 * @return {?*}
 * @private
 */
Config.prototype._checkProp = function(obj, props, opt_value) {
	if (typeof obj !== 'object') {
		return null;
	}
	for (var i in obj) if (obj.hasOwnProperty(i) && i === props[0]) {
		if (props.length > 1) {
			return this._checkProp(obj[i], props.slice(1), opt_value);
		} else if (typeof opt_value !== 'undefined') {
			return obj[i] = opt_value;
		} else {
			return obj[i];
		}
	}
	return null;
};


/**
 * @return {models.Config}
 * @private
 */
Config.prototype._readConfig = function() {
	var config = fs.readFileSync(this.CONFIG_DIR + this.CONFIG_FILE, 'utf-8');
	return new vknp.models.Config(JSON.parse(config));
};


/**
 * @type {models.Config}
 */
Config.prototype._config;


/**
 * @const {string}
 */
Config.prototype.CONFIG_DIR = process.env.HOME + '/.config/vknp/';


/**
 * @const {string}
 */
Config.prototype.CONFIG_FILE = 'config.json';


module.exports = Config;
