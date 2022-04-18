const express = require('express');
const { forgotPasswordOtpReset } = require('../Controller/forgotPassword/forgotPasswordOtpReset');
const { forgotPasswordOtpVerified } = require('../Controller/forgotPassword/forgotPasswordOtpVerified');
const { forgotpasswordReset } = require('../Controller/forgotPassword/forgotPasswordReset/forgotPasswordReset');
const { forgotPasswordResetAuth } = require('../Controller/forgotPassword/forgotPasswordReset/forgotPasswordResetAuth');
const { forgotPasswordValidate, forgotPasswordValidateResultHandle } = require('../Controller/forgotPassword/forgotPasswordReset/forgotPasswordValidate');
const { otpGenarate } = require('../Controller/forgotPassword/otpGenerate');
const { validateforgotPassword, validationresultforgotPassword } = require('../Controller/forgotPassword/validate');

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post('/',validateforgotPassword,validationresultforgotPassword,otpGenarate); 

forgotPasswordRouter.post('/otpverify',forgotPasswordOtpVerified); 

forgotPasswordRouter.post('/otpreset',forgotPasswordOtpReset); 

forgotPasswordRouter.post('/forgotpasswordreset',forgotPasswordResetAuth,forgotPasswordValidate,forgotPasswordValidateResultHandle,forgotpasswordReset); 

module.exports={
    forgotPasswordRouter
}