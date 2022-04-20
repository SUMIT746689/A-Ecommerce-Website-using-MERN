const express = require('express');
const jwt = require('jsonwebtoken');
const { Otp } = require('../Model/optModel');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const { SignupUser } = require('../Model/signupSchema');
const { TemporarySignupUser } = require('../Model/tempSignupSchema');

const routerVerifyOtp = express.Router();


routerVerifyOtp.get('/',async (req,res)=>{
    try{
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';     
        //varify access token 
        const data = jwt.verify(auth_cookie,process.env.jwt_secret);
        const Otpresponse = await Otp.find({mobile : data.mobile});
        
        res.status(200).json({mobile : data.mobile})
    }
    catch(err){
        res.status(404).json({
            errors : {
                common : {
                    msg : 'errors founds'
                }
            }
        })
    }
    
})

routerVerifyOtp.post('/',async(req,res,next)=>{
    
    try{
        const verifyUniqId = uniqid('verify-');
        console.log(verifyUniqId);
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
        const Otpresponse = await Otp.find({mobile : data.mobile});
        
        //compare if token is correct or not  
        const isbcrypt = await bcrypt.compare(req.body.value,Otpresponse[Otpresponse.length-1]?.otp || '')
        
        console.log(isbcrypt);

        if(isbcrypt){

            //create a varify jwt response
            const jwtResponse = jwt.sign({
                mobile :Otpresponse[Otpresponse.length-1].mobile
            },
                process.env.verify_jwt_secret
            );
            console.log(jwtResponse);

            //set a cookie name as varify
            res.cookie(verifyUniqId,jwtResponse,{maxAge: Number(new Date())+(1000*120),signed: true,httpOnly:true}) 
            
            //delete all otp after varify
            await Otp.deleteMany({mobile : data.mobile});

            //update users verify
            await SignupUser.findOneAndUpdate(
                {
                    mobile : data.mobile
                },
                {
                    $push : {
                        verify : [verifyUniqId]
                    }
                }
            );

            //
            
            const response = await TemporarySignupUser.findOne({mobile : data.mobile || ''},{_id :0,createdAt:0,updatedAt:0});
            console.log('response' + response)
            if(response !== null){
                console.log(response);
                const signupUser = await SignupUser({
                    name : response.name,
                    email : response.email,
                    mobile : response.mobile,
                    password : response.password,
                    verify : [verifyUniqId]
                },err=>{if(err){throw Error('errors founds')}});

                await signupUser.save();
            }
            
            await TemporarySignupUser.deleteOne({mobile : data.mobile})
            res.status(200).json({
                verify: true,
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
                        msg : 'required valid otp'
                    }
                }
            })
        }
        
    }
    catch(err){
        console.log(err.message);
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
    routerVerifyOtp
}

