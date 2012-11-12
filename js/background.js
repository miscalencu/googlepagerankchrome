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

var bb;

function getPageRank() {
    if (tabUrl.indexOf("http") == 0) {
        var h = hash(tabUrl.split("#")[0].split("//")[1]);
        var url = "http://toolbarqueries.google.com/tbr?client=navclient-auto&ch=8" + h + "&features=Rank&q=info:" + tabUrl.split("//")[1];
        req.open("GET", url);
        req.onreadystatechange = gotPageRank;
        req.send(null);        
    }
}

function gotPageRank() {
    if (req.readyState != 4)
        return;

    if (req.responseText.length < 15) {
        pageRank = req.responseText.split(":")[2].split("\n")[0];
    } else {
        pageRank = "-1";
    }

    if (pageRank == "")
        pageRank = "-1";

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