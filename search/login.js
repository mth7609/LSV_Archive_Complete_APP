
import { requestSHA } from "./ServerRequests.js";
import "./RendererLog.js";


$('.logoImage').html("<img src='" + localStorage.getItem("image_1") + "'></img>");
$(".us").on('keydown', checkUserKeydown);
$(".pw").on('keydown', checkUserKeydown);
//$(".loginBody").on('keydown', checkUserKeydown);
$(".loginErrorBody").on('keydown', checkLoginErrorKeydown);
$(".passwordLabel").text(localStorage.getItem("passwordLabel"));
$(".userName").text(localStorage.getItem("userName"));
$(".cancel").text(localStorage.getItem("cancel"));
$(".login").text(localStorage.getItem("login"));
$(".databaseLogin").text(localStorage.getItem("databaseLogin"));
$(".loginErrorCancel").text(localStorage.getItem("close"));
$(".message").text(localStorage.getItem("wrongUserOrPassword"));

$(".us").focus();

$(".cancel").on('click', function (event) {
    window.electronAPI.closeLogin("", "nok");
});


$(".login").on('click', function (event) {
    const user = $('.us').val();
    const password = $('.pw').val();
    requestSHA(user);
    window.electronAPI.closeLogin(user, password, localStorage.getItem(user + "SHA"), localStorage.getItem("userPolicy"));
});


$(".loginErrorCancel").on('click', function (event) {
    window.electronAPI.closeLogin("loginErrorClose", "-", "-", "-");
});


function checkUserKeydown(event) {
    let key = event.which;
    let sw = 0;
    //console.log(key);
    if (key == 27) {
        window.electronAPI.closeLogin("", "nok", "");
        return;
    }

    if (key == 9) {
        if ($('.pw').is(":focus")) {
            //console.log("1");
            $('.pw').blur();
            $('.us').focus();
            return;
        }
        if ($('.us').is(":focus")) {
            //console.log("2");
            $('.pw').focus();
            $('.us').blur();
            return;
        }
    }

    if (key == 13) {
        const user = $('.us').val();
        const password = $('.pw').val();
        requestSHA(user);
        window.electronAPI.closeLogin(user, password, localStorage.getItem(user + "SHA"), localStorage.getItem("userPolicy"));
    }
}


function checkLoginErrorKeydown(event) {
    let key = event.which;
    if (key == 13 || key == 27) {
        window.electronAPI.closeLogin("loginErrorClose", "-", "-");
    }
}