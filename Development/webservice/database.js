//------------Connect to mongodbon mLabvia Mongoose---------------//
var mongoose = require('mongoose');
config = {
	mongoUrl:'mongodb://db_usr:db_pass@ds023550.mlab.com:23550/db_ringapp2016_g'
};

//The server option auto_reconnectis defaulted to true
var options = {
	server: {
		auto_reconnect:true,
	}
};

mongoose.connect(config.mongoUrl, options);
db = mongoose.connection;

// Event handlers for Mongoose
db.on('error', function(err){
	console.log('Mongoose: Error:' +err);
});

db.on('open', function(err){
	console.log('Mongoose: Connection established');
});

db.on('disconnected', function(err){
	console.log('Mongoose: Connection stopped reconnect');
	mongoose.connect(config.mongoUrl, options);
});

db.on('reconnected', function(err){
	console.log('Mongoose: reconnected!');
});
