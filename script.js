$(document).ready(function () {

    scrollIndicator();

    modal();

    channels();

    /* collapse / open sections */
    $('.sectionHead').click(function () {
        $(this).parent("section").toggleClass("section-collapse");
    });
});

function scrollIndicator() {
    let shown = false;

    /* show scroll indicator only when page is scrolled to top on load */
    if ($(window).scrollTop() == 0) {
        $('.scroll-indicator').css({ "display": "grid" });
        shown = true;
    }

    /* hide scroll indicator on first scroll */
    $(window).scroll(function () {
        if (shown === true) {
            shown = false;
            $('.scroll-indicator').addClass("scroll-indicator-hide");
            setTimeout(() => {
                $('.scroll-indicator').css({ "display": "none" });
            }, 250);
        }
    });

    /* scroll to rules when scroll indicator clicked */
    $('body').on('click', '.scroll-indicator', function () {
        $('html, body').animate({
            scrollTop: $('.rules').offset().top
        }, 500);
    });
}

function modal() {
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
}

function channels() {
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
        // prevent accidental text selection after click
        $(this).css({"pointer-events" : "none"});

        //calculate distance between clicked element and channels section
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
            $(this).css({"pointer-events" : "initial"});
            if ($(".channels").hasClass("section-collapse")) {
                $(".channels").removeClass("section-collapse");
            }
        }, posDifference / 2);
    });
}