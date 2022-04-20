const express = require('express');
const { resendOtp } = require('../Controller/resendOtp/resendOtp');
const { resendSignupOtp } = require('../Controller/resendOtp/resendSignupOtp');


const routerResendOtp = express.Router();


routerResendOtp.post('/',resendOtp,resendSignupOtp);

module.exports ={
    routerResendOtp
}

