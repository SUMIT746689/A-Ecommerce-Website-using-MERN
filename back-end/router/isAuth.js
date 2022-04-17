//external library
const express = require('express');
const jwt = require('jsonwebtoken');
const { SignupUser } = require('../Model/signupSchema');

//internal library


const isAuthRouter = express.Router();

isAuthRouter.get('/',async (req,res)=>{
    try {
        console.log(req.session.varify = true);
        res.coo
        if(req.user){
            
            res.status(200).json({
                user : {
                    name : req.user.displayName,
                    id: req.user.id,
                    avatar : req.user.photos[0].value
                },
                message : {
                    common : {
                        msg : 'get user successfully'
                    }
                }
            });
        }
        else{
            const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
            const data = jwt.verify(auth_cookie,process.env.jwt_secret);
            
            console.log(data,req.signedCookies);

            const databaseResponse = await SignupUser.findOne({email : data.email},{password:0});
            let verifyId = 's';
            console.log(databaseResponse);

            if(databaseResponse.verify?.length>0 && Object.keys(req.signedCookies)?.length>0){
                //check if verify token id founds in database
                Object.keys(req.signedCookies).forEach(async(value)=>{

                    await databaseResponse.verify.forEach((verify_Id)=>{
                        if(value.includes(verify_Id)){
                            verifyId = value;
                            console.log({verifyId});
                        }
                    })
                    
                })
            }
            console.log({value :verifyId})
            const verifydata = jwt.verify(req.signedCookies[verifyId],process.env.verify_jwt_secret);
            console.log(verifydata);
            res.status(200).json({
                user : databaseResponse,
                message : {
                    common : {
                        msg : 'get user successfully'
                    }
                }
            });
        }
        
    }
    catch(err){
        console.log(err.message)
        res.status(404).json({
            errors : {
                common : {
                    msg : err.message
                }
            }
        });
    }
})

module.exports={
    isAuthRouter
}