var app = angular.module('app',[]);
var model = {};

app.run(function($http){   // Get All "The Old Testament" Books
    $http.get("https://holychicapp.herokuapp.com/getBooksByReligion/The Old Testament").then(function(response){
        model.OldTestament = response.data;
    })
});

app.run(function($http){   // Get All "The New Testament" Books
    $http.get("https://holychicapp.herokuapp.com/getBooksByReligion/The New Testament").then(function(response){
        model.NewTestament = response.data;
    })
});

app.run(function($http){   // Get All "Qoran" Books
	$http.get("https://holychicapp.herokuapp.com/getBooksByReligion/Koran").then(function(response){
		model.Koran = response.data;
	})
});



app.controller('myCtrl', function($scope, $http){
    $scope.books = model;
    $scope.sortField = 'bookNo';
    $scope.sortChapter = 'chapterNo';
    $scope.sortChapterName = 'Chronological';
    $scope.bookName;
    $scope.religionName;
    $scope.currentPage = 'religion';
    $scope.currentChapter = "";

    // Open Book Details by Name
    $scope.openBook = function(bookName, religion){
        $scope.selectedChapter = 1;
        $scope.bookName = bookName;
        $scope.religionName = religion;
        // Get Chapters by BookName
        $http.get("https://holychicapp.herokuapp.com/getChaptersByBook/"+bookName+"").then(function(response){
		    model.chosenBook = response.data;
            // OnLoad "GET" => Open First Chapter
            if(model.chosenBook)
                angular.forEach(model.chosenBook, function (chapter){
                    if(chapter.chapterNo==1)
                        $scope.currentChapter = chapter.data;
                })
	    })
    }

    // Open Chapter Words by ChapterNo
    $scope.showChapter = function(bookName, chosenChapter){
        $scope.selectedChapter = chosenChapter;
        angular.forEach(model.chosenBook, function (chapter){
            if(chapter.chapterNo==chosenChapter)
                $scope.currentChapter = chapter.data;
        });
    }
});




var posKeywords = ["mercy ", "merciful ", "love ", "loves ", "loving", "loved", "heaven ", "heavens ", "happy", "peace", "calm ", "bless", "blessed ", "blessing ", "happiness", "married", "marriage", "marry ", "graced", "hope", "joy ", "joyed", "kindness", "trust", "trusts", "trusted", "tolerate", "trustful", "united", "unity"];

var negKeywords = ["kill ", "hate ", "prison ", "murder ", "kills ", "hates ", "prisoners ", "adultery ", "death", " anger ", "angry ", " angers ", "fear ", "feared ", " die ", " died ", "death ", " dies ", "sad ", "sadness ", "war ", "wars", "hater ", "rape ", "raped", "rapes", "rapist", "revenge", "revenged", "killing", "killed", "persecute ", "grief ", "grieves ", " hell ", " lie ", " lies ", " lied ", "lying ", "murderer ", "murdered ", "murders ", " sin ", "sinned "];


app.filter('highlight', function($sce) {
    return function(currentChapter, phrase) {
        for(i=0; i<posKeywords.length; i++){
          if (phrase) currentChapter = currentChapter.replace(new RegExp('('+posKeywords[i]+')', 'gi'),
            '<span class="posHighlight">$1</span>')
        }
        for(i=0; i<negKeywords.length; i++){
          if (phrase) currentChapter = currentChapter.replace(new RegExp('('+negKeywords[i]+')', 'gi'),
            '<span class="negHighlight">$1</span>')
        }
        return $sce.trustAsHtml(currentChapter)
    }
  })
