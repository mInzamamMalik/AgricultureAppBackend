var express = require("express");
var bodyParser = require("body-parser");
var url = require("url");

//schemas methods
var userModel = require("../../DBrepo/userModel");
var zameenModel = require("../../DBrepo/zameenModel");

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
            res.json({ success: true });
        } else {
            if (err.code == 11000) {

                console.log("signup error: email already exist ");
                res.json({
                    success: false,
                    message: "email already exist",
                    error: err
                });

            } else {
                console.log("signup error: ", err);
                res.json({
                    success: false,
                    message: "database operation fail due to unknown reason, check logs for detail",
                    error: err
                });
            }
        }
    });
});
/////////////////signup request//////////////////////////////////////////////////////////////////////

///////////////////////do login started/////////////////////////////////////////////////////////////////
v1.post("/login", function (req, res, next) {

    console.log("body: ", req.body);
    var loginObject = req.body;

    userModel.findOne(
        {
            email: loginObject.email,
            password: loginObject.password
        })
        .select('-password')
        .exec(function (err, user) {
            if (!err) {
                if (!user) {
                    console.log("login error: no user found");
                    res.json({
                        success: false,
                        message: "invalid email or password"
                    });
                } else {
                    console.log("login success: ", user);
                    res.json({
                        success: true,
                        data: user
                    });
                }
            } else {
                console.log("signup error: ", err);
                res.json({
                    success: false,
                    message: "database operation fail due to unknown reason, check logs for detail",
                    error: err
                });
            }
        })
});
/////////////////login request end//////////////////////////////////////////////////////////////////////

///////////////////////addZameen request started/////////////////////////////////////////////////////////////////
v1.post("/addZameen", function (req, res, next) {

    console.log("body: ", req.body);
    var zameenObject = req.body;

    var newZameen = new zameenModel(zameenObject);
    newZameen.save(function (err, saved) {
        if (!err) {
            console.log("zameen added: ", saved);
            res.json({
                success: true,
                data: saved
            });
        } else {
            console.log("error: ", err);
            res.json({
                success: false,
                message: "database operation fail due to unknown reason, check logs for detail",
                error: err
            });
        }
    });
});
/////////////////addZameen request ended/////////////////////////////////////////////////////////////////////

///////////////////////addZameen request started/////////////////////////////////////////////////////////////////
v1.post("/addZameen", function (req, res, next) {

    console.log("body: ", req.body);
    var zameenObject = req.body;

    var newZameen = new zameenModel(zameenObject);
    newZameen.save(function (err, saved) {
        if (!err) {
            console.log("zameen added: ", saved);
            res.json({
                success: true,
                data: saved
            });
        } else {
            console.log("error: ", err);
            res.json({
                success: false,
                message: "database operation fail due to unknown reason, check logs for detail",
                error: err
            });
        }
    });
});
/////////////////addZameen request ended/////////////////////////////////////////////////////////////////////


///////////////////////allZameen request started/////////////////////////////////////////////////////////////////
v1.post("/allZameen", function (req, res, next) {

    console.log("body: ", req.body);
    var landLord = req.body.landLord;

    zameenModel.find({ landLord: landLord })
        .exec(function (err, zameen) {
            if (!err) {
                console.log("all zameen: ", zameen);
                res.json({
                    success: true,
                    data: zameen
                });
            } else {
                console.log("error: ", err);
                res.json({
                    success: false,
                    message: "database operation fail due to unknown reason, check logs for detail",
                    error: err
                });
            }
        });
});
/////////////////allZameen request ended/////////////////////////////////////////////////////////////////////

///////////////////////addBalance request started/////////////////////////////////////////////////////////////////
v1.post("/addBalance", function (req, res, next) {

    console.log("body: ", req.body);
    var balance = req.body.balance;
    var zameenId = req.body.zameenId;

    if (isNaN(balance) || +balance < 0) {
        console.log("balance should must be possitive number");
        res.json({
            success: false,
            message: "balance should must be possitive number"
        });
        return;
    }

    zameenModel.findOne({ _id: zameenId })
        .exec(function (err, zameen) {
            if (!err) {
                if (!zameen) {
                    console.log("login error: no zameen found");
                    res.json({
                        success: false,
                        message: "no zameen found for given id"
                    });
                } else {
                    console.log("zameen found: ", zameen);

                    zameen.accountBalance += balance;
                    zameen.save(function (err, data) {
                        if (!err) {
                            res.json({
                                success: true,
                                message: "balance added",
                                data: zameen
                            });
                        } else {
                            console.log("error: ", err);
                            res.json({
                                success: false,
                                message: "a database operation fail due to unknown reason, check logs for detail",
                                error: err
                            });
                        }
                    });
                }
            } else {
                console.log("error: ", err);
                res.json({
                    success: false,
                    message: "a database operation fail due to unknown reason, check logs for detail",
                    error: err
                });
            }
        })
});
/////////////////addBalance request ended/////////////////////////////////////////////////////////////////////




module.exports = v1;