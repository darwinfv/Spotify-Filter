const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.port || 5000;

app.listen(port, function() {
    console.log("Listening on port " + port);
});

app.get('/', function(req, res) {
    res.send("success bits");
});

//axios.get('https://neat-robin-40.serverless.social').then(function (response) {
    
//})
