/**
 * Created by oleg on 22.08.14.
 */
var blessed = require('blessed');
var PlayList = require('./playlist-panel');
var BasePanel = require('./base-panel');



/**
 * @extends {BasePanel}
 * @constructor
 */
var NewsList = function() {
	this._newsList = {};
	goog.base(this, {
		left: 0,
		top:  2,
		bottom: 4,
		width: '50%',
		hidden: true
	});
};
goog.inherits(NewsList, BasePanel);


NewsList.prototype._loadData = function() {
	this.addChild(this.DEFAULT_GROUP_NAME);
	var offset = this._getOffset();
	this._setOffset(offset + 1);

	return app.api.vk
		.getListNews()
		.then(function(list) {
			this._setData(list);
			list.forEach(function(item) {
				this.addChild(item.title);
			}, this);
		}.bind(this));
};


NewsList.prototype._addTracks = function(tracks) {
	this._playlist.addItems(tracks);
};


/**
 * @param select
 * @param {number} selectNumber
 * @protected
 */
NewsList.prototype._click = function(eventName, select, selectNumber) {
	if (selectNumber === 0) {
		this._back();
		return;
	}

	if (selectNumber === 1) {
		return app.api.vk
			.getNews({
				filter: 'post',
				count: '100'
			})
			.then(function(items) {
				var tracks = [];
				items.news.forEach(function(item) {
					if (item.attachments) {
						item.attachments.forEach(function(attachment) {
							if (attachment.audio) {
								tracks.push(attachment.audio);
							}
						})
					}
				});
				app.ui.console.slaveList.setContent(tracks);//todo make datalist
			}.bind(this));
	}
	var item = this._getDataItem(selectNumber);
	if (!item) {
		return;
	}

	app.api.vk
		.getNews({
			listIds: item.id,
			filter: 'post',
			count: '100'
		})
		.then(function(items) {
			var tracks = [];
			items.news.forEach(function(item) {
				if (item.attachments) {
					item.attachments.forEach(function(attachment) {
						if (attachment.audio) {
							tracks.push(attachment.audio);
						}
					})
				}
			});
			app.ui.console.slaveList.setContent(tracks);//todo make datalist
		}.bind(this));
};


/**
 * @param {{
 *      title: string,
 *      id: number
 * }} item
 */
NewsList.prototype._addItemNews = function(item) {
	this.addChild(item.title);
};


/**
 * @const {string}
 */
NewsList.prototype.DEFAULT_GROUP_NAME = 'Основные';


/**
 * @type {DataList.<AudioTrack>}
 */
NewsList.prototype.playlist;


/**
 * @type {Object}
 */
NewsList.prototype._newsList;


module.exports = NewsList;
