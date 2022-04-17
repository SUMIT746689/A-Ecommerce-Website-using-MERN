//External library
const {check,validationResult} = require('express-validator');
const { SignupUser } = require('../../Model/signupSchema');
const createError = require('http-errors');

const validateforgotPassword =[
    check('mobile')
    .isMobilePhone('bn-BD')
    .withMessage('valid Bangladeshi number required')
    .custom(async(value)=>{
        const responseEmail = await SignupUser.findOne({mobile : value});
        if(!responseEmail?.mobile){
            throw createError('This number cannot created any account')
        }
    })
]

//validation result handle
const validationresultforgotPassword = (req,res,next)=>{
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

module.exports ={
    validateforgotPassword,
    validationresultforgotPassword
}