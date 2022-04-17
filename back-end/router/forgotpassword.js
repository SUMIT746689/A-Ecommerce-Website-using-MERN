const express = require('express');
const { forgotPasswordOtpVerified } = require('../Controller/forgotPassword/forgotPasswordOtpVerified');
const { otpGenarate } = require('../Controller/forgotPassword/otpGenerate');
const { validateforgotPassword, validationresultforgotPassword } = require('../Controller/forgotPassword/validate');

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post('/',validateforgotPassword,validationresultforgotPassword,otpGenarate); 

forgotPasswordRouter.post('/otpverify',forgotPasswordOtpVerified); 

module.exports={
    forgotPasswordRouter
}