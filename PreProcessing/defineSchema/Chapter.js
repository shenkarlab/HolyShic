var mongoose = require('mongoose');
var schema = mongoose.Schema;
var chapterSchema = new schema({
	chapterNo: Number,
	book: String,
	bookNo: Number,
	religion: String,
	negative: Number,
	positive: Number,
    data: String
}, {collection: 'bibleChapters'});

var Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
