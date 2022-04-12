//external library
const {check,validationResult} = require('express-validator');
const createError = require('http-errors');

//Internal library
const { SignupUser } = require('../../Model/signupSchema');

const validate = [
    check('name')
        .notEmpty()
        .withMessage('Name required')
    ,
    check('email')
        .isEmail()
        .withMessage('valid email required')
        .custom(async(value)=>{
            
           const responseEmail = await SignupUser.findOne({email : value.toLowerCase()});
            if(responseEmail?.email){
                throw createError('email is already used')
            }
        })
        .toLowerCase(),
    check('mobile')
    .isMobilePhone('bn-BD')
    .withMessage('valid Bangladeshi number required')
    .custom(async(value)=>{
        const responseEmail = await SignupUser.findOne({mobile : value});
        if(responseEmail?.mobile){
            throw createError('mobile is already used')
        }
    }),
    check('password')
        .isStrongPassword()
        .withMessage('required minimum 8 charecter and minimum one small Letter,one number,one symbol and one Capital letter')
    ]


//validation errors  handle
const validationResultHandle = (req,res,next)=>{
    const validationErrorResult = validationResult(req);
    
    const validationErrorResultMapped = validationErrorResult.mapped(); 
    if(validationErrorResult.errors.length > 0){
        res.status(400).json({
            errors : {
                ...validationErrorResultMapped
            }
        })
    }
    else{
        next();
    }
    
} 

module.exports = {
    validate,
    validationResultHandle
}