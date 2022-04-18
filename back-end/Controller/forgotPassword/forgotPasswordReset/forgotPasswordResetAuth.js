//external library
const jwt = require('jsonwebtoken');
const forgotPasswordResetAuth =async(req,res,next)=>{
    
try{
    const resetcookie = req.signedCookies[process.env.reset_cookie_name];
    
    if(resetcookie){
        const resetCookie = jwt.verify(resetcookie,process.env.reset_jwt_secret);
        res.locals.cookiedata = resetCookie;
        next();
    }
    else{
        res.status(404).json({
            errors : {
                common : {
                    msg : 'Times Out'
                }
            }
        })
    }
}
catch(err){
    res.status(404).json({
        errors : {
            common : {
                msg : err.messsage
            }
        }
    })
}

}

module.exports = {
    forgotPasswordResetAuth
}