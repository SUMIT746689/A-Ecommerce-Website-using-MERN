//external library
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Internal library
const { Signup } = require("../../Model/signupSchema")

async function loginHandle(req,res,next){
    try{
        //find is signup or not
        const databaseResponse = await Signup.findOne({
            $or : [
                {email : req.body.emailOrMobile},
                {mobile : req.body.emailOrMobile}
            ]
        });
        
        if(Object.keys(databaseResponse).length > 0){
            //compare is password correct or not 
            const passwordVerify = await bcrypt.compare(req.body.password,databaseResponse.password)
            console.log(passwordVerify)
            if(passwordVerify){
                //create a token with jwt
                const jwtResponse =jwt.sign({
                    name : databaseResponse.name,
                    email : databaseResponse.email,
                    avatar : databaseResponse.avatar || ''
                },
                    process.env.jwt_secret,
                    {expiresIn : Number(process.env.expireTime)});
                console.log(jwtResponse);

                //send a cookie 
                const data = res.cookie(process.env.auth_cookie_token_name,jwtResponse,
                    {
                        
                        maxAge : Number(process.env.expireTime),
                       })
                //console.log(data);
                //successfully create response send
                console.log('success')
                res.status(200).json({
                    success : {
                        common : {
                            msg : 'Login successfull'
                        }
                    }
                })
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
                    msg : err.message
                }
            }
        })
    }

}

module.exports = {
    loginHandle
}
