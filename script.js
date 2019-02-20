$(document).ready(function () {

    window.scrollTo(0, 0);

    scrollIndicator();

    modal();

    channels();

    /* collapse / open sections */
    $('.sectionHead').click(function () {
        $(this).parent("section").toggleClass("section-collapse");
    });
});

function scrollIndicator() {
    let scrollIndicatorThreshold = 200;
    let scrollPosCheck;

    /* Point scroll indicator upwards if site not scrolled up on load */
    if ($(window).scrollTop() >= scrollIndicatorThreshold) {
        $('.scroll-indicator').addClass("scroll-indicator-up");
    }

    $(window).bind('scroll', function () {
        clearTimeout(scrollPosCheck);
        checkScrollPosition();
    });

    /* Change scroll indicator pointing direction */
    function checkScrollPosition() {
        clearTimeout(scrollPosCheck);
        scrollPosCheck = setTimeout(function () {
            if ($(window).scrollTop() >= scrollIndicatorThreshold) {
                $('.scroll-indicator').removeClass("scroll-indicator-down");
                $('.scroll-indicator').addClass("scroll-indicator-up");
            } else {
                $('.scroll-indicator').removeClass("scroll-indicator-up");
                $('.scroll-indicator').addClass("scroll-indicator-down");
            }
        }, 100);
    };

    /* scroll to rules or top when scroll indicator clicked */
    $('body').on('click', '.scroll-indicator', function () {
        let scrollDuration = 500;

        if ($(window).scrollTop() >= scrollIndicatorThreshold) {
            $('html, body').animate({
                scrollTop: 0
            }, scrollDuration);
        } else {
            $('html, body').animate({
                scrollTop: $('.rules').offset().top
            }, scrollDuration);
        }
    });
}

function modal() {
    /* open modal */
    $('#join-button, #bukoya').click(function () {
        $('.modal').addClass("modal-show");
        $('section,.scroll-indicator').addClass("blur");
        $('.header').addClass("header-removeClip");
        $('.header-link, #bukoya, .scroll-indicator').css({ "pointer-events": "none" });
        $('html,body').css({ "overflow": "hidden" });
    });

    /* close modal */
    $('section').mouseup(function () {
        $('.modal').removeClass("modal-show");
        $('section,.scroll-indicator').removeClass("blur");
        $('.header').removeClass("header-removeClip");
        $('.header-link, #bukoya, .scroll-indicator').css({ "pointer-events": "initial" });
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
        $(this).css({ "pointer-events": "none" });

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
            $(this).css({ "pointer-events": "initial" });
            if ($(".channels").hasClass("section-collapse")) {
                $(".channels").removeClass("section-collapse");
            }
        }, posDifference / 2);
    });
}

$(window).on('beforeunload', function () {
    window.scrollTo(0, 0);
});
