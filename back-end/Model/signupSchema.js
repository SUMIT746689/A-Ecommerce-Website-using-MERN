//external Libraries

const { default: mongoose } = require("mongoose");

//create a model schema for database
const signUpSchema = mongoose.Schema({
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
    }
});

//create a model 
const Signup = mongoose.model('Sign-up-users',signUpSchema);

module.exports={
    Signup
}