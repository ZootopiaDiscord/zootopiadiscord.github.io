$(document).ready(function () {

    window.scrollTo(0, 0);

    generateRules();
    generateMods();

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

function generateRules() {
    $.get('rules.txt', function (data) {
        let rawRules = data.split('\n');
        let rules = "";
        for (let index = 0; index < rawRules.length; index++) {
            if (rawRules[index].length < 2) {
                rules += "</ol>"
            }
            else if (rawRules[index].substring(0, 1) == ">") {
                rules += "<li>" + rawRules[index].substring(1) + "</li><ol>";
            }
            else {
                rules += "<li>" + rawRules[index] + "</li>"
            }
        }
        rules += "</ol>"
        $("#ul-rules").html(rules);
    });
    $.get('rules_other.txt', function (data) {
        let rulesOther = "<li>" + data + "</li>";
        $("#ul-other").html(rulesOther);
    });
    $.get('rules_zpd.txt', function (data) {
        let rawRulesZPD = data.split('\n');
        let rulesZPD = "";
        for (let index = 0; index < rawRulesZPD.length; index++) {
            rulesZPD += "<li>" + rawRulesZPD[index] + "</li>"
        }
        $("#ul-zpd").html(rulesZPD);
    });
}

function generateMods() {
    $.get('mods.txt', function (data) {
        let rawMods = data.split('\n');
        let mods = "";
        for (let index = 0; index < rawMods.length; index += 2) {
            mods += '<div class="mod"><a href="http://discordapp.com/users/';
            mods += rawMods[index + 1];
            mods += '"><img src="img/avatars/';
            mods += rawMods[index];
            mods += '.jpg"></a><h2>'
            mods += rawMods[index];
            mods += '</h2></div>'
        }
        $(".mods").children("article").html(mods);
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
                if (!($(this).is(':checked'))) {
                    $('#rp-channels').prop('checked', false);
                    $('.rp').addClass("channelCategory-hideRP");
                    $('#nsfw-channels').prop('checked', false);
                    $('.nsfw').addClass("channelCategory-hideNSFW");
                }
                break;
            case "rp-channels":
                $('.rp').toggleClass("channelCategory-hideRP");
                checkVerifiedChannels();
                break;
            case "nsfw-channels":
                $('.nsfw').toggleClass("channelCategory-hideNSFW");
                checkVerifiedChannels();
                break;
            default:
                break;
        }

        function checkVerifiedChannels() {
            if (!($('#verified-channels').is(':checked'))) {
                $('#verified-channels').prop('checked', true);
                $('.verified').removeClass("channelCategory-hideVerified");
            }
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
