const mongoose = require('mongoose');



const otpschema  = new mongoose.Schema({
    mobile : {
        type : String,
        required : true,
    },
    otp :{
        type : String,
        required : true,
    },
    createdAt: { 
        type: Date, 
        expires: 1000*60*60, 
        default: Date.now
    }
},{timestamps:true})

const Otp = mongoose.model('otp',otpschema);

module.exports = { 
    Otp
}