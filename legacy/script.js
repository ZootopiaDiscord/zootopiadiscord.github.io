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

    $.get('../sections/rules.txt', function (data) {
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
                let rule = rawRules[index];
                rule = rule.replace(/<channel>/g, '<span class="channel">')
                    .replace(/<command>/g, '<span class="command">')
                    .replace(/<\/>/g, '</span>');
                rules += "<li>" + rule + "</li>"
            }
        }
        rules += "</ol>"
        $("#ul-rules").html(rules);
    });
    $.get('sections/rules_other.txt', function (data) {
        let rulesOther = "<li>" + data + "</li>";
        $("#ul-other").html(rulesOther);
    });
    $.get('sections/rules_zpd.txt', function (data) {
        let rawRulesZPD = data.split('\n');
        let rulesZPD = "";
        for (let index = 0; index < rawRulesZPD.length; index++) {
            rulesZPD += "<li>" + rawRulesZPD[index] + "</li>"
        }
        $("#ul-zpd").html(rulesZPD);
    });
});