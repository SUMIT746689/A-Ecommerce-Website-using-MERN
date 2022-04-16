const express = require('express');
const { databaseUploadHandle } = require('../Controller/signUp/databaseUploadHandle');
const { validate, validationResultHandle } = require('../Controller/signUp/validateCheck');


const routerSignup = express.Router();

routerSignup.post('/',validate,validationResultHandle,databaseUploadHandle,(req,res,next)=>{
    console.log(req.body);
    res.status(200).json({
        message : {
            msg : 'successfully created'
        }
    });
});

module.exports ={
    routerSignup
}

