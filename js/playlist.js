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
    // TODO
}

next.onclick = function (element) {
    // TODO
}

function makePlaylist (index) {
    bg.console.log("succ");
    let items = document.getElementsByClassName('cover-btn');
    let name = items[index].innerHTML;
    let pid = items[index].value;
    
    name += " (CLEAN)";

    const createUrl = 'https://api.spotify.com/v1/users/' + id + '/playlists';
    let createBody = {
        'name': name,
        'public': 'private'
    };

    fetch("https://api.spotify.com/v1/users/qn5qq8divhd3nw86yjkuywqus/playlists", {
        body: "{\"name\\\":\\\"New Playlist\\\",\\\"description\\\":\\\"New playlist description\\\",\\\"public\\\":false}",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + code,
            "Content-Type": "application/json"
        },
        method: "POST"
    }).then(response => response.json()).then(data => bg.console.log(data));

    postData(createUrl, createBody).then(data => bg.console.log(data));
}

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + code,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        json: true,
        dataType: 'json',
    });
    return response.json();
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
            if (total > 10) {
                next.disabled = false;
            } else {
                next.disabled = true;
            }
        }

        let items = data.items;
        let imgs = document.getElementsByClassName('cover-img');
        let btns = document.getElementsByClassName('cover-btn');
        
        for (let i = 0; i < items.length; i++) {
            imgs[i].src = items[i].images[0].url;
            btns[i].innerHTML = items[i].name;
            btns[i].value = items[i].id;
            btns[i].addEventListener("click", function () {
                makePlaylist(i);
            });
        }
        
    });

}