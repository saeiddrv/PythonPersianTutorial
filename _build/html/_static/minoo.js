
$( document ).ready(function() {

    var navToggle = false;

    $("#navigation-toggle").click(function(e) {
        e.preventDefault();
        $("#page").toggleClass("toggled");
        $("#sidebar-toggle-icon").toggleClass("fa-angle-double-left fa-angle-double-right");
        if(navToggle){
            $("#page-sidebar").removeClass("notransition");
        }else{
            setTimeout(function(){
                $("#page-sidebar").addClass("notransition");
            }, 500); 
        }
        navToggle = ! navToggle;
        if($("#other-versions").hasClass("toggled")){
            $("#other-versions").toggleClass("toggled");
            $("#current-version i").toggleClass("fa-caret-up fa-caret-down");
        }
    });

    var sth = $("#sidebar-top").height();
    $("#sidebar-bottom").css("margin-top", (sth - 1) + "px");
    $("#sidebar-bottom").height($(window).height() - sth);

    $("div[class^='highlight-']").wrap( "<div class='h-scroll'></div>");
    $("div[class^='first highlight-']").wrap( "<div class='h-scroll'></div>");
    $("table.docutils").addClass("table table-bordered");
    $("img").addClass("img-responsive");
    $("table").wrap("<div class='table-responsive'></div>");

    $("table.hlist").unwrap()
    $("table.docutils.footnote").unwrap()
    $("table.docutils.citation").unwrap()
    $("table.last").parents(".table-responsive").addClass("margin-b-z"); 
    $("table.field-list").unwrap()
    $("table.field-list").removeClass("table table-bordered")

    // top button

    $(window).scroll(function() {    
        if ($(this).scrollTop() > 250) {
            $('.back-to-top').fadeIn(300);
        } else {
            $('.back-to-top').fadeOut(300);
        }        
    });

    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
        return false;
    });

    $('.back-to-top').hide();


    //Sidebar menu list

    $("#sidebar-bottom-list #tree-toc li.toctree-l1").each(function(i) {
        $(this).attr("id", "toctree-l1-" + i);
        if($(this).find("ul").length){
            if(!$(this).hasClass("current")){
                $(this).find("ul").hide();
                $("#toctree-l1-" + i).prepend("<i class='fa fa-plus-square-o'></i>");
            }else{
                $("#toctree-l1-" + i).prepend("<i class='fa fa-minus-square-o'></i>");
            }
        }
    }); 

    $("li[id^='toctree-l1-'] i").click(function(e) {
        e.preventDefault();
        var id = $(this).parents().attr("id");
        $(this).toggleClass("fa-plus-square-o fa-minus-square-o");
        $("#" + id).find("ul").toggle();
    });


    // "Read the Docs" badge

    $('#current-version').click(function(e) {
        e.preventDefault();
        $("#other-versions").toggleClass("toggled");
        $("#current-version i").toggleClass("fa-caret-up fa-caret-down");
    });


    $("span.emoji-size:contains('✔')").parent().addClass("plevel");

});

$( window ).resize(function() {

    $("#sidebar-bottom").height($(window).height() - $("#sidebar-top").height());

});



    


