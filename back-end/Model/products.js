//external Libraries
const mongoose = require("mongoose");

//create a model schema for database
const products = mongoose.Schema({
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
const Products = mongoose.model('products',products);

module.exports={
    Products
}