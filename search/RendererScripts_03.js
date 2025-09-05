import { globalDataset } from "./Globals.js";
import { log } from "./RendererLog.js";

// for modal window save
export async function runForeverShowMessage(callCnt) {
    callCnt++;
    setTimeout(function () {
        if (localStorage.getItem("messageOK") == 1) {
            return;
        }
        runForeverShowMessage(callCnt);
    }, 500);
};


export async function runForeverConfirmDoSave(callCnt) {
    callCnt++;
    setTimeout(function () {
        if (localStorage.getItem("confirmSaveOverwrite") == 1) {
            //log("Overwrite 2");
            saveDataset();
            localStorage.setItem("changeDatasetNumber", null);
            localStorage.setItem("datasetNumber", null);
            return;
        }
        runForeverConfirmDoSave(callCnt);
    }, 500);
};


export async function runForeverConfirmDoDelete(callCnt) {
    callCnt++;
    setTimeout(function () {
        if (localStorage.getItem("confirmDelete") == 1) {
            //log("Delete");
            deleteDataset();
            localStorage.setItem("changeDatasetNumber", null);
            localStorage.setItem("datasetNumber", null);
            return;
        }
        runForeverConfirmDoDelete(callCnt);
    }, 500);
};


export function setStatus1(str) {
    $(".statusbar1").css("color", "#000000");
    $(".statusbar1").css("background-color", "#c2e2ec");
    $(".statusText1").html(str);
}


export function setStatus2(str) {
    $(".statusbar2").css("color", "#000000");
    $(".statusbar2").css("background-color", "#c2e2ec");
    $(".statusText2").html(str);
}


export function setStatus3(str) {
    //log("st: " + str);
    $(".statusbar3").css("color", "#000000");
    $(".statusbar3").css("background-color", "#c2e2ec");
    $(".statusText3").html(str);
}


export function setStatus4(str) {
    $(".statusbar4").css("color", "#000000");
    $(".statusbar4").css("background-color", "#c2e2ec");
    $(".statusText4").html(str);
}


export function setStatus5(str) {
    $(".statusbar5").css("color", "#000000");
    $(".statusbar5").css("background-color", "#c2e2ec");
    $(".statusText5").html(str);
}


export function setStatus6(str) {
    $(".statusbar6").css("color", "#000000");
    $(".statusbar6").css("background-color", "#c2e2ec");
    $(".statusText6").html(str);
}


export function setStatusWarning(pos, text) {
    let fkt = "setStatus" + pos + "('" + text + "')";
    eval(fkt);
    $(".statusbar" + pos).css("background-color", "#dd0000");
    $(".statusbar" + pos).css("color", "#ffffff");
    setTimeout(() => {
        let fkt = "setStatus" + pos + "('" + text + "')";
        eval(fkt);
        $(".statusbar" + pos).css("color", "#000000");
        $(".statusbar" + pos).css("background-color", "#c2e2ec");
        fkt = "setStatus" + pos + "('')";
        eval(fkt);
        if (pos == 3)
            setStatus3(localStorage.getItem("showMode"));
    }, 4000);
}


export function setStatusWarningPermanent(pos, text) {
    let fkt = "setStatus" + pos + "('" + text + "')";
    eval(fkt);
    $(".statusbar" + pos).css("background-color", "#dd0000");
    $(".statusbar" + pos).css("color", "#ffffff");
}


export function setStatusInformationPermanent(pos, text) {
    let fkt = "setStatus" + pos + "('" + text + "')";
    eval(fkt);
    $(".statusbar" + pos).css("background-color", "#00dd00");
    $(".statusbar" + pos).css("color", "#000000");
}


export function setStatusInformation(pos, text) {
    let fkt = "setStatus" + pos + "('" + text + "')";
    eval(fkt);
    $(".statusbar" + pos).css("background-color", "#00dd00");
    $(".statusbar" + pos).css("color", "#000000");
    setTimeout(() => {
        let fkt = "setStatus" + pos + "('" + text + "')";
        eval(fkt);
        $(".statusbar" + pos).css("color", "#000000");
        $(".statusbar" + pos).css("background-color", "#c2e2ec");
        fkt = "setStatus" + pos + "('')";
        eval(fkt);
        if (pos == 3)
            setStatus3(localStorage.getItem("showMode"));
    }, 4000);
}


export function setStatusTodo(pos, text) {
    let fkt = "setStatus" + pos + "('" + text + "')";
    eval(fkt);
    $(".statusbar" + pos).css("background-color", "#0000dd");
    $(".statusbar" + pos).css("color", "#ffffff");
    setTimeout(() => {
        let fkt = "setStatus" + pos + "('" + text + "')";
        eval(fkt);
        $(".statusbar" + pos).css("color", "#000000");
        $(".statusbar" + pos).css("background-color", "#c2e2ec");
        fkt = "setStatus" + pos + "('')";
        eval(fkt);
        if (pos == 3)
            setStatus3(localStorage.getItem("ShowMode"));
    }, 4000);
}


export function setStatusTodoPermanent(pos, text) {
    let fkt = "setStatus" + pos + "('" + text + "')";
    eval(fkt);
    $(".statusbar" + pos).css("background-color", "#0000dd");
    $(".statusbar" + pos).css("color", "#ffffff");
}


export function setUserStatus(nr) {
    let loginUser = localStorage.getItem("loginUser");
    setStatus5("Angemeldet als: " + loginUser);
    if (globalDataset.contentValue[0]["released"] == 0)
        setStatus4("Bearbeitet von: " + globalDataset.contentValue[0]["lastUser"]);
    else
        setStatus4("Freigegeben von: " + globalDataset.contentValue[0]["releasedWho"]);
}


export function checkAdmin() {
    let user = new String(localStorage.getItem("loginUser").toLowerCase());
    if (user.includes("admin"))
        return true;
    else
        return false
}
