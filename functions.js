
var stateKey = 'spotify_auth_state';

var app = express();


app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
    }));
});