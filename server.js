const express = require('express');
const app = express();
const port = process.env.port || 5000;

app.listen(port, function() {
    console.log("Listening on port " + port);
});

app.get('/', function(req, res) {
    res.send("Hello from Spotify");
});

app.get('/access', function(req, res) {
    res.send("Authorized with code");
});