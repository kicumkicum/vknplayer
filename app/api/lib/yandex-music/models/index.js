var models = {};


module.exports = models;

models.AbstractModel = require('./lib/abstract-model');
models.Album = require('./lib/album');
models.Artist = require('./lib/artist');
models.Account = require('./lib/account');
models.AccountStatus = require('./lib/account-status');
models.Cover = require('./lib/cover');
models.Day = require('./lib/day');
models.Event = require('./lib/event');
models.Feed = require('./lib/feed');
models.Genre = require('./lib/genre');
models.Permissions = require('./lib/permissions');
models.Playlist = require('./lib/playlist');
models.SearchResults = require('./lib/search-results');
models.Subscription = require('./lib/subscription');
models.Track = require('./lib/track');
models.Tracks = require('./lib/tracks');


/**
 * @typedef {{
 *      Day: Day
 * }}
 */
models.Type;
