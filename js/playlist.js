let button = document.getElementById('playlist');
let bg = chrome.extension.getBackgroundPage();

button.onclick = function (element) {

    chrome.storage.sync.get('code', function (data) {
        if (data.code) {
            player();
        }
    });


};