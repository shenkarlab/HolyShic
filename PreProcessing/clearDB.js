// clear all collections
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds023550.mlab.com:23550/db_ringapp2016_g');
var Chapter = require('./defineSchema/Chapter');
var Book = require('./defineSchema/Book');
var conn = mongoose.connection;

conn.once('open', function () {
	console.log('Removing Old MongoDB Collections..');
	Chapter.collection.remove();
	Book.collection.remove();
	console.log('Remove Completed');
	mongoose.disconnect();
	console.log('Disconnected from MongoDB');
});
