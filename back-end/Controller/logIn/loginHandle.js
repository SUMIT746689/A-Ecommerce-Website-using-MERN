//external library
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Otp } = require('../../Model/optModel');
const otpGenerator = require('otp-generator')


//Internal library
const {  SignupUser } = require("../../Model/signupSchema")

async function loginHandle(req,res,next){
    try{
        console.log(req.body)

        //find is signup or not
        const databaseResponse = await SignupUser.findOne({
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
                const jwtResponse = jwt.sign({
                    name : databaseResponse.name,
                    email : databaseResponse.email,
                    mobile : databaseResponse.mobile,
                    avatar : databaseResponse.avatar || false
                },
                    process.env.jwt_secret,
                    {expiresIn : Number(process.env.expireTime)});
                    console.log(jwtResponse);

                //send a cookie 
                res.cookie(process.env.auth_cookie_token_name,jwtResponse, { maxAge: new Date (Number(process.env.expireTime)), httpOnly: true,signed :true })
                
                //check varify token is correct or not
                const varify_auth_token = req.signedCookies[process.env.varify_auth_cookie_token_name] || '';
                jwt.verify(varify_auth_token,process.env.verify_jwt_secret,async (err)=>{
                    if(err){
                        console.log(err.message);
                        //create a otp in database
                        const otpSalt = bcrypt.genSaltSync(Number(process.env.salt));
                        
                        const otpGenarate = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                        console.log(otpGenarate)
                        const otpPass = await bcrypt.hash(otpGenarate,otpSalt);
                        console.log(otpPass)
                        const otp = await Otp({
                            mobile : databaseResponse.mobile,
                            otp : otpPass
                        })
                        await otp.save();

                        //successfully create response send            
                        res.status(200).json({
                            varify : false,
                            user : {
                                name : databaseResponse.name,
                                avatar : databaseResponse.avatar
                            },
                            success : {
                                common : {
                                    msg : 'Login varification'
                                }
                            }
                        })
                    }
                    else{
                        //successfully create response send            
                        return res.status(200).json({
                            varify : true,
                            user : {
                                name : databaseResponse.name,
                                avatar : databaseResponse.avatar
                            },
                            success : {
                                common : {
                                    msg : 'Login successfull'
                                }
                            }
                        })
                    }
                });
                
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
