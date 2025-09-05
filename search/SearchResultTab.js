function updateSearchResultTabContent(tab) {
    let i;
    let n;
    let el = "";

    $('.tab_' + tab).html(tab);

    //console.log("Entry updateDatasetTabContent: " + tab);
    let datasetItems = [];
    let mainHeadline = [];

    for (i = 0; i < localStorage.getItem("datasetTopItemCount"); i++) {
        mainHeadline[i] = localStorage.getItem("mainHeadline_" + i);
        datasetItems[i] = localStorage.getItem("datasetItem_" + i);
        if (datasetItems[i] != null)
            el = el + "<label class='mainHeadline datasetItem_" + i + "'>" + mainHeadline[i] + ": </label> \
                       <label class='datasetListItems text-wrap datasetItem_" + i + "'>" + datasetItems[i] + "</label><br>\n";
    }

    $('.datasetWindowHeadline_' + tab).html(localStorage.getItem("datasetWindowHeadline"));
    $('.datasetWindowSubheadline_' + tab).html(localStorage.getItem("datasetWindowSubheadline"));
    $('.topDatasetItems_' + tab).html(el);

    el = "";
    let checkFound = false;

    for (n = 0; n < localStorage.getItem("topicHeadlineCnt"); n++) {
        for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
            if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                el = el + "<b>" + localStorage.getItem("topicHeadline_" + n) + "</b><br>";
                for (i = 0; i < localStorage.getItem("amountTopicsHeadline_" + n); i++) {
                    if (localStorage.getItem("checked_topic_" + n + "_" + i) == "checked") {
                        el = el + "&nbsp; &nbsp; " + localStorage.getItem("topic_" + n + "_" + i) + " ";
                    }
                }
                el = el + "<br>";
                break;
            }
        }

        $(".topicsHeader").text(localStorage.getItem("topics"));
        $('.topicDatasetItems_' + tab).html(el);
    }
}


function removeTabRememberFiles(tab) {
    $(".navtab-" + tab).removeClass("active");
    $(".tab-" + tab).removeClass("active");
    $(".navtab-" + tab).remove();
    $(".navtab-0").addClass("active");
    $(".navtab-0").click();
    $(".tab-0").show();
    let selectCnt = localStorage.getItem("selectCnt");
    selectCnt--;
    //console.log("Entry RendererDatasetTab.removeTab...: " + tab);
    localStorage.setItem("selectCnt", selectCnt);
    $(".doButtonDatasetRemember").removeClass('disabled');
}


function showHomeContent(nr) {
    $(".navtab-0").addClass("active");
    $(".tab-0").show();
    $(".navtab-0").click();
    $(".dsNumber").val($(".navtab-" + nr).text());
    $(".doButtonFetch").click();
}




