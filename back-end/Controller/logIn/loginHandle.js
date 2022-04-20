//external library
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Otp } = require('../../Model/optModel');
const otpGenerator = require('otp-generator');
const axios = require('axios');


//Internal library
const {  SignupUser } = require("../../Model/signupSchema")

async function loginHandle(req,res,next){
    try{

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
            //console.log(Object.keys(passwordVerify))
            
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
                
                let verifyId = 's';

                if(databaseResponse.verify?.length>0 && Object.keys(req.signedCookies)?.length>0){
                    //check if verify token id founds in database
                    Object.keys(req.signedCookies).forEach(async(value)=>{
    
                        await databaseResponse.verify.forEach((verify_Id)=>{
                            if(value.includes(verify_Id)){
                                verifyId = value;
                                console.log({verifyId});
                            }
                        })
                    })
                }
                console.log(verifyId);
                //check varify token is correct or not
                jwt.verify(req.signedCookies[verifyId],process.env.verify_jwt_secret,async (err)=>{
                    if(err){
                        console.log(err.message);
                        
                        //create a otp 
                        const otpSalt = bcrypt.genSaltSync(Number(process.env.salt));
                        
                        const otpGenarate = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets :false, specialChars: false, });
                        console.log(otpGenarate)
                        
                        const mobileNoSlice = databaseResponse.mobile.slice(3);
                        console.log(mobileNoSlice)
                        
                        //generate data for send mobile otp
                        const greenWebSms = new URLSearchParams();
                        greenWebSms.append('token', process.env.otp_send_mobile_token);
                        greenWebSms.append('to',`${databaseResponse.mobile}`)
                        greenWebSms.append('message',`verification code ${otpGenarate}. Available for 5 minute.`)

                        //send OTP to database
                        await axios.post('http://api.greenweb.com.bd/api.php',greenWebSms)
                        .then(res=>{console.log(res.data)})
                        .catch(err=>{console.log(err)})

                        //save otp in database
                        const otpPass = await bcrypt.hash(otpGenarate,otpSalt);
                        console.log(otpPass)
                        
                        const otp = await Otp({
                            mobile : databaseResponse.mobile,
                            otp : otpPass
                        })
                        await otp.save();

                        

                        //successfully create response send            
                        res.status(200).json({
                            verify : false,
                            message : {
                                common : {
                                    msg : 'Login varification'
                                }
                            }
                        })
                    }
                    else{
                        //successfully create response send            
                        return res.status(200).json({
                            verify : true,
                            message : {
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
