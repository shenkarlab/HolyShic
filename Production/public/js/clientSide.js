// Scripts by Tom Goldberg
var counetr = 1 ;

$(document).ready(function(){

    $( ".bar" ).append( "<div class='ch_no'>"+
                    "<a href='#'>"+
                        (counetr++)+
                    "</a>"+
                "</div>" );


    $( document ).tooltip();
    $("rect").hover( function(){
        //var $input = $( this );

        //console.log($input.attr("width"));

    });



});


$( window ).resize(function() {
    //var proportion = 150 / 1440 ;
    //var window_width = $(window).width();
    var bar1 = $(".bar").attr("width");
    //var barActual = $(".bar");
    //console.log("barActual : "+ barActual);
    //console.log("calc : " + proportion * 720 );
    //console.log("$(window).width() / 9.6 : "+$(window).width() / 9.6);

    //$(".bar").attr("width" , $(window).width() / 10 );

});
