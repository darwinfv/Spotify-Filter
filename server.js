// const express = require('express');
// const app = express();
// const port = process.env.port || 5000;

// app.listen(port, function() {
//     console.log("Listening on port " + port);
// });

// app.get('/', function(req, res) {
//     res.send("Hello from Spotify");
// });

// app.get('/access', function(req, res) {
//     res.send("Authorized with code");
// });



const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, function() {
    console.log("Listening on port " + port);
});

app.get('/', function(req, res) {
    res.send("Hello world");
});

app.get('/hook', function(req, res) {
    let body = req.query;
    console.log(body);
    if (body['hub.verify_token'] == 'pandabear') {
        res.send(body['hub.challenge']);
    }
    res.send("Challenge missing");
});

app.post('/hook', function(req, res) {
    console.log(req.body);
    console.log(req.body['entry'][0]['changes']);
    res.send("Received");
});

app.use(function(err, req, res, next) {
    console.log(err);
    console.log(req.body);
    res.status(400).send("Wrong route");
});

