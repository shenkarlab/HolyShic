var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bookSchema = new schema({
	name: {type:String, requried:true},
	bookNo: Number,
	religion: String,
	negative: Number,
	positive: Number
}, {collection: 'bibleBooks'});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
