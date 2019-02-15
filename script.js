$(document).ready(function () {

    if($(window).scrollTop() == 0){
        $('.scroll-indicator').css({"display" : "grid"});
    }

    /* open modal */
    $('#join-button').click(function () {
        $('.modal').addClass("modal-show");
        $('section,.bukoya,.scroll-indicator').addClass("blur");
        $('.header').addClass("header-removeClip");
        $('.header-link').css({ "pointer-events": "none" });
        $('html,body').css({ "overflow": "hidden" });
    });

    /* close modal */
    $('section').mouseup(function () {
        $('.modal').removeClass("modal-show");
        $('section,.bukoya,.scroll-indicator').removeClass("blur");
        $('.header').removeClass("header-removeClip");
        $('.header-link').css({ "pointer-events": "initial" });
        $('html,body').css({ "overflow": "initial" });
    });

    /* collapse / open sections */
    $('.sectionHead').click(function () {
        $(this).parent("section").toggleClass("section-collapse");
    });

    /* collapse / open channel category */
    $('.channels article ul li:first-child').click(function () {
        $(this).parent("ul").children("li").not(".channels article ul li:first-child").toggleClass("channelCategory-hide");
        $(this).parent("ul").children("li:first-child").toggleClass("channelCategory-closed");
    });

    /* filter channels */
    $('.channels input').click(function () {
        switch ($(this).attr('id')) {
            case "verified-channels":
                $('.verified').toggleClass("channelCategory-hideVerified");
                break;
            case "nsfw-channels":
                $('.nsfw').toggleClass("channelCategory-hideNSFW");
                break;
            default:
                break;
        }
    });

    /* scroll to channel */
    $('.channel').click(function () {
        let scrollPosition = $(window).scrollTop();
        let channelsPosition = $(".channels").offset().top;
        let posDifference = channelsPosition - scrollPosition;
        if (posDifference < 0) {
            posDifference = posDifference * (-1);
        }
        $('html, body').animate({
            scrollTop: channelsPosition
        }, posDifference / 2);
        setTimeout(() => {
            if ($(".channels").hasClass("section-collapse")) {
                $(".channels").removeClass("section-collapse");
            }
        }, posDifference / 2);
    });

    /* hide scroll indicator */
    $(window).scroll(function () {
        $('.scroll-indicator').addClass("scroll-indicator-hide");
        setTimeout(() => {
            $('.scroll-indicator').css({"display" : "none"});
        }, 250);
    });

    /* scroll to rules when scroll indicator clicked */
    $('body').on('click', '.scroll-indicator', function(){
        $('html, body').animate({
            scrollTop: $('.rules').offset().top
        }, 500);
    });
});