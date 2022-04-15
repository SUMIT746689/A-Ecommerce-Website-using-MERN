const express = require('express');
const jwt = require('jsonwebtoken');
const { Otp } = require('../Model/optModel');
const bcrypt = require('bcrypt');
const { signedCookie } = require('cookie-parser');

const routerVarifyOtp = express.Router();


routerVarifyOtp.post('/',async(req,res,next)=>{
    
    try{
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
        console.log(req.signedCookies)
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
        
        const data = jwt.verify(auth_cookie,process.env.jwt_secret);
        const Otpresponse = await Otp.find({mobile : data.mobile});
        
        const isbcrypt = await bcrypt.compare(req.body.value,Otpresponse[Otpresponse.length-1]?.otp || '')
        
        console.log(isbcrypt);
        if(isbcrypt){

            //create a varify jwt response
            const jwtResponse = jwt.sign({
                mobile :Otpresponse[Otpresponse.length-1].mobile
            },
                process.env.verify_jwt_secret);
                console.log(jwtResponse);

            //set a cookie name as varify
            res.cookie(process.env.varify_auth_cookie_token_name,jwtResponse,{maxAge: Number(new Date())+(1000*120),signed: true,httpOnly:true}) 
            
            await Otp.deleteMany({mobile : data.mobile});
            
            res.status(200).json({
                varify: true,
                success : true,
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

