//external library
const bcrypt = require('bcrypt');

//Internal library
const { SignupUser } = require("../../Model/signupSchema");



const databaseUploadHandle =async (req,res,next)=>{
    try{
        const bcryptPassword =await bcrypt.hash(req.body.password,Number(process.env.salt));

        const signupResponse = await new SignupUser({
            ...req.body,
            password : bcryptPassword
        });
        console.log(signupResponse)
        await signupResponse.save()
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