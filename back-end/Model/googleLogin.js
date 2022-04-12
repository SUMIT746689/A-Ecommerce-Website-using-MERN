//external Libraries
const mongoose = require("mongoose");

//create a model schema for database
const googleAuthSchema = mongoose.Schema({
    google_id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
},
{timestamps: true});

//create a model 
const GoogleAuth = mongoose.model('google-auth',googleAuthSchema);

module.exports={
    GoogleAuth
}