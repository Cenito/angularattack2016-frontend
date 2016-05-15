'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

var smhi = require('./smhi');

app.use(bodyParser.urlencoded({
    //how to you want to handle the extended character set
    extended: false

}));
app.use(methodOverride('_method'));

//creates a root route
app.get('/smhi', smhi);
app.get('/', (req, res) => {
    res.send('Server Running');

});

app.listen(port, () => {
    console.log(`Evernode server running on port: ${port}`);

});
