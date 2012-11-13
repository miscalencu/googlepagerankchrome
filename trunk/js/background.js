var cache = new Array();
var req = new XMLHttpRequest();
var tabId = 0;
var tabUrl = "";

var pageRank = -1;

function checkPageRank(tab) {
    tabId = tab.id;
    tabUrl = tab.url;
    getPageRank();
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.pageAction.hide(tab.id);
    if (changeInfo.status == "complete") {
        checkPageRank(tab);
    }
});

chrome.tabs.onActivated.addListener(function (info) {
    chrome.pageAction.hide(info.tabId);
    chrome.tabs.getSelected(null, function (tab) {
        checkPageRank(tab);
    });
});

function getPageRank() {
    if (tabUrl.indexOf("http") == 0) {
        var url = getBaseUrl(tabUrl);
        var from_cache = GetFromCache(url);
        // alert(from_cache);
        if (from_cache != "") {
            pageRank = from_cache;
            FillInfo();
        }
        else {
            var h = hash(url);
            var request_url = "http://toolbarqueries.google.com/tbr?client=navclient-auto&ch=8" + h + "&features=Rank&q=info:" + url;
            req.open("GET", request_url);
            req.onreadystatechange = gotPageRank;
            req.send(null);
        }
    }
}

function gotPageRank() {
    if (req.readyState != 4)
        return;

    if (req.status != 200)
        return;

    if (req.responseText != undefined && req.responseText.length < 15) {
        try { // sometimes Google return a blask result (?!?)
            pageRank = req.responseText.split(":")[2].split("\n")[0];
        }
        catch (ex) {
            //alert(ex.message + " = " + req.responseText + " = " + tabUrl);
            pageRank = "-1";
        }
    } else {
        pageRank = "-1";
    }

    if (pageRank == "")
        pageRank = "-1";

    SetToCache(tabUrl, pageRank);
    FillInfo();
}

function FillInfo() {
    if (pageRank == -1) {
        chrome.pageAction.hide(tabId);
        return;
    }    

    chrome.pageAction.show(tabId);
    chrome.pageAction.setIcon({ path: "images/numbers/icon" + pageRank + ".png", tabId: tabId });
    chrome.pageAction.setTitle({ title: "Google Page Rank is " + pageRank, tabId: tabId });
}


function GetFromCache(url) {
    for (var i = 0; i < cache.length; i++) {
        if (cache[i] != null && cache[i].url == url) {
            return cache[i].pr;
            break;
        }
    }
    return "";
}

function SetToCache(url, page_rank) {
    var element = new Object();
    element.url = getBaseUrl(url);
    element.pr = page_rank;
    cache.unshift(element);
}

function getBaseUrl(url) {
    url = url.split("//")[1];
    url = url.split("#")[0];
    url = url.split("?")[0];

    if (url.charAt(url.length - 1) == "/") {
        url = url.slice(0, -1);
    }

    return url;
}
