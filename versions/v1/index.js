var express = require("express");
var bodyParser = require("body-parser");
var url = require("url");

//schemas methods
var userModel = require("../../DBrepo/userModel");



var v1 = express.Router()

v1.use(bodyParser.json());

///////////////////////do signup started/////////////////////////////////////////////////////////////////
v1.post("/signup", function (req, res, next) {

    console.log("body: ", req.body);
    var signupObject = req.body;

    var newUser = new userModel(signupObject);
    newUser.save(function (err, saved) {
        if (!err) {
            console.log("signup success: ", saved);
            res.json({ signup: true });
        } else {
            console.log("signup error: ", err);
            res.json({
                signup: false,
                message: "unknown database error check lohs for detail",
                error: err
            });
        }
    });
});
/////////////////signup request//////////////////////////////////////////////////////////////////////


module.exports = v1;