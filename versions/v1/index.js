var express = require("express");
var bodyParser = require("body-parser");
var url = require("url");

//schemas methods
var userModel = require("../../DBrepo/userModel");
var salesmanModel = require("../../DBrepo/salesmanModel");

//salesman routes
var salesmanRoutes = require("./salesmanRoutes");
//admin routes
var adminRoutes = require("./adminRoutes");


let v1 = express.Router()

v1.use(bodyParser.json());


v1.post("/signup", function (req, res, next) {

    objectFace = {
        email: string,
        password: string,
        firstName: string,      //this is a interface which is must required from front end
        lastName: string,
        companyName: string
    }
    let signupObject = req.body;
    console.log("data is : ", signupObject);
    doSignup(signupObject).then(function (success) {
        console.log("signup success: ", success);
        res.json({ signup: true });
    }, function (err) {
        console.log("signup error: ", err);
        res.json({ signup: false, message: err });
    });
});
/////////////////signup request//////////////////////////////////////////////////////////////////////

//turn app flow to salesman routes
v1.use(salesmanRoutes);

module.exports = v1;