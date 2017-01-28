
$(function() {

  var firstMark = 1;
  var context = document.querySelector(".context");
  var instance = new Mark(context);

  var mark = function() {

    var posKeywords = ["mercy", "merciful", "love", "loves", "loving", "loved", "heaven", "heavens", "happy", "peace", "calm", "bless", "blessed", "blessing", "happiness", "married", "marriage", "marry", "graced", "hope", "joy", "joyed", "kindness", "trust", "trusts", "trusted", "tolerate", "trustful", "united", "unity"];

    var negKeywords = ["kill", "hate", "prison", "murder", "kills", "hates", "prisoners", "adultery", "death", "anger", "angry", "angers", "fear", "feared", "die", "died", "death", "dies", "sad", "sadness", "war", "wars", "hater", "rape", "raped", "rapes", "rapist", "revenge", "revenged", "killing", "killed", "persecute", "grief", "grieves", "hell", "lie", "lies", "lied", "lying", "murderer", "murdered", "murders", "sin", "sinned"];

    instance.mark(posKeywords, {"accuracy": "exactly"});
    $("mark").css("color", "blue");
    instance.mark(negKeywords, {"accuracy": "exactly"});

  };

  var wait = function() {
      alert("fuck");
        instance.unmark();
        setTimeout(function(){
              mark();
        }, 3000);
  }

  $(".bookSchema").on("click", wait);
//  $("#chapterTitle").on("click", wait);

});
