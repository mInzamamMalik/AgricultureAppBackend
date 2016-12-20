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



///////////////////////do signup started/////////////////////////////////////////////////////////////////
exports.doSignup = function (signupObject) {

    console.log("ok");

    var deferred = q.defer();// deferred object created

    ref.createUser({

        email: signupObject.email,
        password: signupObject.password

    }, (error, userData) => {

        if (error) { //if error in firebase createUser this if will execute           

            //this switch is dealing with errors thrown from firebase createUser
            switch (error.code) {
                case "EMAIL_TAKEN":
                    console.log("The new user account cannot be created because the email is already in use.");
                    deferred.reject("The new user account cannot be created because the email is already in use.");
                    break;

                case "INVALID_EMAIL":
                    console.log("The specified email is not a valid email.");
                    deferred.reject("The specified email is not a valid email.");
                    break;//

                default:
                    console.log("Error creating user:", error);
                    deferred.reject(error);
            }// switch ended

        } else { // if no-error in firebase createUser this else will execute            

            console.log("Successfully created user account with uid:", userData.uid);

            //injecting uid to current userobject
            signupObject.firebaseUid = userData.uid;


            /////==========////
            signupOnMongodb(signupObject).then((data) => {
                deferred.resolve(data);
            },
                (error) => {
                    deferred.reject(error);
                });
            /////==========//// 



        }// else ended -- execute on no-error from firebase createUser

    })//createUser ended -- firebase    

    return deferred.promise; //promise returned  
}
///////////////////////do signup ended/////////////////////////////////////////////////////////////////



