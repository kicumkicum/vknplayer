/**
 * Created by oleg on 04.06.14.
 */

var AbstractApi = require('./abstract-api');
var request = require('request');
var util = require('util');
var events = require('events');


/**
 * @param {string} host
 * @param {string} port
 * @constructor
 * @extends {AbstractApi}
 */
var GMusic = function(host, port) {
	this._host = host;
	this._port = port;
};
goog.inherits(GMusic, AbstractApi);


/**
 * @param body
 * @return {Deferred.<*>}
 * @private
 */
GMusic.prototype._requestWrapper = function(body) {
	var header = 'http://' + this._host + ':' + this._port;
	var url = header + body;
	return this._request(url);
};


GMusic.prototype.getCollection = function() {
	return this._requestWrapper('/get_collection');
};


/**
 * reports the unique ID as result of a search for an artist, a song or an album.
 * @param {GMusic.searchType} type search for artist, album or song
 * @param {string} title  a string to search in the title of the album or of the song
 * @param {string} artist a string to search in the name of the artist in any kind of search
 * @param {boolean=} opt_exact a yes implies an exact match between the query parameters artist and title and the real data of the artist/album/song [default: no]
 * @return {Deferred.<*>}
 */
GMusic.prototype.searchId = function(type, title, artist, opt_exact) {
	var body = '/search_id?' +
		'type=' + type +
		'&title=' + title +
		'&artist=' + artist +
		(opt_exact ? '&exact=' + opt_exact : '');
	return this._requestWrapper(body);
};


/**
 * makes a search for artist/album/song as /search_id and returns the related content
 * (an M3U list for the album or for the top songs of an artist and the MP3 file for a song)
 * @param {GMusic.searchType} type search for artist, album or song
 * @param {string} title  a string to search in the title of the album or of the song
 * @param {string} artist a string to search in the name of the artist in any kind of search
 * @param {boolean=} opt_exact a yes implies an exact match between the query parameters artist and title and the real data of the artist/album/song [default: no]
 * @param {string=} opt_numTracks the number of top songs to return in a search for artist [default: 20]
 * @return {Deferred.<*>}
 */
GMusic.prototype.getBySearch = function(type, title, artist, opt_exact, opt_numTracks) {
	var body = '/get_by_search?' +
		'type=' + type +
		'&title=' + title +
		'&artist=' + artist +
		(opt_exact ? '&exact=' + opt_exact : '') +
		(opt_numTracks ? '&num_tracks=' + opt_numTracks : '');
	return this._requestWrapper(body);
};


/**
 * reports a list of registered stations as M3U playlist (with URLs to other M3U playlist) or as plain-text list (with one station per line)
 * @param {GMusic.responseType} type m3u for an M3U list or text for a plain-text list with lines like Name of the Station|URL to an M3U playlist [default: m3u]
 * @param {string} separator a separator for the plain-text lists [default: |]
 * @param {string} onlyUrl a yes creates a list of just URLs in the plain-text lists (the name of the station is totally omitted) [default: no]
 * @param {boolean} exact  a yes implies an exact match between the query parameters artist and title and the real data of the artist/album/song [default: no]
 * @return {Deferred.<*>}
 */
GMusic.prototype.getAllStations = function(type, separator, onlyUrl, exact) {
	var body = '/get_all_stations?' +
		'type=' + type +
		'&separator=' + separator +
		'&only_url=' + onlyUrl +
		'&exact=' + exact;
	return this._requestWrapper(body);
};


/**
 * reports the playlists registered in the account as M3U playlist (with URLs to other M3U playlist) or as plain-text list (with one playlist per line).
 * The allowed parameters are the same as /get_all_stations.
 * @param {GMusic.responseType} type m3u for an M3U list or text for a plain-text list with lines like Name of the Station|URL to an M3U playlist [default: m3u]
 * @param {string} separator a separator for the plain-text lists [default: |]
 * @param {string} onlyUrl a yes creates a list of just URLs in the plain-text lists (the name of the station is totally omitted) [default: no]
 * @param {boolean} exact  a yes implies an exact match between the query parameters artist and title and the real data of the artist/album/song [default: no]
 * @return {Deferred.<*>}
 */
GMusic.prototype.getAllPlaylists = function(type, separator, onlyUrl, exact) {
	var body = '/get_all_playlists?' +
		'type=' + type +
		'&separator=' + separator +
		'&only_url=' + onlyUrl +
		'&exact=' + exact;
	return this._requestWrapper(body);
};


/**
 * reports the unique ID as result of a search for an artist, a song or an album.
 * @param {GMusic.searchType} type search for artist, album or song
 * @param {string} title  a string to search in the title of the album or of the song
 * @param {string} artist a string to search in the name of the artist in any kind of search
 * @param {boolean} exact a yes implies an exact match between the query parameters artist and title and the real data of the artist/album/song
 * @param {number} numTracks the number of songs to extract from the new station [default: 20]
 * @param {boolean} transient a [false] creates a persistent station that will be registered into the account
 * @param {string} name the name of the persistent station to create [required if transient is no]
 * @return {Deferred.<*>}
 */
GMusic.prototype.getNewStationBySearch = function(type, title, artist, exact, numTracks, transient, name) {
	var body = '/get_new_station_by_search?' +
		'type=' + type +
		'&title=' + title +
		'&artist=' + artist +
		'&exact=' + exact +
		'&num_tracks=' + numTracks +
		'&transient=' + (transient ? 'yes' : 'no') +
		'&name=' + name;
	return this._requestWrapper(body);
};


/**
 * reports as M3U playlist the content of a new (transient or permanent) station created on a specified id of an artist/album/song
 * @param {number} id the unique identifier of the artist/album/song
 * @param {GMusic.searchType} type search for artist, album or song
 * @param {string} numTracks  the number of songs to extract from the new station
 * @param {boolean} transient  a [false] creates a persistent station that will be registered into the account
 * @param {string} name the name of the persistent station to create
 * @return {Deferred.<*>}
 */
GMusic.prototype.getNewStationById = function(id, type, numTracks, transient, name, exact) {
	var body = '/get_new_station_by_id?' +
		'id=' + id +
		'type=' + type +
		'&num_tracks=' + numTracks +
		'&transient=' + (transient ? 'yes' : 'no') +
		'&name=' + name;
	return this._requestWrapper(body);
};


/**
 * reports an M3U playlist of tracks associated to the given station
 * @param {number} id the unique identifier of the station
 * @param {number} numTracks the number of tracks to extract
 * @return {Deferred.<*>}
 */
GMusic.prototype.getStation = function(id, numTracks) {
	var body = '/get_station?' +
		'&id=' + id +
		'&num_tracks=' + numTracks;
	return this._requestWrapper(body);
};


/**
 * reports an M3U playlist of tracks associated to the automatic "I'm feeling lucky" station
 * @param {number} numTracks the number of tracks to extract
 * @return {Deferred.<*>}
 */
GMusic.prototype.getIflStation = function(numTracks) {
	var body = '/get_ifl_station?' +
		'&num_tracks=' + numTracks;
	return this._requestWrapper(body);
};


/**
 * reports the content of a registered playlist in the M3U format.
 * @param {number} id the unique identifier of the playlist
 * @return {Deferred.<*>}
 */
GMusic.prototype.getPlaylist = function(id) {
	var body = '/get_playlist?' +
		'&id=' + id;
	return this._requestWrapper(body);
};


/**
 * reports the content of an album as an M3U playlist.
 * @param {number} id the unique identifier of the album
 * @return {Deferred.<*>}
 */
GMusic.prototype.getAlbum = function(id) {
	var body = '/get_album?' +
		'&id=' + id;
	return this._requestWrapper(body);
};


/**
 * streams the content of the specified song as a standard MP3 file with IDv3 tag.
 * @param {number} id the unique identifier of the song
 * @return {Deferred.<*>}
 */
GMusic.prototype.getSong = function(id) {
	var body = '/get_song?' +
		'&id=' + id;
	return this._requestWrapper(body);
};


/**
 * reports an M3U playlist with the top songs of a specified artist
 * @param {number} id the unique identifier of the artist
 * @param {GMusic.searchType} type the type of id specified among artist, album and song
 * @param {number} numTracks the number of top songs to return
 * @return {Deferred.<*>}
 */
GMusic.prototype.getTopTracksArtist = function(id, type, numTracks) {
	var body = '/get_top_tracks_artist?' +
		'&id=' + id +
		'&type=' + type +
		'&num_tracks=' + numTracks;
	return this._requestWrapper(body);
};


/**
 * reports a positive rating on the song with specified id.
 * @param {number} id the unique identifier of the song
 * @return {Deferred.<*>}
 */
GMusic.prototype.likeSong = function(id) {
	var body = '/like_song?' +
		'&id=' + id;
	return this._requestWrapper(body);
};


/**
 * reports a negative rating on the song with specified id.
 * @param {number} id the unique identifier of the song
 * @return {Deferred.<*>}
 */
GMusic.prototype.dislikeSong = function(id) {
	var body = '/dislike_song?' +
		'&id=' + id;
	return this._requestWrapper(body);
};


/**
 * @enum {string}
 */
GMusic.searchType = {
	ARTIST: 'artist',
	ALBUM: 'album',
	SONG: 'song'
};


/**
 * @enum {string}
 */
GMusic.responseType = {
	M3U: 'm3u',
	TEXT: 'text'//plain-text list with lines like Name of the Station|URL to an M3U playlist
};






module.exports = GMusic;