//external library
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const axios = require('axios');

//external library
const { Otp } = require('../../Model/optModel');
const { TemporarySignupUser } = require('../../Model/tempSignupSchema');


const resendSignupOtp = async(req,res,next)=>{
    try{
        //check is google or other social site have or not
        if(req.user){
            return res.status(200).json({
                varify: true,
                success : true,
                message : {
                    common : {
                        msg : 'successfully verified'
                    }
                }
            })
        }
        console.log(req.signedCookies);
        //get access token name
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
        
        //varify access token 
        const data = jwt.verify(auth_cookie,process.env.jwt_secret);
        
        const signupResponse =await TemporarySignupUser.findOne({mobile : data.mobile || ''},{_id:0});
        
        if(signupResponse !== null){
            console.log(signupResponse)
            //otp salt genarate
            const otpSalt = bcrypt.genSaltSync(Number(process.env.salt));
            //otp generate
            const otpGenarate = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets :false, specialChars: false });
            console.log(otpGenarate)
            
            //generate data for send mobile otp
            const greenWebSms = new URLSearchParams();
            greenWebSms.append('token', process.env.otp_send_mobile_token);
            greenWebSms.append('to',`${signupResponse?.mobile}`)
            greenWebSms.append('message',`verification code ${otpGenarate}. Available for 5 minute`)

            //send OTP to database
            await axios.post('http://api.greenweb.com.bd/api.php',greenWebSms)
            .then(res=>{console.log(res.data)})
            .catch(err=>{console.log(err)})

            //otp hashing to save database
            const otpPass = await bcrypt.hash(otpGenarate,otpSalt);
            console.log(otpPass)
            
            //send otp hash password to database
            const otp = await Otp({
                mobile : signupResponse?.mobile || 'sfa',
                otp : otpPass
            })
            await otp.save();

            //signup user send database permanently 
            res.status(200).json({
                message : {
                    common : {
                        msg : 'successfully verified'
                    }
                }
            })
        }
        else{
            res.status(404).json({
                errors : {
                    common : {
                        msg : 'login or signup first'
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

module.exports={
    resendSignupOtp
}