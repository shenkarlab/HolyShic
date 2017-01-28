var mongoose = require('mongoose');
var schema = mongoose.Schema;
var wordSchema = new schema({
	name: {type:String, requried:true},
	wordNo: Number,
	phrase: Number,
	chapter: Number,
	book: String,
	bookNo: Number,
	religion: String,
	weight: Number
}, {collection: 'bibleWords'});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;
