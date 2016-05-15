'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3040;

var smhi = require('./smhi');

app.use(bodyParser.urlencoded({
    //how to you want to handle the extended character set
    extended: false

}));
app.use(methodOverride('_method'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://cenito.2016.angularattack.io/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.options('/smhi', function(req,res) {
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    res.writeHead(200, headers);
    res.end();
});

//creates a root route
app.get('/smhi', smhi);
app.get('/', (req, res) => {
    res.send('Server Running');

});

app.listen(port, () => {
    console.log(`Evernode server running on port: ${port}`);

});
