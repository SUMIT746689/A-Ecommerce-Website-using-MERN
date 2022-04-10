//external library
const express = require('express');
const jwt = require('jsonwebtoken');

//internal library


const isAuthRouter = express.Router();

isAuthRouter.get('/',async (req,res)=>{
    try {
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
        const data = jwt.verify(auth_cookie,process.env.jwt_secret);
        console.log(data);
        res.status(200).json(true);
    }
    catch(err){
        console.log(err.message)
        res.status(404).json(false);
    }
    
    
})

module.exports={
    isAuthRouter
}