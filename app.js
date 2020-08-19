const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Listening on port " + port);
});

app.get('/', function(req, res) {
    res.send("Hello world");
});

app.get('/hook', function(req, res) {
    console.log(req.params);
});

app.use(function(err, req, res, next) {
    console.log(err);
    console.log(req.body);
    res.status(400).send("Wrong route");
});

