//external library
const bcrypt = require('bcrypt');

//Internal Library
const { SignupUser } = require("../../../Model/signupSchema");


const forgotpasswordReset = async (req,res,next)=>{
    try{console.log(res.locals.cookiedata.mobile);
    console.log(req.body.newpassword);

    //hash password 
    const hashPassword =await bcrypt.hash(req.body.newpassword,Number(process.env.reset_password_salt))
    console.log(hashPassword);
    //save reset passsword to database
    await SignupUser.updateOne({mobile : res.locals.cookiedata.mobile},{
        password : hashPassword
    })
    
    res.status(200).json({
        message : {
            msg : 'Succesfully Reset Password'
        }
    })
    }
    catch(err){
        res.status(404).json({
            errors : {
                common : err.message
            }
        })
    }
}

module.exports = {
    forgotpasswordReset
}