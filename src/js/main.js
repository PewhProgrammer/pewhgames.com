/**
 * Created by Thinh-Laptop on 11.09.2017.
 */

$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['onePage', 'secondPage', '3rdPage'],
        autoScrolling: false,
        css3: true,
        fitToSection: false,
        disableScroll:true,
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
            //$('#callbacksDiv').append('<p>onSlideLeave - anchorLink:' + anchorLink + " index:" + index + " slideIndex:" + slideIndex +" direction:" + direction + " nextSlideIndex:" + nextSlideIndex + '</p>');
            if(slideIndex === 1){
                if(direction === 'left'){
                    //console.log("left arrow dissapear");
                    $(".fp-prev").hide();
                    showProfile();
                }else{
                   //console.log("right arrow dissapear");
                    $(".fp-next").hide();
                    showWork();
                }
                $("#main").css('overflow-y','hidden');
            }else{
                //console.log("both appear");
                $(".fp-controlArrow").show();
                $("#main").css('overflow-y','scroll');
                hideContent();
            }

            //console.log("onSlideLeave--" + "anchorLink: " + anchorLink + " index: " + index + " slideIndex: " + slideIndex + " direction: " + direction);
        }
    });

    var stickyNavTop = $('.nav').offset().top;

    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            $('#nav').addClass('sticky');
            $('#nav').removeClass('static');
            jQuery("nav").fadeTo(1500, 0.2);
        } else {
            $('#nav').removeClass('sticky');
            $('#nav').addClass('static');
            jQuery("nav").fadeTo(1500, 0.2);
        }
    };

    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });
});

function hideContent(){
    $("#section03").hide();
    //$("#sectionContent").hide();
    $("#contentProfile").hide();
    $("#contentWork").hide();
}

function showProfile(){
    $("#section03").show();
    $("#contentProfile").show();
    window.history.pushState("", "", '/profile');
}

function showWork(){
    $("#section03").show();
    $("#contentWork").show();
    window.history.pushState("", "", '/work');
}

$(function() {
    $('a[href*=#]').on('click', function(e) {
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
});

jQuery(window).load(function () {
    $("#loading").hide();
    $("#main").css('visibility', 'visible');
});

