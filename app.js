const request = require('request');

var client_id = 'eea101d873434d49b7943928d46d0248'; // Your client id
var client_secret = 'ca1a878a6bda4bd1ac50513c14ae5580'; // Your secret

var scopes = 'user-read-private user-read-email';

// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

// request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {

//         // use the access token to access the Spotify Web API
//         var token = body.access_token;
//         var options = {
//         url: 'https://api.spotify.com/v1/users/qn5qq8divhd3nw86yjkuywqus',
//         headers: {
//             'Authorization': 'Bearer ' + token
//         },
//         json: true
//         };
//         request.get(options, function(error, response, body) {
//         console.log(body);
//         });
//     }
// });

var state = 'pandabear';

var authUrl = 'https://accounts.spotify.com/authorize' +
    '?client_id=' + client_id +
    '&response_type=' + 'code' +
    '&redirect_uri=' + 'https://example.com/callback' +
    '&state=' + state +
    '&scope=' + scopes;

request.get(authUrl, function(err, resp, body) {
    console.log(body);
});

request.get('https://api.spotify.com/v1/me/playlists', function(err, resp, body) {
    console.log(body);
});

