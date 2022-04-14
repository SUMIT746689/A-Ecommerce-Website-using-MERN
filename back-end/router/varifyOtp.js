const express = require('express');
const jwt = require('jsonwebtoken');
const { Otp } = require('../Model/optModel');
const bcrypt = require('bcrypt');

const routerVarifyOtp = express.Router();

routerVarifyOtp.post('/',async(req,res,next)=>{
    
    try{
        
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
        const data = jwt.verify(auth_cookie,process.env.jwt_secret);
        const Otpresponse = await Otp.find({mobile : data.mobile});
        console.log(Otpresponse[0]);
        const isbcrypt = bcrypt.compareSync(Otpresponse[0].otp,req.body.value)
        console.log(isbcrypt);
        //console.log(Otpresponse);
        res.json({dd : "dd"});
        
    }
    catch(err){
        res.status(404).json({
            errors : {
                common : {
                    msg : err.message
                }
            }
        })
    }
    
});

module.exports ={
    routerVarifyOtp
}

