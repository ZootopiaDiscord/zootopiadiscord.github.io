$(document).ready(function () {
    /* from new site, avoids higher maintenance */
    $.get('/invite.txt', function (data) {
        $(".modal").append(
            '<a href="' + data + '" class="modal-link">\
                JOIN\
            </a>'
        );
    });

    /* open modal */
    $('#join-button').click(function () {
        $('.modal-container').addClass("modal-container-show");
        $('html,body').css({ "overflow": "hidden" });
    });

    /* close modal */
    $('.modal-container').click(function (e) {
        if (e.target !== e.currentTarget) return;
        $('.modal-container').removeClass("modal-container-show");
        $('html,body').css({ "overflow": "visible" });
    });
});