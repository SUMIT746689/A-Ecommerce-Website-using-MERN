//external library
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');

//Internal library
const { Otp } = require('../../Model/optModel');
const { SignupUser } = require('../../Model/signupSchema');

const forgotPasswordOtpVerified = async (req,res,next) =>{
   
try{
    //check otp is correct or not in database
    const Otpresponse = await Otp.find({mobile : req.body.mobile});   
    console.log(Otpresponse);
    //create a unique Id for verify token
    const verifyUniqId = uniqid('verify-');
    console.log(verifyUniqId);
    
    //compare if otp is correct or not  
    const isbcrypt = await bcrypt.compare(req.body.value,Otpresponse[Otpresponse.length-1]?.otp || '')
    console.log(isbcrypt);

    if(isbcrypt){
        //create a varify jwt response
        const jwtResponse = jwt.sign({
            mobile :Otpresponse[Otpresponse.length-1].mobile
        },
            process.env.verify_jwt_secret
        );
        console.log(jwtResponse);

        //set a cookie name as varify
        res.cookie(verifyUniqId,jwtResponse,{maxAge: Number(new Date())+(1000*120),signed: true,httpOnly:true}) 
        

        //set a cookie for 5 min for reset password
        const resetCookie = jwt.sign({
            mobile : Otpresponse[Otpresponse.length-1].mobile
        },
            process.env.reset_jwt_secret
        );
        console.log(resetCookie);

        //set a cookie name as varify
        res.cookie(process.env.reset_cookie_name,resetCookie,{maxAge: Number(new Date())+(1000*120),signed: true,httpOnly:true,maxAge : 300000,}) 

        //delete all otp after varify
        await Otp.deleteMany({mobile : req.body.mobile});

        //update users verify
        await SignupUser.updateOne(
            {
                mobile : req.body.mobile
            },
            {
                $push : {
                    verify : [verifyUniqId]
                }
            }
        );
        
        res.status(200).json({
            verify: true,
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
                    msg : 'required valid otp'
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
    forgotPasswordOtpVerified
}