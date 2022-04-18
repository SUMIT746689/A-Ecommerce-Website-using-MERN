//external librabry
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { Otp } = require('../../Model/optModel');
const { SignupUser } = require('../../Model/signupSchema');


const forgotPasswordOtpReset = async (req,res,next)=>{
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
        //check databse have any account request mobile
        const signupResponse = await SignupUser.findOne({mobile : req.body.mobile});
        console.log(signupResponse.length);
        
        if(Object.keys(signupResponse)?.length>0){
            //otp salt genarate
            const otpSalt = bcrypt.genSaltSync(Number(process.env.salt));
            //otp generate
            const otpGenarate = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            console.log(otpGenarate)
            //otp hashing to save database
            const otpPass = await bcrypt.hash(otpGenarate,otpSalt);
            console.log(otpPass)
            //send otp hash password to database
            const otp = await Otp({
                mobile : signupResponse.mobile,
                otp : otpPass
            })
            await otp.save();

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
                        msg : 'login first'
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
    forgotPasswordOtpReset
}