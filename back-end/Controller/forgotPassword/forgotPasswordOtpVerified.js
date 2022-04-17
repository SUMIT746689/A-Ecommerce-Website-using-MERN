//external library
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');

//Internal library
const { Otp } = require('../../Model/optModel');

const forgotPasswordOtpVerified = async (req,res,next) =>{
   
    //check otp is correct or not in database
    const Otpresponse = await Otp.find({mobile : req.body.mobile});   

    //create a unique Id for verify token
    const verifyUniqId = uniqid('verify-');
    console.log(verifyUniqId);
    
    //compare if token is correct or not  
    const isbcrypt = await bcrypt.compare(req.body.value,Otpresponse[Otpresponse.length-1]?.otp || '')
    console.log(isbcrypt);

    res.json({jannat:'jannat'})

}

module.exports = {
    forgotPasswordOtpVerified
}