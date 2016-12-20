var mongoose = require("mongoose"); //mongodb driver
var q = require("q"); //to return deferred.promise from function


//////////////schema and model///////////////////////////////////////////
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    companyName: String, //this will contain company display name
    email: { type: String, unique: true, require: true },
    //password: String,
    createdOn: { type: Date, 'default': Date.now }, //pack 'default' in single quotes(this is Optional) to avoid compile error
    firebaseUid: String
});

exports.userModel = mongoose.model("users", userSchema);
//////////////schema and model//////////////////////////////////////////