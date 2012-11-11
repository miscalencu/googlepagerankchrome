var lastTabId = 0;
var lastUrl = "";

var dd;

function checkPageRank(tab) {
    dd = tab;
    lastTabId = tab.id;
    lastUrl = tab.url;

    chrome.pageAction.show(tab.id);
    chrome.pageAction.setIcon({ path: "images/icon.png",
        tabId: tab.id
    });

    chrome.pageAction.setTitle({ title: "new title here - " + tab.id + " - " + tab.url, tabId: tab.id });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "loading") {
        checkPageRank(tab);
    }
});

chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
    chrome.tabs.getSelected(null, function (tab) {
        checkPageRank(tab);
    });
});