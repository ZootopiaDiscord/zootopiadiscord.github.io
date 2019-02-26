$(document).ready(function () {

    window.scrollTo(0, 0);

    /* load Discord invite link from invite.txt */
    $.get('invite.txt', function (data) {
        $(".modal").append(
            '<a href="' + data + '" class="modal-link">\
                <img src="img/headers/join.svg" alt="join">\
            </a>'
        );
    });

    /*
        Without this, indicator arrow needs 2.7 seconds
        every time window is resized to 768+ pixels width
        -> 3300 = 2700ms delay + 600ms duration
    */
    setTimeout(() => {
        $('.scroll-indicator').children('div').css({ "animation-delay": "100ms" });
    }, 3300);

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
    let animating = 1;

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
                if (animating) {
                    animating = 0;
                    $('.scroll-indicator-shadow').css({ "display": "none" });
                }
                setTimeout(() => {
                    $('.scroll-indicator').addClass("scroll-indicator-up");
                }, 1);

            } else {
                $('.scroll-indicator').removeClass("scroll-indicator-up");
            }
        }, 100);
    };

    /* scroll to rules or top when scroll indicator clicked */
    $('.scroll-indicator').click(function () {
        let scrollDuration = 500;

        if (animating) {
            animating = 0;
            $('.scroll-indicator-shadow').css({ "display": "none" });
        }

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
        $('.modal-container').addClass("modal-container-show");
        $('html,body').css({ "overflow": "hidden" });
    });

    /* close modal */
    $('.modal-container').click(function (e) {
        if (e.target !== e.currentTarget) return;
        $('.modal-container').removeClass("modal-container-show");
        $('html,body').css({ "overflow": "initial", "overflow-x": "hidden" });
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
            case "rp-channels":
                $('.rp').toggleClass("channelCategory-hideRP");
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
