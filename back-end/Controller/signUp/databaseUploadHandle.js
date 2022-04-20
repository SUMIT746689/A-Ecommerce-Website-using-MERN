//external library
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const axios = require('axios');

//Internal library
const { SignupUser } = require("../../Model/signupSchema");
const { Otp } = require('../../Model/optModel');
const { TemporarySignupUser } = require('../../Model/tempSignupSchema');


const databaseUploadHandle =async (req,res,next)=>{
    try{

        //create a salt for otp bcrypt
        const otpSalt = bcrypt.genSaltSync(Number(process.env.salt));
        
        //generate a otp for verify
        const otpGenarate = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets:false, specialChars: false });
        console.log(otpGenarate);
        console.log(req.body.mobile)
        //generate data for send mobile otp
        const greenWebSms = new URLSearchParams();
        greenWebSms.append('token', process.env.otp_send_mobile_token);
        greenWebSms.append('to',`${req.body.mobile}`)
        greenWebSms.append('message',`verification code ${otpGenarate}. Available for 5 minute`)

        // //send OTP to database
        // await axios.post('http://api.greenweb.com.bd/api.php',greenWebSms)
        // .then(res=>{console.log(res.data)})
        // .catch(err=>{console.log(err)})
       
        //otp hashing using bcrypt
        const otpPass = await bcrypt.hash(otpGenarate,otpSalt);
        console.log(otpPass)
        
        //otp send to database
        const otp = await Otp({
            mobile : req.body.mobile,
            otp : otpPass
        })
        await otp.save();

        //user password bcrypt
        const bcryptPassword =await bcrypt.hash(req.body.password,Number(process.env.salt));

        //user info send to database
        const signupResponse = await new TemporarySignupUser({
            ...req.body,
            password : bcryptPassword
        });
        console.log(signupResponse);
        await signupResponse.save();

        //send a data to varify
        const jwtResponse = jwt.sign({
            name : req.body.name,
            email : req.body.email,
            mobile : req.body.mobile,
            avatar : req.body.avatar || false
        },
            process.env.jwt_secret,
            {expiresIn : Number(process.env.expireTime)});
            console.log(jwtResponse);

        //send a cookie 
        res.cookie(process.env.auth_cookie_token_name,jwtResponse, { maxAge: new Date (Number(process.env.expireTime)), httpOnly: true,signed :true })
     
        next();
        
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            errors : {
                common : {
                    msg : 'failed to sign up'
                }
            }
        })
    }
}

module.exports = {
    databaseUploadHandle
}