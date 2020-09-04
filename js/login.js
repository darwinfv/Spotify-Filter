const client_id = 'eea101d873434d49b7943928d46d0248';
const client_secret = 'ca1a878a6bda4bd1ac50513c14ae5580';
const redirect_uri = 'https://infinite-mesa-97394.herokuapp.com/access';
const scopes = 'user-read-private user-read-email';

let state = generateRandomString(32);
let bg = chrome.extension.getBackgroundPage();
let token;

let authUrl = 'https://accounts.spotify.com/authorize' +
    '?client_id=' + client_id +
    '&response_type=' + 'code' +
    '&redirect_uri=' + redirect_uri +
    '&state=' + state +
    '&scope=' + scopes;

let login = document.getElementById('login');

chrome.storage.sync.get('code', function(data) {
    if (data.code) {
        player();
    }
});

login.onclick = function(element) {
    chrome.tabs.update({
        url: authUrl
    });

    chrome.webNavigation.onCompleted.addListener(function() {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            let tab = tabs[0].url;
            token = tab.substring(tab.indexOf('?') + 6, tab.indexOf('&'));
            let check = tab.substring(tab.indexOf('&') + 7);
            if (check !== state) {
                bg.console.log('State is incorrect');
                bg.console.log(check, '|', state);
            }
            chrome.storage.sync.set({code: token});
            chrome.storage.sync.set({status: state});
            player();
        });
    });
}

function player() {
    login.hidden = true;
    bg.console.log(token);
}

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};