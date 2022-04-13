const { SignupUser } = require("../Model/signupSchema")

const logoutHandle = async (req,res)=>{
    try{
        
        console.log(req.locals)
        //clear cookie from user
        res.clearCookie(process.env.auth_cookie_token_name);
        if(req.user){
            req.logOut();
        }
        res.status(200).json(false);
    }
    catch(err){
        console.log(err.message)
        res.status(404).json({
            errors : {
                common : {
                    msg : 'Logout falied'
                }
            }
        });
    }
}
module.exports ={
    logoutHandle
}