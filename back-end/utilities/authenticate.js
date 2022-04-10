function authenticate (req,res,next){
    try {
        const auth_cookie = req.signedCookies[process.env.auth_cookie_token_name] || '';
        const data = jwt.verify(auth_cookie,process.env.jwt_secret);
        console.log(data);
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