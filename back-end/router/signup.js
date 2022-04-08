const express = require('express');
const { validate, validationResultHandle } = require('../Controller/defaultErrorHandle/signUp/validateCheck');


const routerSignup = express.Router();

routerSignup.post('/',validate,validationResultHandle,(req,res,next)=>{
    console.log(req.body);
    res.end();
});

module.exports ={
    routerSignup
}

