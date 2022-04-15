const jwt = require('jsonwebtoken')

async function authenticate (req,res,next){
    try {
        if(req.user){
           return next()
        }
        
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
        const data = jwt.verify(auth_cookie,process.env.jwt_secret);
        
        const varify_auth_token = req.signedCookies[process.env.varify_auth_cookie_token_name] || '';
        const varifydata = jwt.verify(auth_cookie,process.env.jwt_secret);
        
        if(data && varifydata ) return next();
        if(data ) {return res.status(404).json(false)}
    
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