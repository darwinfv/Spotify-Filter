let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

var client_id = 'eea101d873434d49b7943928d46d0248';
var client_secret = 'ca1a878a6bda4bd1ac50513c14ae5580';
var redirect_uri = 'https://infinite-mesa-97394.herokuapp.com/access';

var scopes = 'user-read-private user-read-email';
var state = generateRandomString(32);

authUrl = 'https://accounts.spotify.com/authorize' +
    '?client_id=' + client_id +
    '&response_type=' + 'code' +
    '&redirect_uri=' + redirect_uri +
    '&state=' + state +
    '&scope=' + scopes;

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });

    // chrome.tabs.update({url: authUrl});
};

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


// chrome.webNavigation.onCompleted.addListener(function callback)