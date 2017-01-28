var mongoose = require('mongoose');
var Chapter = require('./defineSchema/Chapter');
var Book = require('./defineSchema/Book');
var sortBy = require('sort-by');

// Get Books Grades By Religion (unique)
exports.getBooksByReligion = function(req, res){
	Book.find({}).
	where('religion').equals(req.params.religion).
	exec(function(err, docs){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		return res.json(docs);
	});
}

// Get Chapter Grades By Book (unique)
exports.getChaptersByBook = function(req, res){
	Chapter.find({}).
	where('book').equals(req.params.book).
	exec(function(err, docs){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		return res.json(docs);
	});
}

// Get Words By Book (unique)
exports.getWordsByBook = function(req, res){
	Chapter.find({}).
	where('book').equals(req.params.book).
    where('chapter').equals(1).
	exec(function(err, docs){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		return res.json(docs);
	});
}
