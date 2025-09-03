import { globalDatasetNumbers, globalDataset, globalStates, globalTopHeadlines, globalTopicItems, globalTopicHeadlines, globalInfoLabels } from "./Globals.js";
import { log } from "./RendererLog.js";

export function requestInitValues() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestInitValues',
        success: function (text) {
            var i;
            var s = "";
            for (const [key, value] of Object.entries(text)) {
                //log(`${key}: ${value}`);
                localStorage.setItem(`${key}`, `${value}`);
            }
        },
        error: function (error) {
            log(`Error ${error}`);
        }
    });
}


export function requestOutputText() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestOutputText',
        async: false,
        success: function (text) {
            var i;
            var s = "";
            for (i = 0; i < text.length; i++) {
                localStorage.setItem(text[i]["name"], text[i]["value"]);
            }
        },
        error: function (error) {
            log(`Error ${error}`);
        }
    });
}


export function requestStates() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestStates',
        async: false,
        success: function (states) {
            var i;
            var s = "";
            for (i = 0; i < states.length; i++) {
                s = s + "<li><a class='dropdown-item' href='#'>" + states[i]["name"] + "</a></li>\n";
            }
            globalStates.content = s;
        },
        error: function (error) {
            log(`Error ${error}`);
        }
    });
    $(".states").html(globalStates.content);
}


export function requestTopicHeadlines() {
    //log("Entry requestTopicHeadlines");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestTopicHeadlines',
        async: false,
        success: function (data) {
            globalTopicHeadlines.content = data;
            //log(globalTopicHeadlines.content);
        },
        error: function (error) {
            log(`Error ${error}`);
        }
    });
}


export function requestTopHeadlines() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestDatasetTopHeadlines',
        async: false,
        success: function (data) {
            globalTopHeadlines.content = data;
        },
        error: function (error) {
            log(error);
        }
    });

}


export function requestTopicItems() {
    let i;
    let ln = 11;
    //log("Entry requestTopicItems (Topic Headlines): " + ln);

    for (i = 0; i < ln; i++) {
        //log("url: http://localhost:" + localStorage.getItem("httpPort") + '/' + i);
        $.ajax({
            type: 'GET',
            url: 'http://localhost:' + localStorage.getItem("httpPort") + '/' + i,
            async: false,
            success: function (data) {
                globalTopicItems[i].contentValue = data;
                //log(globalTopicItems[i].contentValue);
            }, error: function (error) {
                log(error);
            }
        });
    }
}


export function requestInfoLabels() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestInfoLabels',
        async: false,
        success: function (hl) {
            globalInfoLabels.content = hl;
        },
        error: function (error) {
            log(error);
        }
    });

}


export function requestImages() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestImages',
        async: false,
        success: function (data) {
            let i;
            for (i = 0; i < data.length; i++) {
                localStorage.setItem("image_" + data[i]["image_nr"], data[i]["image_path"]);
            }
        }
    });
}


export function requestConstValues() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestConstants',
        async: false,
        success: function (data) {
            let i;
            for (i = 0; i < data.length; i++) {
                localStorage.setItem(data[i]["const_name"], data[i]["const_value"]);
            }
        }
    });
}


export function requestDataset(nr) {
    let ret;
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestDataset?datasetNumber=' + nr,
        async: false,
        success: function (data) {
            if (data.length > 0) {
                globalDataset.content = data;
                return true;
            }
            else {
                globalDataset.content = null;
                return false;
            }
        }
    });
}


export function requestComment(nr) {
    let ret;
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestComment?datasetNumber=' + nr,
        async: false,
        success: function (data) {
            if (data.length > 0) {
                localStorage.setItem("datasetComment", data[0]["comment"]);
                ret = true;
            }
            else
                ret = false;
        }
    });
    return ret;
}


export function requestCheckDatasetNumber(nr) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestCheckDatasetNumber?datasetNumber=' + nr,
        async: false,
        success: function (data) {
            //log("data: " + data);
            localStorage.setItem(nr, data);
        }
    });
}

export function requestAllDatasetNumbers() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestAllDatasetNumbers',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                globalDatasetNumbers.content = data;
                //log(data);
                return true;
            }
            else {
                globalDatasetNumbers.content = null;
                return false;
            }
        }
    });
}


export function requestSHA(user) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestSHA?user=' + user, async: false,
        success: function (data) {
            localStorage.setItem(user + "SHA", data[0]["sha2val"]);
            localStorage.setItem("userPolicy", data[0]["userPolicy"]);
        }
    });
}



export function requestLastUser(datasetNumber) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:' + localStorage.getItem("httpPort") + '/requestLastUser?datasetNumber=' + datasetNumber, async: false,
        success: function (data) {
            //log("datasetUser_" + datasetNumber, data[0]["lastUser"]);
            localStorage.setItem("datasetUser_" + datasetNumber, data[0]["lastUser"]);
        }
    });
}


