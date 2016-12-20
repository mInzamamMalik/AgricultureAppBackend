var mongoose = require("mongoose"); //mongodb driver
var q = require("q"); //to return deferred.promise from function


//////////////schema and model///////////////////////////////////////////
var accountSchema = new mongoose.Schema({
    head: String,
    amount: Number,
    zameen: { type: mongoose.Schema.Types.ObjectId, ref: "zameen" },
    createdOn: { type: Date, 'default': Date.now }, //pack 'default' in single quotes(this is Optional) to avoid compile error
});

module.exports = mongoose.model("account", accountSchema);;
//////////////schema and model//////////////////////////////////////////