//External Library
const githubRouter = require('express').Router();
const passport = require('passport');

//Internal Library


const CLIENT_URL = 'http://localhost:3000/' ;

//github routers
githubRouter.get('/login/success',(req,res)=>{
    if(req.user){
        console.log(req.user)
        res.redirect(CLIENT_URL);
    }
})

githubRouter.get('/login/failed',(req,res)=>{
    res.status(404).json({
        errors : {
            common : {
                msg : 'Github login failed'
            }
        }
    })
})

githubRouter.get('/',passport.authenticate('github', { scope: [ 'profile' ] }));

githubRouter.get('/callback', 
    
    passport.authenticate('github', {

        successRedirect : '/auth/github/login/success', 
        failureRedirect : '/auth/github/login/failed'
    
    })

);

  module.exports ={

      githubRouter

  }