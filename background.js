chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.clear();
    chrome.storage.sync.set({color: '#3aa757'});
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'infinite-mesa-97394.herokuapp.com'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'open.spotify.com'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});