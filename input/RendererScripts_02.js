import { doDatasetRemember, getMilliseconds1970, setDatasetUnchanged, prepareNumber, clearInput, setToNew, doNew } from "./RendererScripts_01.js";
import { checkAdmin, setStatusWarning, setStatusWarningPermanent, runForeverConfirmDoSave, setUserStatus, runForeverShowMessage, runForeverConfirmDoDelete, setStatusInformation, setStatusInformationPermanent, setStatus1, setStatus2 } from "./RendererScripts_03.js";
import { requestAllDatasetNumbers, requestCheckDatasetNumber, requestDataset, requestLastUser, requestComment } from "./ServerRequests.js";
import { globalDatasetNumbers, globalDataset } from "./Globals.js";
import { log } from "./RendererLog.js";

var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
var hex = function (x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

export function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


export function showDBStatus(st) {
    if (st === "OK") {
        setStatus1(localStorage.getItem("dbConnected") + ". " + localStorage.getItem("versionOfProgram") + " " + localStorage.getItem("initDate"));
        $(".statusbar1").css("background-color", "#c2e2ec");
        $(".statusbar1").css("color", "#000000");
        return true;
    }
    else {
        setStatus1(localStorage.getItem("dbDisconnected"));
        $(".statusbar1").css("background-color", "#ff1111");
        $(".statusbar1").css("color", "#ffffff");
        return false;
    }
}


export function removeTabs() {
    let i;
    for (i = 1; i <= localStorage.getItem("maxSearchSets"); i++) {
        //log("Tab nr: " + i);
        $(".navtab-" + i).removeClass("active");
        $(".tab-" + i).removeClass("active");
        $(".navtab-" + i).remove();
        $(".tab-" + i).remove();
    }
    $(".navtab-0").addClass("active");
    $(".navtab-0").click();
    $(".tab-0").show();
    localStorage.setItem("selectCnt", 1);
}


export function hideTabContent(nr) {
    $(".tab-" + nr).hide();
    $('.navtab-' + nr).css("background", "#ffffff");
    $('.navtab-' + nr).css("color", "#000000");

}


export function newTab(nr, link, name) {
    $(".tab-" + nr).removeClass("active");
    $(".tab-" + nr).remove();

    $(".nav").append('<button class="nav-link navtabCSS navtab-' + nr + '" data-bs-toggle="tab" data-bs-target="#cnt-' + nr + '" type="button" role="tab">' + name + '</button>');
    $(".tab-content").append('<div class="tab-pane tab-' + nr + '" id="cnt-' + nr + '" role="tabpanel"' + name + '</div >');
    $(".tab-content").after('<script>$(".tab-' + nr + '").load("' + link + '")</script>');

    setTabActive(0);
    $(".navtab-" + nr).on('click', function (event) {
        setTabActive(nr);
        $(".tab-" + nr).show();
        //log("newTab(), Tab nr: " + nr);
    });
}


export function setTabActive(nr) {
    //log("nr: " + nr);

    for (let i = 0; i <= localStorage.getItem("maxDatasetTabs"); i++) {
        if (i != nr && $(".tab-" + i).show()) {
            hideTabContent(i);
        }
    }
    $('.navtab-' + nr).css("background", "#056289");
    $('.navtab-' + nr).css("color", "#ffffff");
}

export function checkTab(pnr) {
    let i;
    for (i = 0; i <= localStorage.getItem("maxDatasetTabs"); i++) {
        if ($(".navtab-" + i).text() == pnr) {
            return true;
        }
    }
    return false;
}


export function checkTabPosition(pnr) {
    let i;
    for (i = 0; i <= localStorage.getItem("maxDatasetTabs"); i++) {
        if ($(".navtab-" + i).text() == pnr) {
            return i;
        }
    }
    return 0;
}


export function checkForDataset(nr) {
    requestCheckDatasetNumber(nr);
    return localStorage.getItem(nr);
}


export function doKeydown(event) {
    let key = event.which;
    let i, nr;
    const keyCtrl = 17;

    let keyLast = localStorage.getItem("keyLast");

    if (key == 13 && $(".dsNumber").is(":focus")) {
        localStorage.setItem("keyLast", 0);
        doFetch();
        return;
    }

    if (key == 9) //tab
    {
        let elcnt = localStorage.getItem("topFormElementActive");
        localStorage.setItem("topFormElementActive", ++elcnt);

        //        log(elcnt);
        switch (elcnt) {
            case 0:
                $(".dropdownState").blur();
                $(".dropdownState").css("backgroundColor", "#ffffff");
                $(".name").focus();
                $(".name").click();
                $(".name").css("backgroundColor", "#aaf2fc");
                setTimeout(() => {
                    $(".name").css("backgroundColor", "#ffffff");
                }, 1000);
                break;
            case 1:
                $(".name").blur();
                $(".name").css("backgroundColor", "#ffffff");
                $(".publishNo").focus();
                $(".publishNo").click();
                $(".publishNo").css("backgroundColor", "#aaf2fc");
                setTimeout(() => {
                    $(".publishNo").css("backgroundColor", "#ffffff");
                }, 1000);
                break;
            case 2:
                $(".publishNo").blur();
                $(".publishNo").css("backgroundColor", "#ffffff");
                $(".dropdownYear").css("color", "#000000");
                $(".dropdownYear").focus();
                $(".dropdownYear").click();
                $(".dropdownYear").css("backgroundColor", "#aaf2fc");
                setTimeout(() => {
                    $(".dropdownYear").css("backgroundColor", "#ffffff");
                }, 1000);
                break;
            case 3: $(".dropdownYear").blur();
                $(".dropdownYear").css("backgroundColor", "#ffffff");
                $(".city").focus();
                $(".city").click();
                $(".city").css("backgroundColor", "#aaf2fc");
                setTimeout(() => {
                    $(".city").css("backgroundColor", "#ffffff");
                }, 1000);
                break;
            case 4: $(".city").blur();
                $(".city").css("backgroundColor", "#ffffff");
                $(".dsNumber").focus();
                $(".dsNumber").click();
                $(".dsNumber").css("backgroundColor", "#aaf2fc");
                setTimeout(() => {
                    $(".dsNumber").css("backgroundColor", "#ffffff");
                }, 1000);
                break;
            case 5: $(".dsNumber").blur();
                $(".dsNumber").css("backgroundColor", "#ffffff");
                $(".comment").focus();
                $(".comment").click();
                $(".comment").css("backgroundColor", "#aaf2fc");
                setTimeout(() => {
                    $(".comment").css("backgroundColor", "#ffffff");
                }, 1000);
                break;
            case 6: $(".comment").blur();
                $(".comment").css("backgroundColor", "#ffffff");
                $(".schoolPublisher").focus();
                $(".schoolPublisher").click();
                $(".schoolPublisher").css("backgroundColor", "#aaf2fc");
                setTimeout(() => {
                    $(".schoolPublisher").css("backgroundColor", "#ffffff");
                }, 1000);
                break;
            case 7: $(".schoolPublisher").blur();
                $(".schoolPublisher").css("backgroundColor", "#ffffff");
                $(".dropdownState").css("color", "#000000");
                $(".dropdownState").focus();
                $(".dropdownState").click();
                $(".dropdownState").css("backgroundColor", "#aaf2fc");
                localStorage.setItem("topFormElementActive", -1);
                setTimeout(() => {
                    $(".dropdownState").css("backgroundColor", "#ffffff");
                }, 1000);
                break;
            default:
                localStorage.setItem("topFormElementActive", -1);
        }
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    //log(key);

    switch (key) {
        case keyCtrl: localStorage.setItem("keyLast", keyCtrl); return;
        case 37: break;
        case 39: break;
        case 77: break;
        case 76: break;
        case 83: break;
        case 78: break;
        case 65: break;
        case 73: break;
        case 82: break;
        default: localStorage.setItem("keyLast", 0); return;
    }

    if (key == 65 && keyLast == keyCtrl) {  //a
        doFetch();
        localStorage.setItem("keyLast", 0);
        return;
    }

    if (key == 82 && keyLast == keyCtrl) {  //r
        removeTabs();
        requestAllDatasetNumbers();
        return;
    }

    if (key == 77 && keyLast == keyCtrl) {  //m
        doDatasetRemember();
        localStorage.setItem("keyLast", 0);
        return;
    }

    if (key == 76 && keyLast == keyCtrl) { //l
        doDatasetDelete();
        localStorage.setItem("keyLast", 0);
        return;
    }

    if (key == 83 && keyLast == keyCtrl) {  //s
        doDatasetSave();
        localStorage.setItem("keyLast", 0);
        return;
    }

    if (key == 78 && keyLast == keyCtrl) {  //n
        $(".dsNumber").val("00.000");
        doNew();
        localStorage.setItem("keyLast", 0);
        return;
    }

    if (key == 73 && keyLast == keyCtrl) {  //i
        let pnr = doDatasetRemember();
        let tab = checkTabPosition(pnr);
        //log("pos: " + tab + "         nr: " + nr);
        $(".navtab-" + tab).click();
        localStorage.setItem("keyLast", 0);
        return;
    }

    //log("key: " + key + "   keyLast: " + keyLast);
    nr = String($(".dsNumber").val()).replace(".", "");

    if (nr == 0) {
        //log(nr);
        nr = getNextDatasetNumber(0);
    }

    if (key == 37 && keyLast == keyCtrl) {
        let l = globalDatasetNumbers.contentValue.length;
        for (i = 0; i < l; i++) {
            //log("l: " + l + "   i: " + i + "   nr: " + globalDatasetNumbers.contentValue[i]["dataset_number"]);
            if (globalDatasetNumbers.contentValue[i]["dataset_number"] == nr) {
                if (i > 0) {
                    //log("111 i: " + i + "   nr: " + globalDatasetNumbers.contentValue[i]["dataset_number"]);
                    $(".dsNumber").val(prepareNumber(globalDatasetNumbers.contentValue[i - 1]["dataset_number"]));
                }
                else {
                    //log("222 i: " + i + "   nr: " + globalDatasetNumbers.contentValue[i]["dataset_number"]);
                    $(".dsNumber").val(prepareNumber(globalDatasetNumbers.contentValue[l - 1]["dataset_number"]));
                }
                setTimeout(function () {
                    doFetch();
                }, 200);
                break;
            }
        }
        //log("Control-right");
    }
    else {
        if (key == 39 && keyLast == keyCtrl) {
            let l = globalDatasetNumbers.contentValue.length;
            for (i = 0; i < l; i++) {
                if (globalDatasetNumbers.contentValue[i]["dataset_number"] == nr) {
                    if (i < (l - 1)) {
                        $(".dsNumber").val(prepareNumber(globalDatasetNumbers.contentValue[i + 1]["dataset_number"]));
                    }
                    else {
                        $(".dsNumber").val(prepareNumber(globalDatasetNumbers.contentValue[0]["dataset_number"]));
                    }
                    setTimeout(function () {
                        doFetch();
                    }, 200);
                    break;
                }
            }
        }
    }
}


export function getNextDatasetNumber(nr) {
    let i;
    let l = globalDatasetNumbers.contentValue.length;
    for (i = nr; i < l; i++) {
        let ds = globalDatasetNumbers.contentValue[i]["dataset_number"];
        //log(ds);
        if (ds != null) {
            $(".dsNumber").val(prepareNumber(ds));
            doFetch();
            return ds;
        }
    }
}


export function doFetch() {
    $(".doButtonFetch").trigger("blur");
    if ($(".doButtonFetch").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");

    if (isNaN(parseInt(nr))) {
        setStatusWarning(3, localStorage.getItem("statusDatasetNumberInput"));
        return;
    }

    if (nr > localStorage.getItem("maxDatasets")) {
        setStatusWarning(3, localStorage.getItem('dataset') + " " + nr + " " + localStorage.getItem('toLarge'));
        return;
    }

    let pnr = prepareNumber(nr);
    $(".dsNumber").val(pnr);

    if (checkForDataset(nr) == 1) {
        localStorage.setItem("changeDatasetNumber", nr);
        localStorage.setItem("datasetNumber", null);
    }
    else {
        setStatusWarning(3, localStorage.getItem("dataset") + " " + pnr + " " + localStorage.getItem("notFound"));
        return;
    }

    let intNr = parseInt(nr);
    requestDataset(intNr);
    setUserStatus(intNr);

    $(".doButtonDatasetDelete").removeClass('disabled');
    $(".doButtonDatasetSave").removeClass('disabled');
    $(".doButtonDatasetRemember").removeClass('disabled');
    requestComment(nr);
    showDataInForm();
    setDatasetUnchanged();
    localStorage.setItem("lastDatasetNumberUsed", nr);
    $(".statusText3").html(localStorage.getItem("enterData"));
    $(".doButtonDatasetSave").addClass('disabled');
}



function showDataInForm() {
    if (localStorage.getItem("changeDatasetNumber") == null)
        return;

    clearInput();
    let ds = localStorage.getItem("changeDatasetNumber");
    $(".dsNumber").val(prepareNumber(ds));

    //log(globalDataset);

    $('.name').val(globalDataset.contentValue[0]["name"]);
    $('.city').val(globalDataset.contentValue[0]["city"]);
    $('.schoolPublisher').val(globalDataset.contentValue[0]["school_publisher"]);
    $('.publishNo').val(globalDataset.contentValue[0]["number"]);

    const strTopic = globalDataset.contentValue[0]["topics_list"];
    const ar = strTopic.split(" ");
    //log(ar + "  " + ar.length);
    for (let i = 0; i < ar.length; i++) {
        $(".topic_" + ar[i]).css("backgroundColor", "#00dd00").css("border", "solid 1px #111111");
        localStorage.setItem("checked_topic_" + ar[i], "checked");
    }

    if (globalDataset.contentValue[0]["publisher_is"] === "school") {
        localStorage.setItem("publisherIsOutput", localStorage.getItem("school"));
        localStorage.setItem("publisherIsSave", "school");
        $('.btnradio1').prop("checked", true);
        $('.btnradio2').prop("checked", false);
        $(".schoolLabel").css("backgroundColor", "#007700");
        $(".schoolLabel").css("color", "#ffffff");
        $(".freeLabel").css("backgroundColor", "#ffffff");
        $(".freeLabel").css("color", "#000000");
    }
    else
        if (globalDataset.contentValue[0]["publisher_is"] === "free") {
            localStorage.setItem("publisherIsOutput", localStorage.getItem("free"));
            localStorage.setItem("publisherIsSave", "free");
            $('.btnradio1').prop("checked", false);
            $('.btnradio2').prop("checked", true);
            $(".freeLabel").css("backgroundColor", "#007700");
            $(".freeLabel").css("color", "#ffffff");
            $(".schoolLabel").css("backgroundColor", "#ffffff");
            $(".schoolLabel").css("color", "#000000");
        }
        else {
            $('.btnradio1').prop("checked", false);
            $('.btnradio2').prop("checked", false);
        }

    $('.dropdownState').html(globalDataset.contentValue[0]["state"]);
    $('.dropdownYear').html(globalDataset.contentValue[0]["year"]);

    var enc = decodeURIComponent(localStorage.getItem("datasetComment"));
    $('.comment').val(enc);

    localStorage.setItem("releasedWho", globalDataset.contentValue[0]["releasedWho"]);
    localStorage.setItem("releasedWhen", globalDataset.contentValue[0]["releasedWhen"]);
}


export function doDatasetSave() {
    $(".doButtonDatasetSave").trigger("blur");
    if ($(".doButtonDatasetSave").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");

    if (nr == localStorage.getItem("lastDatasetNumberUsed")) {
        if (!checkAdmin()) {
            if (globalDataset.contentValue[0]["released"] == 1) {
                $(".modal-body").text(localStorage.getItem("saveNotAllowed"));
                localStorage.setItem("messageOK", 0);
                $(".buttonMessageModal").click();
                $(".messageHeadline").text(localStorage.getItem("datasetIsReleased"));
                $(".doButtonDatasetSave").addClass('disabled')
                runForeverShowMessage(1);
                return;
            }
        }

        if ((localStorage.getItem("loginUser") != globalDataset.contentValue[0]["lastUser"]) && localStorage.getItem("userPolicy") != "admin") {
            $(".modal-body").text(localStorage.getItem("saveNotAllowed"));
            localStorage.setItem("messageOK", 0);
            $(".buttonMessageModal").click();
            $(".messageHeadline").text(localStorage.getItem("notYourDataset"));
            $(".doButtonDatasetSave").addClass('disabled');
            runForeverShowMessage(1);
            return;
        }
    }

    if (nr == 0) {
        setStatusWarning(3, localStorage.getItem("statusDatasetNumberInput"));
        return;
    }

    nr = parseInt(nr);

    if (isNaN(nr)) {
        setStatusWarning(3, localStorage.getItem("statusDatasetNumberInput"));
        $(".doButtonDatasetSave").trigger("blur");
        return;
    }

    $(".dsNumber").val(prepareNumber(nr));

    if (checkForDataset(nr) == 1) {
        localStorage.setItem("changeDatasetNumber", nr);
        $(".modal-body").text(localStorage.getItem("dataset") + " " + prepareNumber(nr) + " " + localStorage.getItem("exists"));
        localStorage.setItem("confirmSaveCancel", 0);
        localStorage.setItem("confirmSaveOverwrite", 0);
        $(".buttonOpenConfirmSaveModal").click();
        localStorage.setItem("datasetNumber", null);
        runForeverConfirmDoSave(1);
        //doFetch();                Change? Compare?
    }
    else {
        localStorage.setItem("changeDatasetNumber", null);
        localStorage.setItem("datasetNumber", nr);
        saveDataset();
        requestAllDatasetNumbers();
        //doFetch();
    }
}


export function doDatasetDelete() {
    $(".doButtonDatasetDelete").trigger("blur");
    if ($(".doButtonDatasetDelete").hasClass('disabled'))
        return;

    let nr = String($(".dsNumber").val()).replace(".", "");

    if (!checkAdmin()) {
        if (globalDataset.contentValue[0]["released"] == 1) {
            $(".modal-body").text(localStorage.getItem("deleteNotAllowed"));
            localStorage.setItem("messageOK", 0);
            $(".buttonMessageModal").click();
            $(".messageHeadline").text(localStorage.getItem("datasetIsReleased"));
            $(".doButtonDatasetSave").addClass('disabled')
            runForeverShowMessage(1);
            return;
        }

        if (localStorage.getItem("loginUser") != globalDataset.contentValue[0]["lastUser"]) {
            $(".modal-body").text(localStorage.getItem("deleteNotAllowed"));
            localStorage.setItem("messageOK", 0);
            $(".buttonMessageModal").click();
            $(".messageHeadline").text(localStorage.getItem("notYourDataset"));
            $(".doButtonDatasetSave").addClass('disabled');
            runForeverShowMessage(1);
            return;
        }
    }

    nr = parseInt(nr);
    let pnr = prepareNumber(nr);

    if (checkForDataset(nr) != 1) {
        setStatusWarning(3, localStorage.getItem("dataset") + " " + pnr + " " + localStorage.getItem("notExists"));
    }
    else {
        $(".modal-body-delete").text(localStorage.getItem("deletingOfDataset") + " " + pnr + " " + localStorage.getItem("confirm"));
        $(".buttonOpenConfirmDeleteModal").click();
        localStorage.setItem("confirmDeleteCancel", 0);
        localStorage.setItem("confirmDelete", 0);
        localStorage.setItem("datasetNumber", nr);
        runForeverConfirmDoDelete(1);
    }
}


export function deleteDataset() {
    let nr = localStorage.getItem("datasetNumber");
    let sqlQuery = "DELETE FROM prolabor.archive_data where dataset_number=" + nr;
    window.electronAPI.executeSimpleSQL(sqlQuery);
    setTimeout(() => {
        sqlQuery = "DELETE FROM prolabor.dataset_comments where dataset_number=" + nr;
        window.electronAPI.executeSimpleSQL(sqlQuery);
    }, 1000);
    clearInput();
    setToNew();
    setStatusInformation(3, localStorage.getItem("dataset") + " " + prepareNumber(nr) + " " + localStorage.getItem("confirm"));
    setStatus2("");
    requestAllDatasetNumbers();
    $(".doButtonDatasetSave").addClass('disabled');
    $(".doButtonDatasetRemember").addClass('disabled');
}


export function saveDataset() {
    let i;
    let n;
    let el2 = "", el = "";

    setStatusInformationPermanent(3, localStorage.getItem("oneMoment"));
    let cnr = localStorage.getItem("changeDatasetNumber");
    let nr = localStorage.getItem("datasetNumber")

    //log("--- cnr: " + cnr);
    //log("--- nr: " + nr);

    let sqlQuery, pnr;

    el = el + ",'" + $('.name').val() + "'";
    el = el + ",'" + $('.schoolPublisher').val() + "'";
    el = el + ",'" + $(".dropdownYear").text() + "'";
    el = el + ",'" + $('.publishNo').val() + "'";
    el = el + ",'" + $('.city').val() + "'";
    el = el + ",'" + $(".dropdownState").text() + "'";
    el = el + ",'" + localStorage.getItem("publisherIsSave") + "'";
    //log("out: " + localStorage.getItem("publisherIsOutput") + "     Save: " + localStorage.getItem("publisherIsSave"));
    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                el2 = el2 + " " + n + "_" + i;
            }
        }
    }

    var enc = encodeURIComponent($('.comment').val());

    if (nr > 0) {
        sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list,timestamp,lastUser,released) values(" + nr + el + ",'" + el2.trimStart() + "'," + getMilliseconds1970() + ",'" + localStorage.getItem("loginUser") + "',0)";
        //log("New: " + sqlQuery);

        window.electronAPI.executeSimpleSQL(sqlQuery);

        setTimeout(() => {
            sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + nr + ",'" + enc + "')";
            window.electronAPI.executeSimpleSQL(sqlQuery);
        }, 500);

        nr = localStorage.getItem("datasetNumber");
        pnr = prepareNumber(nr);
        localStorage.setItem("changeDatasetNumber", null);

        if (nr != 0) {
            setStatusInformation(3, localStorage.getItem("dataset") + " " + pnr + " " + localStorage.getItem("saved"));
            $(".dsNumber").val(prepareNumber(nr));
            localStorage.setItem("datasetNumber", nr);
            $(".doButtonDatasetDelete").removeClass('disabled');
            $(".doButtonDatasetSave").addClass('disabled');
            $(".doButtonDatasetRemember").removeClass('disabled');
        }
        else {
            setStatusWarningPermanent(3, localStorage.getItem("dataset") + " " + prepareNumber(pnr) + " " + localStorage.getItem("notSaved"));
        }
    }
    else {
        if (cnr > 0) {
            //log("Change: " + cnr);
            $(".doButtonDatasetSave").addClass('disabled');
            $(".doButtonFetch").addClass("disabled");
            sqlQuery = "DELETE FROM prolabor.archive_data where dataset_number=" + cnr;
            window.electronAPI.executeSimpleSQL(sqlQuery);

            setTimeout(() => {
                sqlQuery = "DELETE FROM prolabor.dataset_comments where dataset_number=" + cnr;
                window.electronAPI.executeSimpleSQL(sqlQuery);
            }, 500);

            setTimeout(() => {
                sqlQuery = "INSERT INTO prolabor.archive_data (dataset_number,name,school_publisher,year,number,city,state,publisher_is,topics_list,timestamp,lastUser,released) values(" + cnr + el + ",'" + el2.trimStart() + "'," + getMilliseconds1970() + ",'" + localStorage.getItem("loginUser") + "',0)";
                window.electronAPI.executeSimpleSQL(sqlQuery);
            }, 1000);

            setTimeout(() => {
                sqlQuery = "INSERT INTO prolabor.dataset_comments (dataset_number, comment) values(" + cnr + ",'" + enc + "')";
                window.electronAPI.executeSimpleSQL(sqlQuery);
                pnr = prepareNumber(cnr);
                setStatusInformation(3, localStorage.getItem("dataset") + " " + pnr + " " + localStorage.getItem("changed"));
                $(".doButtonDatasetDelete").removeClass('disabled');
                $(".doButtonDatasetRemember").removeClass('disabled');
                $(".doButtonFetch").removeClass("disabled");
            }, 1500);
        }
    }
    setDatasetUnchanged();
}


