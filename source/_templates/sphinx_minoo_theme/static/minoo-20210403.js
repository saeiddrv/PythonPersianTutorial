
$( document ).ready(function() {

    $("#navigation-toggle").click(function(e) {
        e.preventDefault();
        $("#page").toggleClass("toggled");
        $("#sidebar-toggle-icon").toggleClass("fa-angle-double-left fa-angle-double-right");
        if($("#other-versions").hasClass("toggled")){
            $("#other-versions").toggleClass("toggled");
            $("#current-version i").toggleClass("fa-caret-up fa-caret-down");
        }
    });


    $("#input-search").focus(function() {
        if($(window).height() <= 480){
            $("#sidebar-bottom-versions").hide();
            $("#sidebar-top-links").hide();
            $("#sidebar-top-image").hide();
            $("#wrapper-sidebar-bottom").css("top", (sth - 133) + "px");
        }
    });
    $("#input-search").focusout(function() {
        if($(window).height() <= 480){
            $("#sidebar-bottom-versions").show();
            $("#sidebar-top-links").show();
            $("#sidebar-top-image").show();
            $("#wrapper-sidebar-bottom").css("top", (sth - 3) + "px");
        }
    });

    var sth = $("#sidebar-top").height();

    $("#wrapper-sidebar-bottom").css("top", (sth - 3) + "px");
    $("#sidebar-bottom").height($(window).height() - (sth) - 35);

    $("div[class^='highlight-']").wrap( "<div class='h-scroll'></div>");
    $("div[class^='first highlight-']").wrap( "<div class='h-scroll'></div>");
    $("table.docutils").addClass("table table-bordered");
    $("img").addClass("img-responsive");
    $("table").parent().wrap("<div class='table-responsive'></div>");

    $("table.hlist").unwrap();
    $("table.docutils.footnote").unwrap();
    $("table.docutils.citation").unwrap();
    $("table.last").parents(".table-responsive").addClass("margin-b-z"); 
    $("table.field-list").unwrap();
    $("table.field-list").removeClass("table table-bordered");

    // top button

    $(window).scroll(function() {    
        if ($(this).scrollTop() > 250) {
            $('.back-to-top').fadeIn(300);
	    $('.donate-badge').addClass('active');
        } else {
            $('.back-to-top').fadeOut(300);
            $('.donate-badge').removeClass('active');
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

    //index menu list

    $(".toctree-wrapper li.toctree-l1").each(function(i) {
        $(this).attr("id", "wrapper-toctree-l1-" + i);
        if($(this).find("ul").length){
            $(this).find("ul").hide();
            $("#wrapper-toctree-l1-" + i).prepend("<i class='fa fa-plus-square-o'></i>");
        }
    }); 

    $("li[id^='wrapper-toctree-l1-'] i").click(function(e) {
        e.preventDefault();
        var id = $(this).parents().attr("id");
        $(this).toggleClass("fa-plus-square-o fa-minus-square-o");
        $("#" + id).find("ul").toggle();
    });


    // "Read the Docs" badge

    $('#sidebar-bottom-versions').click(function(e) {
        e.preventDefault();
        $("#other-versions").toggleClass("toggled");
        $("#current-version i").toggleClass("fa-caret-up fa-caret-down");
    });

    $('#other-versions').click(function(e) {
        e.stopPropagation();
    });



   //  custome function
   $("li[id^='wrapper-toctree-l1-'] a").each(function() {
        if ($(this).text().indexOf("گزارش توسعه")>=0) {
           $(this).parent().addClass('make-red');
        }
        if ($(this).text().indexOf("پیش‌گفتار")>=0) {
           $(this).parent().addClass('make-red');
        }
        if ($(this).text().indexOf("گزارش حمایت‌های مالی")>=0) {
           $(this).parent().addClass('make-red');
        }
        if ($(this).text().indexOf("بهترین منابع آموزش پایتون") >= 0) {
           $(this).parent().addClass('make-green');
        }
        if ($(this).text().indexOf("محیط تعاملی پایتون") >= 0) {
           $(this).parent().addClass('make-green');
        }
   });
   //  end custome function




    // get current id in sidebar
    // set scroll

    var crl = $(".toctree-l1.current").attr('id');
    var pos = $("#" + crl).offset();
    $('#sidebar-bottom').animate({scrollTop: pos.top - 232 }, "slow");


});

$( window ).resize(function() {
    $("#sidebar-bottom").height($(window).height() - $("#sidebar-top").height() - 35);
});



    


