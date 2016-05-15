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
