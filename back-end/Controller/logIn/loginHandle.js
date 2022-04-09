//external library
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Internal library
const { Signup } = require("../../Model/signupSchema")

async function loginHandle(req,res,next){
    try{
        const databaseResponse = await Signup.findOne({
            $or : [
                {email : req.emailOrMobile},
                {mobile : req.emailOrMobile}
            ]
        });
        if(databaseResponse.keys.length > 0){
            const passwordVerify = await bcrypt.compare(req.body.password,databaseResponse.password)
            
            if(passwordVerify){
                jwt
            }
            else{
                res.status(404).json({
                    errors : {
                        common : {
                            msg : 'username or password invalide'
                        }
                    }
                })
            }
            
        }
        else{
            res.status(404).json({
                errors : {
                    common : {
                        msg : 'username or password is not valid'
                    }
                }
            })
        }
    }
    catch(err){
        res.status(404).json({
            errors : {
                common : {
                    msg : 'failed to login'
                }
            }
        })
    }

}

module.exports = {
    loginHandle
}
