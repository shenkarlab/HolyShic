var express = require('express');
var app = express();
var db = require('./dbController');
var port = process.env.PORT || 3000;
var fs = require('fs');


/*** Server settings ***/
app.use('/', express.static('./public'));
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "application/json");
	next();
});


/*** All routes ***/
app.get('/getBooksByReligion/:religion', db.getBooksByReligion);
app.get('/getChaptersByBook/:book', db.getChaptersByBook);

app.listen(port);
console.log("listening on port " + port);
