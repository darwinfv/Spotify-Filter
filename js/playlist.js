let main = document.getElementById('main');
let list = document.getElementById('list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let bg = chrome.extension.getBackgroundPage();
let code;
let id;

document.getElementById('back').onclick = function (element) {
    list.hidden = true;
    main.hidden = false;
}

document.getElementById('playlist').onclick = function (element) {
    chrome.storage.sync.get('id', function (data) {
        if (data.id) {
            id = data.id;
        }
    });

    chrome.storage.sync.get('code', function (data) {
        if (data.code) {
            code = data.code;
            main.hidden = true;
            list.hidden = false;
            getPlaylists();
        }
    });
};

prev.onclick = function (element) {
    page -= 2;
    getPlaylists(page++ * 10);
}

next.onclick = function (element) {
    getPlaylists(page++ * 10);
}

function makePlaylist (index) {
    let items = document.getElementsByClassName('cover-btn');
    let name = items[index].innerHTML;
    let pid = items[index].value;
    
    name += " (CLEAN)";

    const createUrl = 'https://api.spotify.com/v1/users/' + id + '/playlists';
    let createBody = {
        'name': name
    };

    let playUrl = 'https://api.spotify.com/v1/playlists/' + pid + '/tracks?' +
        'fields=next,items(track(uri)),items(track(explicit))';
    
    let xhr = postData(createUrl, createBody);
    xhr.onload = function() {
        let data = JSON.parse(this.responseText);
        let nid = data.id + '/tracks';
        setof100(playUrl, nid);
    }
}

const addUrl = 'https://api.spotify.com/v1/playlists/';

function addSongs(items, nid) {

    let uris = [];

    for (let i = 0 ; i < items.length; i++) {
        if (!items[i].track.explicit) {
            uris.push(items[i].track.uri)
        }
    }

    let xhr = postData(addUrl + nid, {'uris': uris});

}

function setof100(playUrl, nid) {
    fetch(playUrl, {
        headers: {
            'Authorization': 'Bearer ' + code,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(function (data2) {
        addSongs(data2.items, nid);
        if (data2.next != null) {
            setof100(data2.next, nid);
        }
    });
}

function postData(url, data) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + code);
    xhr.send(JSON.stringify(data));
    return xhr;

}

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

        if (offset == 0) {
            total = data.total;
            page = 1;
            prev.disabled = true;
        } else {
            prev.disabled = false;
        }
        next.disabled = total > (offset + 1) * 10 ? false : true;

        let items = data.items;
        let imgs = document.getElementsByClassName('cover-img');
        let btns = document.getElementsByClassName('cover-btn');
        
        for (let i = 0; i < items.length; i++) {
            imgs[i].src = items[i].images.length > 0 ? items[i].images[0].url : imgs[i].src;
            btns[i].innerHTML = items[i].name;
            btns[i].value = items[i].id;
            btns[i].addEventListener("click", function () {
                makePlaylist(i);
            });
            imgs[i].hidden = false;
            btns[i].hidden = false;
        }
        
        for (let i = items.length; i < 10; i++) {
            imgs[i].hidden = true;
            btns[i].hidden = true;
        }
        
    }).catch(function (error) {
        // main.hidden = true;
        location.reload();
    });

}