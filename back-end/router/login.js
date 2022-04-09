//external library
const express = require('express');

//internal library
const { loginHandle } = require('../Controller/logIn/loginHandle');
const { authCheck } = require('../utilities/authCheck');


const routerLogin = express.Router();

routerLogin.post('/',loginHandle,(req,res,next)=>{
    console.log(req.body);
    res.status(200).json({success : 'Successfully updated'});
});

module.exports ={
    routerLogin
}

