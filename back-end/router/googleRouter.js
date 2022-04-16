//external library
const express = require('express');
const passport = require('passport');

const CLIENT_URL = 'http://localhost:3000/';

const googleRouter = express.Router();


googleRouter.get("/login/success",(req,res,next)=>{
    console.log(req.user)
    res.redirect(CLIENT_URL)
})

googleRouter.get("/login/failed",(req,res,next)=>{
    res.status(404).json({
        errors : {
            common : {
                msg : 'Google Login failed'
            }
        }
    });
})


googleRouter.get('/',passport.authenticate("google", { scope: ["profile"] }))

googleRouter.get("/callback",passport.authenticate("google", {
        successRedirect: '/auth/google/login/success',
        failureRedirect: "/auth/google/login/failed",
    })
);

module.exports = {
    googleRouter
}