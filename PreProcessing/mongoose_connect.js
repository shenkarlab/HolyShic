var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds023550.mlab.com:23550/db_ringapp2016_g');
var Word = require('./define_schema');
var conn = mongoose.connection;

conn.on('error', function (err) {
	console.log('Connection Error' + err);
});

conn.once('open', function () {
	console.log('Connected Successfully to MongoDB');

});
