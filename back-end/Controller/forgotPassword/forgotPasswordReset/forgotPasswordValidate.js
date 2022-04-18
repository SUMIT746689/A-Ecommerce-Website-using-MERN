//external library
const {check,validationResult} = require('express-validator');

const forgotPasswordValidate = [
    check('newpassword')
        .isStrongPassword()
        .withMessage('required minimum 8 charecter and minimum one small Letter,one number,one symbol and one Capital letter')
]


const forgotPasswordValidateResultHandle = (req,res,next)=>{
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
    forgotPasswordValidate,
    forgotPasswordValidateResultHandle
}