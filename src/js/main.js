/**
 * Created by Thinh-Laptop on 11.09.2017.
 */

$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage'],
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
}

function showWork(){
    $("#section03").show();
    $("#contentWork").show();
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

