chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'github.com'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.webNavigation.onCompleted.addListener(function() {
    console.log("loaded");
})

// var host = "http://darwinfv.github.io";
// chrome.webNavigation.onBeforeRequest.addListener(
//     function(details) {
//          return {redirectUrl: host + details.url.match(/^https?:\/\/[^\/]+([\S\s]*)/)[1]};
//     },
//     {
//         urls: [
//             "*://github.com/*",
//             "*://www.github.com/*"
//         ],
//         types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
//     },
//     ["blocking"]
// );