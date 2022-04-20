//external library
const bcrypt = require('bcrypt');
const { Otp } = require('../../Model/optModel');
const otpGenerator = require('otp-generator');
const axios = require('axios');


const otpGenarate = async(req,res,next)=>{
    try{
        //create a otp in database
        const otpSalt = bcrypt.genSaltSync(Number(process.env.salt));
        
        //create otp 
        const otpGenarate = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        console.log(otpGenarate)
        
        //generate data for send mobile otp
        const greenWebSms = new URLSearchParams();
        greenWebSms.append('token', process.env.otp_send_mobile_token);
        greenWebSms.append('to',`${req.body.mobile}`)
        greenWebSms.append('message',`verification code ${otpGenarate}. Available for 5 minute`)

        //send OTP to database
        await axios.post('http://api.greenweb.com.bd/api.php',greenWebSms)
        .then(res=>{console.log(res.data)})
        .catch(err=>{console.log(err)})

        //hash otp to save database
        const otpPass = await bcrypt.hash(otpGenarate,otpSalt);
        console.log(otpPass)
        
        //save otp in dataBase
        const otp = await Otp({
            mobile : req.body.mobile,
            otp : otpPass
        })
        await otp.save();
        
        res.status(200).json({
            user : {
                mobile : req.body.mobile
            },
            message : {
                common : {
                    msg : 'sucesfully send OTP'
                }
            }
        })
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
    otpGenarate
}