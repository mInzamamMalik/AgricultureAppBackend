var express = require('express');
var mongoose = require("mongoose");
var path = require("path");
var cors = require('cors');
var app = express();

var v1 = require("./versions/v1");


app.set('port', (process.env.PORT || 5000));

app.use( cors() );

app.use("/v1", v1 );

// views an html page
var indexPath = path.resolve(__dirname,"public");
app.use(express.static(indexPath));


app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});


