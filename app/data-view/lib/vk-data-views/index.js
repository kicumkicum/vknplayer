var vkDataViews = {};


module.exports = vkDataViews;


vkDataViews.Abstract = require('../abstract');
vkDataViews.Bookmarks = require('./lib/bookmarks');
vkDataViews.Friend = require('./lib/friend');
vkDataViews.Friends = require('./lib/friends');
vkDataViews.Group = require('./lib/group');
vkDataViews.Groups = require('./lib/groups');
vkDataViews.News = require('./lib/news');
vkDataViews.NewsItem = require('./lib/news-item');
vkDataViews.Playlist = require('./lib/playlist');
vkDataViews.Playlists = require('./lib/playlists');
