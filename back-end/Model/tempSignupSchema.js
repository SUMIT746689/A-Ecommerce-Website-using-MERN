//external Libraries

const { default: mongoose } = require("mongoose");

//create a model schema for database
const temporarySignUpSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avater : {
        type : String
    },
    verify : {
        type: Array
    },
    createdAt: { 
        type: Date, 
        expires: 1000*60*30, 
        default: Date.now
    }
},
{timestamps: true});

//create a model 
const TemporarySignupUser = mongoose.model('temporary-sign-up-users',temporarySignUpSchema);

module.exports={
    TemporarySignupUser
}