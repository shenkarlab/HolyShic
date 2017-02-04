// Control on -> Page Behavior
$(function() {

    var showBook1 = 1;
    var showBook2 = 1;
    var showBook3 = 1;
    var totalOpens = 3;
    var tempPadding = 0;
    var descriptionOpen = 0;
    var sortOptionOpen = 0;

    // Control on -> Enable / Disable - Book Details
    var openBookDetails = function() {
        $(".bookSchema").on("click", function(){
            if(descriptionOpen==0){
                descriptionOpen = 1;
                $("#menu").css("width", "71%");
                $("#menu").css("padding-left", "13%");
                openedBookDetails();
            }
        });

        $("#closeX").on("click", function(){
            descriptionOpen = 0;
            $("#menu").css("width", "100%");
            $("#menu").css("padding-left", "20%");
            openedBookDetails();
        });
    }

    // Control on -> Enable / Disable / Resize - Graphs
    var resizeGraph = function() {
        // Need to make this generic to final project
        $(".linkBook1").on("click", function(){
            if(showBook1){
                showBook1 = 0;
                $("#oldTestament").hide(200);
                $(".titleBook1").hide(200);
                $(".eye1").css("background-image", "url('images/closed_eye_icon.png')");
            }
            else {
                showBook1 = 1;
                $("#oldTestament").show(200);
                $(".titleBook1").show(200);
                $(".eye1").css("background-image", "url('images/open_eye_icon.png')");
            }
            resizeObjects();
        });

        $(".linkBook2").on("click", function(){
            if(showBook2){
                showBook2 = 0;
                $("#newTestament").hide(200);
                $(".titleBook2").hide(200);
                $(".eye2").css("background-image", "url('images/closed_eye_icon.png')");
            }
            else {
                showBook2 = 1;
                $("#newTestament").show(200);
                $(".titleBook2").show(200);
                $(".eye2").css("background-image", "url('images/open_eye_icon.png')");
            }
            resizeObjects();
        });

        $(".linkBook3").on("click", function(){
            if(showBook3){
                showBook3 = 0;
                $("#koran").hide(200);
                $(".titleBook3").hide(200);
                $(".eye3").css("background-image", "url('images/closed_eye_icon.png')");
            }
            else{
                showBook3 = 1;
                $("#koran").show(200);
                $(".titleBook3").show(200);
                $(".eye3").css("background-image", "url('images/open_eye_icon.png')");
            }
            resizeObjects();
        });
    };

    // This will resize the objects
    function resizeObjects(){
            totalOpens = showBook1+showBook2+showBook3;
            tempPadding = 20+(3-totalOpens)*8;
            if(descriptionOpen)
                $("#menu").css("padding-left", ""+tempPadding/1.5+"%");
            else $("#menu").css("padding-left", ""+tempPadding+"%");
            if(totalOpens!=3)
                $(".imgPattern").css("width", "138px");
            else $(".imgPattern").css("width", "110px");
    }


    // Control on -> Enable / Disable Sorting Options
    var openSortOptions = function() {
        $(".sortOpt").on("click", function(){
            if(sortOptionOpen==0){
                sortOptionOpen = 1;
                $("#sortsOpt").show();
            }
            else {
                sortOptionOpen = 0;
                $("#sortsOpt").hide();
            }
        });
    }


    // Control on -> Enable / Disable Hover Graph Line
    var graphLineHover = function() {
        $(document).on('mouseover','.graphLine',function() {
            $(this).children("span").show(200);
            $(this).children("span").css("position","relative");
            $(this).children("span").css("top","20px");
            $(this).children("span").css("font-size","10px");
            $(this).children("span").css("color","#000");
            console.log($(window).width());
            if( $(window).width() > 1120){
                console.log("height");
                $(this).children("span").css("left","15px");
            } else {
                console.log("low");
                $(this).children("span").css("left","-14%");
            }


        });
        $(document).on('mouseleave','.graphLine',function() {
            $(this).children("span").hide(200);
        });
    }

    // Responsive - change div size and location while details open
    var openedBookDetails = function() {
        if( $(window).width() > 1120 ) {
            if(descriptionOpen==1){
                $(".bookDetails").css("position", "fixed");
                $(".bookDetails").css("width", "35%");
                $(".bookDetails").css("top", "0");
                $(".bookDetails").css("right", "0%");
                $(".bookDetails").css("padding", "30px");
                $(".bookDetails").css("height", "100%");
                $(".bookDetails").css("background", "rgba(128, 128, 128, 0.1)");
            } else {
                $(".bookDetails").css("position", "fixed");
                $(".bookDetails").css("width", "35%");
                $(".bookDetails").css("top", "0");
                $(".bookDetails").css("right", "-35%");
                $(".bookDetails").css("padding", "30px");
                $(".bookDetails").css("height", "100%");
                $(".bookDetails").css("background", "rgba(128, 128, 128, 0.1)");
            }
        } else {
            if(descriptionOpen==1){
                $(".bookDetails").css("position", "fixed");
                $(".bookDetails").css("bottom", "0%");
                $(".bookDetails").css("width", "100%");
                $(".bookDetails").css("top", "auto");
                $(".bookDetails").css("right", "0%");
                $(".bookDetails").css("background", "#e6e6e6");
                $(".bookDetails").css("height", "50%");
                $(".bookDetails").css("padding", "1%");
            } else {
                $(".bookDetails").css("position", "fixed");
                $(".bookDetails").css("bottom", "-50%");
                $(".bookDetails").css("width", "100%");
                $(".bookDetails").css("top", "auto");
                $(".bookDetails").css("right", "0%");
                $(".bookDetails").css("background", "#e6e6e6");
                $(".bookDetails").css("height", "50%");
                $(".bookDetails").css("padding", "1%");
            }
        }
    }

    openBookDetails();
    resizeGraph();
    openSortOptions();
    graphLineHover();
    openedBookDetails();
});
