const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.listen(port, function() {
    console.log("Listening on port " + port);
});

app.get('/', function(req, res) {
    res.send("Hello from Spotify");
});

app.get('/access', function(req, res) {
    let body = req.query;
    console.log(body)
    res.send(JSON.stringify(body));
});