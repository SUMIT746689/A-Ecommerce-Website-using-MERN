//external Libraries
const mongoose = require("mongoose");

//create a model schema for database
const fbAuthSchema = mongoose.Schema({
    fb_id : {
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
const FacebookAuth = mongoose.model('facebook-auth',fbAuthSchema);

module.exports={
    FacebookAuth
}