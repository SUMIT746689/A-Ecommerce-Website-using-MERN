//external Libraries
const mongoose = require("mongoose");

//create a model schema for database
const githubAuthSchema = mongoose.Schema({
    github_id : {
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
const GithubAuth = mongoose.model('github-auth',githubAuthSchema);

module.exports={
    GithubAuth
}