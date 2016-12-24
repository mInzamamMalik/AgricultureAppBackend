var mongoose = require("mongoose"); //mongodb driver

//////////////schema and model///////////////////////////////////////////
var zameenEventSchema = new mongoose.Schema({
    zameenId: { type: mongoose.Schema.Types.ObjectId, ref: "zameen" },
    name: String,
    cost: Number,
    description: String,
    createdOn: { type: Date, 'default': Date.now }, //pack 'default' in single quotes(this is Optional) to avoid compile error
});

module.exports = mongoose.model("zameenEvent", zameenEventSchema);;
//////////////schema and model//////////////////////////////////////////