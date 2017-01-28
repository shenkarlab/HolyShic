
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds023550.mlab.com:23550/db_ringapp2016_g');
var Word = require('./defineSchema/Word');
var Chapter = require('./defineSchema/Chapter');
var Book = require('./defineSchema/Book');
var conn = mongoose.connection;
conn.setMaxListeners(Infinity);

var bookCount = 0;
var wordCount = 0;
var wordinPhrase = 0;
var phraseCount = 1;
var chapterCount = 0;
var chapterInt = 0;
var chapterData = "";
var cleanBookName = "";

var bookSumNeg = 0;
var bookSumPos = 0;
var chapterSumNeg = 0;
var chapterSumPos = 0;

var religionName;
var bookName;
var startParse = 0;
var runOnce = 1;


var LineByLineReader = require('line-by-line'),
//lr = new LineByLineReader('data/OldTestament.txt');
//lr = new LineByLineReader('data/NewTestament.txt');
lr = new LineByLineReader('data/Koran.txt');

console.log("<============Start============>");


lr.on('error', function (err) {
	console.log("File Doesnt Exist !");
});


lr.on('line', function (line) {

	// Recognize Religion Book
	if(runOnce) {
        runOnce = 0;
		console.log("#Religion Book: ");
		religionName = line;
	}

	// Recognize Book Name
	if(line[0]=="[") {
        AddtoChapterDB(chapterCount, bookName, bookCount, religionName, chapterSumNeg, chapterSumPos, chapterData);
        AddToBookDB(cleanBookName, bookCount, religionName, bookSumNeg, bookSumPos);
        chapterData = "";
        cleanBookName = "";
        for(i=1; i<line.length-1; i++)
            cleanBookName += line[i];

		bookCount++;
        bookSumPos = 0;
        bookSumNeg = 0;
        chapterSumNeg = 0;
        chapterSumPos = 0;


		bookName = cleanBookName;
		chapterCount = 1;
		startParse = 0;
        lr.resume();
	}

	// Recognize Chapter + Phrase
	if(parseInt(line[0])) {
		startParse = 1;
		chapterInt = parseInt(line[0]);
		// Check Double Digit
		if(parseInt(line[1])>=0){
			chapterInt = parseInt(line[0])*10+parseInt(line[1]);
		}
		// Check Three Digit
		if((parseInt(line[1])>=0)&&(parseInt(line[2])>=0)){
			chapterInt = parseInt(line[0])*100 + parseInt(line[1])*10 + parseInt(line[2]);
		}
		// Increased Phrase
		if(chapterInt==chapterCount) {
			console.log("*Phrase Number: "+phraseCount);
			phraseCount++
			wordinPhrase = 1;
		}
		// Check if Chapter Changed
		if(chapterInt!=chapterCount) {
			AddtoChapterDB(chapterCount, bookName, bookCount, religionName, chapterSumNeg, chapterSumPos, chapterData);
            chapterData = "";
			chapterCount++;
            chapterSumPos = 0;
            chapterSumNeg = 0;
			console.log("\n"+"### Chapter Number: "+chapterCount+" ###\n");
			phraseCount = 1;
			console.log("*Phrase Number: "+phraseCount);
			phraseCount++
			wordinPhrase = 1;
		}
	}
	console.log (line);

	// Check if Words Should Added to DB
	if((line!="")&&(startParse==1)){
        chapterData += line;
		var words = line.split(/[\s.,;:]+/);
		for(i=0; i<words.length; i++){
			if((words[i]!="")&&(!parseInt(words[i].split("",1))>0)){
				wordinPhrase++;
                weight = CheckPosNeg(words[i]);
			}
		}
	}
});


lr.on('end', function () {
    AddtoChapterDB(chapterCount, bookName, bookCount, religionName, chapterSumNeg, chapterSumPos, chapterData);
    AddToBookDB(bookName, bookCount, religionName, bookSumNeg, bookSumPos);
	console.log("\nLoaded Successfully !\n");
	console.log("\nTotal Words: "+wordCount+"\n");
	console.log("\nTotal Books: "+bookCount+"\n");
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
});




function AddtoChapterDB(chapterNo, book, bookNo, religion, SumNeg, SumPos, data){
	var newChapter = new Chapter({
		chapterNo: chapterNo,
		book: book,
		bookNo: bookNo,
		religion: religion,
		negative: SumNeg,
		positive: SumPos,
        data: data
	});
	newChapter.save(function(err, doc) {
		if(err)
			console.log(err);
		else {
			console.log("\nSaved New Chapter! " + doc);
		}
	})
};


function AddToBookDB(book, bookNo, religion, SumNeg, SumPos){
	var newBook = new Book({
		name: book,
		bookNo: bookNo,
		religion: religion,
		negative: SumNeg,
		positive: SumPos
	});
	newBook.save(function(err, doc) {
		if(err)
			console.log(err);
		else {
			console.log("\nSaved New Book! " + doc);
		}
	})
};


function CheckPosNeg(word){
	if((word=="mercy")||(word=="love")||(word=="loves")||(word=="heavens")||(word=="heaven")||(word=="happy")||(word=="peace")||(word=="calm")||(word=="bless")||(word=="blessed")||(word=="blessing")||(word=="happiness")||(word=="married")||(word=="marriage")||(word=="marry")||(word=="graced")||(word=="hope")||(word=="joy")||(word=="joyed")||(word=="kindness")||(word=="loved")||(word=="loving")||(word=="trust")||(word=="trusts")||(word=="trusted")||(word=="tolerate")||(word=="trustful")||(word=="united")||(word=="unity")||(word=="merciful")){
		chapterSumPos++;
		bookSumPos++;
		return 1;
	}

	if((word=="kill")||(word=="hate")||(word=="prison")||(word=="murder")||(word=="kills")||(word=="hates")||(word=="prisoners")||(word=="adultery")||(word=="death")||(word=="anger")||(word=="angry")||(word=="angers")||(word=="fear")||(word=="feared")||(word=="die")||(word=="died")||(word=="death")||(word=="dies")||(word=="sad")||(word=="sadness")||(word=="war")||(word=="wars")||(word=="hater")||(word=="rape")||(word=="raped")||(word=="rapes")||(word=="rapist")||(word=="revenge")||(word=="revenged")||(word=="killing")||(word=="killed")||(word=="persecute")||(word=="grief")||(word=="grieves")||(word=="hell")||(word=="lie")||(word=="lies")||(word=="lied")||(word=="lying")||(word=="murderer")||(word=="murdered")||(word=="murders")||(word=="sin")||(word=="sinned")){
		chapterSumNeg++;
		bookSumNeg++;
		return -1;
	}
}
