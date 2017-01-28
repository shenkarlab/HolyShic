var app = angular.module('app',[]);
//var app = angular.module('app',['ngRoute']);

var model = {};
var bookName;

app.run(function($http){   // Get All "The Old Testament" Books
    $http.get("https://holyshicapp.herokuapp.com/getBooksByReligion/The Old Testament").then(function(response){
        model.OldTestament = response.data;
    })
});

app.run(function($http){   // Get All "The New Testament" Books
    $http.get("https://holyshicapp.herokuapp.com/getBooksByReligion/The New Testament").then(function(response){
        model.NewTestament = response.data;
    })
});

app.run(function($http){   // Get All "Qoran" Books
	$http.get("https://holyshicapp.herokuapp.com/getBooksByReligion/Koran").then(function(response){
		model.Koran = response.data;
	})
});



app.controller('myCtrl', function($scope, $http){
    $scope.books = model;
    $scope.sortField = 'bookNo';
    $scope.bookName;
    $scope.currentPage = 'religion';

    $scope.openBook = function(bookName){
        $scope.currentPage = 'book';
        // clean string (need to fix books names at preprocess DB)
        var array = bookName.split("");
        var tmpArray = [];
        var counter = 0;
        for(i=0; i<array.length; i++){
            if((array[i]!='[')&&(array[i]!=']')&&(array[i]!=null)&&(array[i]!='')){
                tmpArray[counter] = array[i];
                counter++;
            }
        }
        var tmpBookName = tmpArray.join("");
        $scope.bookName = tmpBookName;
        $http.get("https://holyshicapp.herokuapp.com/getChaptersByBook/"+tmpBookName+"").then(function(response){
		    model.chosenBook = response.data;
	    })
    }


});
