const res = require("express/lib/response");
const bcrypt = require('bcrypt');
const { Otp } = require('../../Model/optModel');
const otpGenerator = require('otp-generator')


const otpGenarate = async(req,res,next)=>{
    try{
        //create a otp in database
        const otpSalt = bcrypt.genSaltSync(Number(process.env.salt));
                        
        const otpGenarate = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        console.log(otpGenarate)
         
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