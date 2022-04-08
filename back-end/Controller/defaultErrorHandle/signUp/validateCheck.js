//external library
const {check,validationResult} = require('express-validator');
const createError = require('http-errors');

//Internal library
const { Signup } = require('../../../Model/signupSchema');

const validate = [
    check('name')
        .notEmpty()
        .withMessage('Name required')
    ,
    check('email')
        .isEmail()
        .withMessage('valid email required')
        .custom(async(value)=>{
           const responseEmail = await Signup.findOne({email : value});
            if(responseEmail.email){
                throw createError('email is already used')
            }
        }),
    check('mobile')
    .isMobilePhone('bn-BD')
    .withMessage('valid Bangladeshi number required')
    .custom(async(value)=>{
        const responseEmail = await Signup.findOne({mobile : value});
        if(responseEmail.mobile){
            throw createError('email is already used')
        }
    }),
    check('password')
        .isStrongPassword()
        .withMessage('required minimum 8 charecter and minimum one small Letter,one number,one symbol and one Capital letter')
    ]


//validation errors  handle
const validationResultHandle = (req,res,next)=>{
    const validationErrorResult = validationResult(req);
    console.log(validationErrorResult);
    next()
} 

module.exports = {
    validate,
    validationResultHandle
}