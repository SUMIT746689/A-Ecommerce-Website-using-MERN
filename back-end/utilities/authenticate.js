const jwt = require('jsonwebtoken')

async function authenticate (req,res,next){
    try {
        if(req.user){
            next()
        }
        else{
            const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
            const data = jwt.verify(auth_cookie,process.env.jwt_secret);
            next();
        }
    }
    catch(err){
        console.log(err.message)
        res.status(404).json({
            errors : {
                common : {
                    msg : 'Unauthorized connection '
                }
            }
        });
    }
}

module.exports ={
    authenticate
}