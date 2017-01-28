var app = angular.module('app',[]);
var model = {};

app.run(function($http){   // Get All "The Old Testament" Books
    $http.get("http://localhost:3000/getBooksByReligion/The Old Testament").then(function(response){
        model.OldTestament = response.data;
    })
});

app.run(function($http){   // Get All "The New Testament" Books
    $http.get("http://localhost:3000/getBooksByReligion/The New Testament").then(function(response){
        model.NewTestament = response.data;
    })
});

app.run(function($http){   // Get All "Qoran" Books
	$http.get("http://localhost:3000/getBooksByReligion/Koran").then(function(response){
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
        $http.get("http://localhost:3000/getChaptersByBook/"+bookName+"").then(function(response){
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
        })
    }
});

app.filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) currentChapter = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>')

      return $sce.trustAsHtml(text)
    }
  })
