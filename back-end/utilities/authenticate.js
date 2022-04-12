const jwt = require('jsonwebtoken')

async function authenticate (req,res,next){
    try {
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
        console.log(auth_cookie)
        const data = await jwt.verify(auth_cookie,process.env.jwt_secret);
        
        //req.locals.data = data;
        next()
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