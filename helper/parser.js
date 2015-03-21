var m3u8 = require('m3u8');
var Helper = require('./index');
var helper = new Helper;


var Parser = {};
/**
 * @return {M3u8}
 */
Parser.createM3u8 = function() {
	var M3u8 = function() {
		goog.base(this);
		this.on('m3u', function(m3u) {
			var result = helper.clone(m3u['items']);
			Parser._eraseM3U(m3u);//иначе остается результат от предыдущего парсинга
			this.emit(Parser.EVENT_DONE, result);
		});
	};
	goog.inherits(M3u8, m3u8);

	M3u8.prototype.parse = function(line) {
		line = line.trim();
		if (this.linesRead === 0) {
			if (line.indexOf('#EXTM3U') !== 0) {//отличие от родительского метода
				return this.emit('error', new Error(
					'Non-valid M3U file. First line: ' + line
				));
			}
			this.linesRead++;
			return true;
		}
		if (['', '#EXT-X-ENDLIST'].indexOf(line) > -1) return true;
		if (line.indexOf('#') === 0) {
			this.parseLine(line);
		} else {
			if (this.currentItem.attributes.uri != undefined) {
				this.addItem(new PlaylistItem);
			}
			this.currentItem.set('uri', line);
			this.emit('item', this.currentItem);
		}
		this.linesRead++;
	};

	return new M3u8;
};


Parser._eraseM3U = function(m3u) {
	var items = m3u['items'];
	for (var type in items) if (items.hasOwnProperty(type)) {
		if (items[type].length) {
			items[type].length = 0;
		}
	}
};


/**
 * Fired with: {Object}
 * @type {string}
 */
Parser.EVENT_DONE = 'done';


module.exports = Parser;
