//external library
const express = require('express');
const jwt = require('jsonwebtoken');

//internal library


const isAuthRouter = express.Router();

isAuthRouter.get('/',async (req,res)=>{
    try {
        
        if(req.user){
            
            res.status(200).json({
                success : true,
                user : {
                    name : req.user.displayName,
                    id: req.user.id,
                    avatar : req.user.photos[0].value
                }
            });
        }else{
            const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
            const data = jwt.verify(auth_cookie,process.env.jwt_secret);
            
            const varify_auth_token = req.signedCookies[process.env.varify_auth_cookie_token_name] || '';
            const varifydata = jwt.verify(auth_cookie,process.env.jwt_secret);
            
            res.status(200).json({
                success : true,
                user : data
            });
        }
        
    }
    catch(err){
        console.log(err.message)
        res.status(404).json(false);
    }
    
    
})

module.exports={
    isAuthRouter
}