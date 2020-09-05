let button = document.getElementById('playlist');
let main = document.getElementById('main');
let list = document.getElementById('list');
let bg = chrome.extension.getBackgroundPage();
let code;

button.onclick = function (element) {

    chrome.storage.sync.get('code', function (data) {
        if (data.code) {
            code = data.code;
            main.hidden = true;
            list.hidden = false;
            getPlaylists();
        }
    });


};

let total;
let page;

function getPlaylists(offset = 0, limit = 10) {

    const url = 'https://api.spotify.com/v1/me/playlists' +
        '?offset=' + offset +
        '&limit=' + limit;

    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + code
        }
    }).then(response => response.json()).then(function (data) {

        bg.console.log(data);

        if (offset == 0) {
            total = data.total;
            page = 1;
        }

        let items = data.items;
        let covers = document.getElementsByClassName('cover');
        let imgs = document.getElementsByClassName('cover-img');
        let title = document.getElementsByClassName('cover-btn');
        
        for (let i = 0; i < items.length; i++) {
            imgs[i].src = items[i].images[0].url;
            title[i].innerHTML = items[i].name;
        }
        
    });



}