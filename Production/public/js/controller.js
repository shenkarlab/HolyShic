var app=angular.module("app",[]),model={};app.run(function(a){a.get("https://holychicapp.herokuapp.com/getBooksByReligion/The Old Testament").then(function(a){model.OldTestament=a.data})}),app.run(function(a){a.get("https://holychicapp.herokuapp.com/getBooksByReligion/The New Testament").then(function(a){model.NewTestament=a.data})}),app.run(function(a){a.get("https://holychicapp.herokuapp.com/getBooksByReligion/Koran").then(function(a){model.Koran=a.data})}),app.controller("myCtrl",function(a,b){a.books=model,a.sortField="bookNo",a.sortChapter="chapterNo",a.sortChapterName="Chronological",a.bookName,a.religionName,a.currentPage="religion",a.currentChapter="",a.openBook=function(c,d){a.selectedChapter=1,a.bookName=c,a.religionName=d,b.get("https://holychicapp.herokuapp.com/getChaptersByBook/"+c).then(function(b){model.chosenBook=b.data,model.chosenBook&&angular.forEach(model.chosenBook,function(b){1==b.chapterNo&&(a.currentChapter=b.data)})})},a.showChapter=function(b,c){a.selectedChapter=c,angular.forEach(model.chosenBook,function(b){b.chapterNo==c&&(a.currentChapter=b.data)})}});var posKeywords=["mercy ","merciful ","love ","loves ","loving","loved","heaven ","heavens ","happy","peace","calm ","bless","blessed ","blessing ","happiness","married","marriage","marry ","graced","hope","joy ","joyed","kindness","trust","trusts","trusted","tolerate","trustful","united","unity"],negKeywords=["kill ","hate ","prison ","murder ","kills ","hates ","prisoners ","adultery ","death"," anger ","angry "," angers ","fear ","feared "," die "," died ","death "," dies ","sad ","sadness ","war ","wars","hater ","rape ","raped","rapes","rapist","revenge","revenged","killing","killed","persecute ","grief ","grieves "," hell "," lie "," lies "," lied ","lying ","murderer ","murdered ","murders "," sin ","sinned "];app.filter("highlight",function(a){return function(b,c){for(i=0;i<posKeywords.length;i++)c&&(b=b.replace(new RegExp("("+posKeywords[i]+")","gi"),'<span class="posHighlight">$1</span>'));for(i=0;i<negKeywords.length;i++)c&&(b=b.replace(new RegExp("("+negKeywords[i]+")","gi"),'<span class="negHighlight">$1</span>'));return a.trustAsHtml(b)}});
