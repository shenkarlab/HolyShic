var mongoose=require("mongoose"),Chapter=require("./defineSchema/Chapter"),Book=require("./defineSchema/Book");exports.getBooksByReligion=function(a,b){Book.find({}).where("religion").equals(a.params.religion).exec(function(a,c){return a?(console.log(a),b.status(500).send()):b.json(c)})},exports.getChaptersByBook=function(a,b){Chapter.find({}).where("book").equals(a.params.book).exec(function(a,c){return a?(console.log(a),b.status(500).send()):b.json(c)})};
