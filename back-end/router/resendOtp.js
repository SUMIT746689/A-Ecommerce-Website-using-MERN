const express = require('express');
const jwt = require('jsonwebtoken');
const { Otp } = require('../Model/optModel');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { SignupUser } = require('../Model/signupSchema');


const routerResendOtp = express.Router();


routerResendOtp.post('/',async(req,res,next)=>{
    
    try{
        //check is google or other social site have or not
        if(req.user){
            return res.status(200).json({
                varify: true,
                success : true,
                message : {
                    common : {
                        msg : 'successfully verified'
                    }
                }
            })
        }
        console.log(req.signedCookies);
        //get access token name
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
        
        //varify access token 
        const data = jwt.verify(auth_cookie,process.env.jwt_secret);
        const signupResponse = await SignupUser.findOne({mobile : data.mobile});
        console.log(signupResponse.length);
        if(signupResponse>0){
            //otp salt genarate
            const otpSalt = bcrypt.genSaltSync(Number(process.env.salt));
            //otp generate
            const otpGenarate = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            console.log(otpGenarate)
            //otp hashing to save database
            const otpPass = await bcrypt.hash(otpGenarate,otpSalt);
            console.log(otpPass)
            //send otp hash password to database
            const otp = await Otp({
                mobile : signupResponse.mobile,
                otp : otpPass
            })
            await otp.save();

            res.status(200).json({
                message : {
                    common : {
                        msg : 'successfully verified'
                    }
                }
            })
        }
        else{
            res.status(404).json({
                errors : {
                    common : {
                        msg : 'login first'
                    }
                }
            })
        }
        
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
    routerResendOtp
}

