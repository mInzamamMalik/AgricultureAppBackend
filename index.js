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



/////////////////////////////////////////////////////////////////////////////////////////////////
var dbURI = "mongodb://malikasinger:pakistan@ds133438.mlab.com:33438/agriculturedb";
// var dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function() {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function() {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function(err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function() {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////



